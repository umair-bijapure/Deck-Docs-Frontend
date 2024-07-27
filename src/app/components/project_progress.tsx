import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Popover} from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import TaskModal from './taskModel';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillPlusCircle, AiFillPlusSquare } from 'react-icons/ai';

export interface Task {
  $oid: string;
  _id: string;
  title: string;
  description: string;
  assignedTo: string[]; // Assuming assignedTo is an array of user IDs
  dueDate: string; // Or use Date type if it's a Date object
  // Add other properties as needed
}



interface TaskListProps {
  listId: string;
}

interface Progress {
  _id: string;
  title: string;
  tasks: Task[];
}

interface ProjectProgressProps {
  projectId?: string;
  progress: Progress[];
  team:any;
  users:any;
}

const ProjectProgress: React.FC<ProjectProgressProps> = ({ projectId, progress: initialProgress,team,users }) => {
  const [progress, setProgress] = useState<Progress[]>(initialProgress);
  const [newTaskTitles, setNewTaskTitles] = useState<string[]>(Array(initialProgress.length).fill(''));
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedTaskId, setClickedTaskId] = useState<string | null>(null);
  const [clickedTask, setClickedTask] = useState<Task>();
  const [clickedList, setClickedList] = useState<string>();


  const toggleModal = (task:any,listid:any) => {
    setIsModalOpen(!isModalOpen);
    setClickedTask(task)
    setClickedList(listid)
  };

  // Fetch tasks from the database
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/task`);
      const tasksData: Task[] = response.data; // Assuming Task is the type of your task data
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateProjectProgress = async (updatedProgress: Progress[]) => {
    try {
      await axios.put(`http://localhost:5000/api/project/${projectId}`, { progress: updatedProgress });
      console.log('Project progress updated successfully.');
      setProgress(updatedProgress);
    } catch (error) {
      console.error('Error updating project progress:', error);
    }
  };

  const addTaskToList = async (headingIndex: number, listId: string) => {
    if (!listId) {
      console.error('No listId provided.');
      return;
    }
  
    const newTaskTitle = newTaskTitles[headingIndex];
    if (!newTaskTitle) return;
  
    try {
      // Add the new task to the server
      const response = await axios.post(`http://localhost:5000/api/project/${listId}/lists/${projectId}/tasks`, {
        title: newTaskTitle, // Ensure that newTaskTitle is not empty
      });
    
      // Update the local tasks state with the new task
      setTasks(prevTasks => [...prevTasks, response.data]);
  
      const updatedProgress = [...progress];
      const listIndex = updatedProgress.findIndex((list) => list._id === listId);
      if (listIndex !== -1) {
        // Push the new task to the tasks array of the corresponding list in the progress
        updatedProgress[listIndex].tasks.push(response.data);
        // Update project progress on the server
        await updateProjectProgress(updatedProgress);
      } else {
        console.error('List not found.');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      // Reset the new task title for the specific list
      const updatedTaskTitles = [...newTaskTitles];
      updatedTaskTitles[headingIndex] = '';
      setNewTaskTitles(updatedTaskTitles);
    }
  };
  
  
  const onUpdate = async (updatedTask: Task) => {
    try {
      // Here you can update the local state if needed
      // For example:
   
      const updatedTasks = tasks.map(task => task._id === updatedTask._id ? updatedTask : task);
      setTasks(updatedTasks);
  
      // Check if clickedList is defined before calling updateTask
      if (clickedList) {
        // Call the actual update function with both updatedTask and listId
        await updateTask(updatedTask, clickedList);
      } else {
        console.error('Error updating task: listId is undefined');
        // Handle the error or notify the user
      }
    } catch (error) {
      console.error('Error updating task:', error);
      // Handle the error
    }
  };
  

// Define the updateTask function that accepts both updatedTask and listId
const updateTask = async (updatedTask: Task, listId: string) => {
  try {
      // Update the task within the project on the server
      await axios.put(`http://localhost:5000/api/project/${projectId}/lists/${listId}/tasks/${updatedTask._id}`, updatedTask);
      console.log('Task updated successfully.');
  } catch (error) {
      console.error('Error updating task:', error);
      // Handle the error
  }
};

  


  const addCustomList = async () => {
    try {
      const newListTitle = prompt('Enter the title for the new list');
      if (newListTitle) {
        // Create a new object for the custom list
        const newList = {
          _id: '', // It seems the server is expecting an ObjectId, so we leave it empty for now
          title: newListTitle,
          tasks: []
        };
  
        // Send a POST request to the server to add the custom list
        const response = await axios.post(`http://localhost:5000/api/project/${projectId}/customLists`, newList);
  
        // If the request is successful, update the local state with the updated progress
        const updatedProgress = [...progress, response.data];
  
        // Update project progress on the server
        updateProjectProgress(updatedProgress);
      }
    } catch (error) {
      console.error('Error adding custom list:', error);
    }
  };

  const handleEditTask = async (task: Task | undefined) => {
    if (!task) return;

    try {
      // Assuming you have a modal for editing tasks and it updates the task data
      // After the task is edited, send a PUT request to update the task on the server
      await axios.put(`http://localhost:5000/api/task/${task._id}`, task);
      console.log('Task updated successfully.');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (task: Task | undefined) => {
    if (!task) return;

    try {
      // Send a DELETE request to remove the task from the server
      await axios.delete(`http://localhost:5000/api/task/${task._id}`);
      console.log('Task deleted successfully.');

      // After deletion, update the local state to remove the deleted task
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const onDragEnd = async (result: any) => {
    try {
      const { destination, source, draggableId } = result;

      if (!destination) return;
      if (destination.droppableId === source.droppableId && destination.index === source.index) return;

      const sourceIndex = source.droppableId.split('-')[1];
      const destinationIndex = destination.droppableId.split('-')[1];
      const draggedTask = progress[sourceIndex].tasks[source.index];

      const newProgress = [...progress];

      // Reordering within the same list
      if (sourceIndex === destinationIndex) {
        const newTasks = Array.from(progress[sourceIndex].tasks);
        newTasks.splice(source.index, 1);
        newTasks.splice(destination.index, 0, draggedTask);

        newProgress[sourceIndex].tasks = newTasks;
      } else {
        // Moving task to a different list
        const sourceTasks = Array.from(progress[sourceIndex].tasks);
        const destinationTasks = Array.from(progress[destinationIndex].tasks);

        sourceTasks.splice(source.index, 1);
        destinationTasks.splice(destination.index, 0, draggedTask);

        newProgress[sourceIndex].tasks = sourceTasks;
        newProgress[destinationIndex].tasks = destinationTasks;
      }

      // Update project progress on the server
      await updateProjectProgress(newProgress);
    } catch (error) {
      console.error('Error handling drag and drop:', error);
    }
  };

  const handleInputChange = (headingIndex: number, value: string) => {
    setNewTaskTitles((prevTitles) => {
      const updatedTitles = [...prevTitles];
      updatedTitles[headingIndex] = value;
      return updatedTitles;
    });
  };


return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {progress.map((heading, headingIndex) => (
          <div key={heading._id} className ="min-h-[250px] " >
            <h3 className='flex items-center justify-center bg-gray-200 rounded-t-lg p-1 font-bold'>{heading.title}</h3>
            <Droppable droppableId={`list-${heading._id}`}>
              {(provided ) => (
                
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`${
                    heading.title ? 'bg-white' : 'bg-[color:var(--mainTitleLightestColor)]'
                  } p-4 rounded-md min-h-48`}
                  
                >

                  {/* Render tasks for the current list */}
                  {heading.tasks.map((task, taskIndex) => (
                    <Draggable
                      key={task._id}
                      draggableId={`task-${task._id}`}
                      index={taskIndex}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-2 mb-2 rounded-md shadow-sm cursor-pointer"
                          onClick={() => toggleModal(task, heading._id)}
                        >

                        <Popover content={
                            <div className=" flex items-center justify-center bg-gray-600 bg-opacity-10  ">
                                <div className="bg-white rounded-lg p-2 w-full h-auto max-w-md">
                                        {clickedTask &&
                                  <TaskModal task={clickedTask} team={team} handleDeleteTask={() => handleDeleteTask(task)} onUpdate={onUpdate} users={users} onClose={() => setIsModalOpen(false)} />
                                }
                                </div>
                            </div>                        } trigger="click">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                            <div>{task.title}</div>
                          </div>
                          </Popover>

                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>


            <div className={`flex-col z-10 items-center justify-center w-full sm:h-auto gap-x-4 p-1 `}>
              <div className="truncate p-2 bg-[color:var(--mainTitleLightestColor)] rounded-2xl pl-4 w-full ">
            
                <div className="flex items-center justify-center w-full ">
                  <input
                    type="text"
                    placeholder="Enter task title"
                    value={newTaskTitles[headingIndex]}
                    onChange={(e) => handleInputChange(headingIndex, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addTaskToList(headingIndex, heading._id); // Pass listId here
                    }}
                    style={{ marginTop: '10px', width: '100%', padding: '6px', boxSizing: 'border-box' }}
                    className="text-md bg-[color:var(--mainTitleLightestColor)] text-[color:var(--mainTitleColor)] mt-4 px-2 py-4 placeholder-slate-400 focus:outline-none focus:border-[color:var(--primaryColor)] focus:ring-[color:var(--primaryColor)] block rounded-md sm:text-sm focus:ring-1 w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center cursor-pointer bg-[color:var(--mainTitleLightestColor)] text-[color:var(--mainTitleLightColor)] hover:bg-[color:var(--mainTitleLightColor)] hover:text-[color:var(--lightBackgroundColor)] rounded-xl flex items-center gap-x-2 p-2 font-bold m-2"   
              onClick={() => addTaskToList(headingIndex, heading._id)}>
                <h1 className="text-lg">
                  <AiFillPlusCircle />
                </h1>
                <h1 className="text-sm"> Add Task</h1>
              </div>
          </div>
        ))}

      </DragDropContext>
      <button onClick={addCustomList} style={{ padding: '10px', fontSize: '16px' }}>
        Add Custom List
      </button>
    </div>

  );
};

export default ProjectProgress;



