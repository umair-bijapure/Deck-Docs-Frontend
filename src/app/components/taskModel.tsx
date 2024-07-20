import React, { useState } from 'react';
import Select from 'react-select';
import { Task } from './project_progress';
import { CommonInput } from './common/inputs';
import { AiOutlineDelete, AiOutlineUpload } from 'react-icons/ai';

interface User {
  _id: string;
  first_name: string;
  phone_no: string;
  // Add other properties as needed
}

type Team = string[];

interface TaskModalProps {
  task: Task;
  team: Team;
  onUpdate: (updatedTask: Task) => Promise<void>;
  users: User[];
  onClose: () => void;
  handleDeleteTask: (task: Task | undefined) => Promise<void>; // Update the type of handleDeleteTask
}


const TaskModal: React.FC<TaskModalProps> = ({ task, team, onUpdate, users, onClose,handleDeleteTask }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [hoveredUserId, setHoveredUserId] = useState<string | null>(null);

  const handleUpdate = () => {
    const updatedTask = {
      ...task,
      title,
      description,
      assignedTo,
      dueDate
    };

    onUpdate(updatedTask);
    onClose();
  };

  function stringToColor(str: string) {
    // Convert the string to a numeric hash code
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Convert the hash code to a hexadecimal color code
    let color = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }

  const handleRemoveUser = (userId: string) => {
    setAssignedTo(prevAssignedTo => prevAssignedTo.filter(id => id !== userId));
  };

  const jsxElements = assignedTo?.map((userId) => {
    const user = users.find((user) => user._id === userId);
    const color = user ? stringToColor(userId) : '';
    const firstLetter = user ? user.first_name.charAt(0).toUpperCase() : '';

    if (!user) return null;

    return (
      <div 
        key={userId} 
        className="relative cursor-pointer hover:ring-2"
      >
        <div 
          className="w-10 h-10 rounded-full mr-2 flex items-center justify-center circle" 
          style={{ backgroundColor: color, color: '#ffffff' }}
          onMouseEnter={() => setHoveredUserId(userId)}
          onMouseLeave={() => setHoveredUserId(null)}
        >
          {firstLetter}
        </div>
        {hoveredUserId === userId && (
          <div className="absolute top-0 right-0 bg-white rounded-full w-6 h-6 flex items-center justify-center text-red-500 cursor-pointer transform translate-x-1 translate-y-1" onClick={() => handleRemoveUser(userId)}>-</div>
        )}
      </div>
    );
  });

  return (
    <div className="items-center justify-center bg-gray-600 bg-opacity-10">

      <div className="bg-white rounded-lg  w-full max-w-md">
     
        <div>
          <CommonInput defaultValue={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)} label={'Title'} />
        </div>
        <div className={`flex-col z-10 items-center justify-center w-full sm:h-auto gap-x-4 sm:pl-2 sm:pr-2 p-1 `}>
        <div className="truncate p-2 bg-[color:var(--mainTitleLightestColor)] rounded-2xl pl-4 w-full ">
          <h1 className="text-[10px] text-[color:var(--mainTitleLightColor)]">Description</h1>
            <div className="flex items-center justify-center w-full ">
              <textarea
                className="text-md bg-[color:var(--mainTitleLightestColor)] text-[color:var(--mainTitleColor)] mt-1 px-2 py-1 placeholder-slate-400 focus:outline-none focus:border-[color:var(--primaryColor)] focus:ring-[color:var(--primaryColor)] block rounded-md sm:text-sm focus:ring-1 w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
        
            </div>
        </div>
      </div>
        <div className=''>
        <div className={`flex-col z-10 items-center justify-center w-full sm:h-auto gap-x-4 sm:pl-2 sm:pr-2 p-1 `}>
        <div className="truncate p-2 bg-[color:var(--mainTitleLightestColor)] rounded-2xl pl-4 w-full ">
          <h1 className="text-[10px] text-[color:var(--mainTitleLightColor)]">Assigne Task</h1>
            <div className="flex items-center justify-center w-full ">
          <Select
            options={users.filter(user => team.includes(user.phone_no)).map(user => ({ value: user.phone_no, label: user.first_name }))}
            isMulti
            onChange={(selectedOptions) => {
              const selectedUserIds: string[] = selectedOptions.map(option => option.value);
              setAssignedTo(selectedUserIds);
            }}
            placeholder="Select Users"
            className="text-md bg-[color:var(--mainTitleLightestColor)] text-[color:var(--mainTitleColor)] mt-1 px-2 py-1 placeholder-slate-400 focus:outline-none focus:border-[color:var(--primaryColor)] focus:ring-[color:var(--primaryColor)] block rounded-md sm:text-sm focus:ring-1 w-full"
          />
                      </div>
        </div>
      </div>
          <div className="flex flex-wrap items-end p-1 m-1">
            {jsxElements}
          </div>
        </div>



      
        <div className={`flex-col z-10 items-center justify-center w-full sm:h-auto gap-x-4 sm:pl-2 sm:pr-2 p-1 `}>
        <div className="truncate p-2 bg-[color:var(--mainTitleLightestColor)] rounded-2xl pl-4 w-full ">
          <h1 className="text-[10px] text-[color:var(--mainTitleLightColor)]">Select Due Date</h1>
            <div className="flex items-center justify-center w-full ">
          <input 
          type="date" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)}
          className="text-md bg-[color:var(--mainTitleLightestColor)] text-[color:var(--mainTitleColor)] mt-1 px-2 py-1 placeholder-slate-400 focus:outline-none focus:border-[color:var(--primaryColor)] focus:ring-[color:var(--primaryColor)] block rounded-md sm:text-sm focus:ring-1 w-full"
           />
          </div>
        </div>
      </div>
        

        <div className="flex items-center justify-center cursor-pointer bg-[color:var(--lightBackgroundColor)] text-[color:var(--mainTitleLightColor)] hover:bg-[color:var(--mainTitleLightColor)] hover:text-[color:var(--lightBackgroundColor)] rounded-xl flex items-center gap-x-2 p-2 font-bold m-2"   onClick={handleUpdate}>
            <h1 className="text-lg">
              <AiOutlineUpload />
            </h1>
            <h1 className="text-sm">Update Task</h1>
          </div>

          <div className="flex items-center justify-center cursor-pointer bg-red-100 hover:bg-red-500 hover:text-red-100 rounded-xl flex items-center gap-x-2 p-2 text-red-500 font-bold m-2"   onClick={() => handleDeleteTask(task)}>
            <h1 className="text-lg">
              <AiOutlineDelete />
            </h1>
            <h1 className="text-sm">Delete Task</h1>
          </div>
      </div>
    </div>
  );
};

export default TaskModal;
