// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CreateFolderForm from './CreateFolderForm';
// import FileUploadForm from './FileUploadForm';
// import { FaArrowLeft, FaFolder } from 'react-icons/fa';

// export interface Folder {
//   _id: string;
//   name: string;
//   parentFolder:string;
// }

// interface FolderStructureProps {
//   parentFolderId?: string;
// }

// const FolderStructure: React.FC<FolderStructureProps> = ({ parentFolderId }) => {
//   const [folders, setFolders] = useState<Folder[]>([]);
//   const [activeFolder, setActiveFolder] = useState<string | null>(parentFolderId || null);
//   const [activeFolderName, setActiveFolderName] = useState<string | null>(parentFolderId || null);
//   const [childFolders, setChildFolders] = useState<Folder[]>([]);

//   const fetchFolders = async (
//     folderId: string | null = activeFolder || (parentFolderId ? parentFolderId : null)
//   ) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/folder/folder/${folderId || ''}`);
//       setFolders(response.data);
//     } catch (error) {
//       console.error('Error fetching folders:', error);
//     }
//   };

//   const fetchChildFolders = async (folderId: string) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/folder/children/${folderId}`);
//       setChildFolders(response.data);
//     } catch (error) {
//       console.error('Error fetching child folders:', error);
//     }
//   };

//   useEffect(() => {
    
//     fetchFolders();
//   }, [activeFolder, activeFolderName,parentFolderId]);

//   const handleCreateFolder = async (folderName: string) => {
//     const actualParentFolderId = activeFolder || parentFolderId || null;
//     console.log('is it comming inside to create parent folder 2',actualParentFolderId,activeFolder)
//     if (actualParentFolderId !== null) {
//       try {
//         const response = await axios.post('http://localhost:5000/api/folder/create-folder', {
//           folderName,
//           parentFolderId: actualParentFolderId,
//         });
       
//         fetchChildFolders(actualParentFolderId);
        
//       } catch (error) {
//         console.error('Error creating folder:', error);
//       }
//     }else{
//         try {
//             const response = await axios.post('http://localhost:5000/api/folder/create-folder', {
//               folderName,
              
//             });
           
            
            
//           } catch (error) {
//             console.error('Error creating folder:', error);
//           }

//     }
//   };
  

//   const handleFolderClick = (folderId: string,folderName:string) => {
//     setActiveFolder(folderId);
//     setActiveFolderName(folderName)
//     fetchChildFolders(folderId); // Load child folders when a folder is clicked
//   };

//   const handleGoBack = () => {
//     // Fetch the parent folder's ID from the server
//     axios
//       .get(`http://localhost:5000/api/folder/parent/${activeFolder || ''}`)
//       .then((response) => {
//         if (response.data) {
//           const parentFolderId = response.data.parentFolderId;
//           setActiveFolder(parentFolderId); // Update the activeFolder state first
//           fetchFolders(parentFolderId); // Fetch the updated folder structure
//         } else {
//           // Handle the case when there's no parent folder (e.g., at the root)
//           setActiveFolder(null);
//           fetchFolders(); // Fetch the root folder structure
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching parent folder:', error);
//       });
//   };
  

//   return (
//     <div className=' overflow-x-hidden'>
//         <div className='flex items-center justify-between'>
//             <div className=''>
//                 {activeFolder && (
//                     <button onClick={handleGoBack} className='flex items-center  shadow-sm text-[color:var(--mainTitleColor)] m-1 p-1'><FaArrowLeft/><h3 className='ml-4'>{activeFolderName}</h3></button>
//                 )}
//             </div>
//             <div className=''>



//             </div>
//         </div>
//         <CreateFolderForm
//                 refreshData={() => fetchFolders(activeFolder || parentFolderId || null)}
//                 onCreateFolder={(folderName) => handleCreateFolder(folderName)}
//                 parentFolderId={activeFolder || parentFolderId || null}
//                 />

//             <ul>
//               {Array.isArray(folders) && folders.length > 0 ? (
//                 folders
//                   .filter((folder) => !folder.parentFolder) // Filter folders without a parent
//                   .map((folder) => (
//                     <li key={folder._id} onClick={() => handleFolderClick(folder._id,folder.name)} className='flex items-center bg-slate-100 m-2 h-10 text-[color:var(--mainTitleColor)] text-sm sm:text-md shadow-sm'>
//                     <div className='flex gap-x-4 items-center'><div className='text-[color:var(--primaryColor)] text-[20px] p-3 bg-slate-200 '><FaFolder/></div><div>{folder.name}</div></div> 
//                     </li>
//                   ))
//               ) : (
//             ''
//               )}
//             </ul>

//                     {Array.isArray(childFolders) && childFolders.length > 0 && (
//                 <div>
                  
//                   <ul className='p-2 space-y-2'>
//                     {childFolders.map((childFolder) => (
//                       <li key={childFolder._id} onClick={() => handleFolderClick(childFolder._id,childFolder.name)} className='flex items-center bg-white  text-[color:var(--mainTitleColor)] text-sm sm:text-md shadow-sm hover:-translate-y-1 hover:scale-100 rounded-xl p-4 duration-300 cursor-pointer'>
//                         <div className='flex gap-x-4 items-center p-2'><div className='text-[color:var(--primaryColor)] text-[20px]'><FaFolder/></div><div className=''> {childFolder.name}</div></div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             {activeFolder && (
              
//         <FileUploadForm folderId={activeFolder} refreshData={fetchFolders} />
//       )}

//     </div>
//   );
// };

// export default FolderStructure;




// Update 2
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CreateFolderForm from './CreateFolderForm';
// import FileUploadForm from './FileUploadForm';
// import { FaArrowLeft, FaFolder } from 'react-icons/fa';

// export interface Folder {
//   _id: string;
//   name: string;
//   parentFolder: string;
// }

// interface FolderStructureProps {
//   parentFolderId?: string;
// }

// const FolderStructure: React.FC<FolderStructureProps> = ({ parentFolderId }) => {
//   const [folders, setFolders] = useState<Folder[]>([]);
//   const [activeFolder, setActiveFolder] = useState<string | null>(parentFolderId || null);
//   const [activeFolderName, setActiveFolderName] = useState<string | null>(parentFolderId || null);
//   const [childFolders, setChildFolders] = useState<Folder[]>([]);
//   const [folderHierarchy, setFolderHierarchy] = useState<string[]>([]); // New state for folder hierarchy
//   const [navigationPath, setNavigationPath] = useState<string[]>([]);

//   const fetchFolders = async (
//     folderId: string | null = activeFolder || (parentFolderId ? parentFolderId : null)
//   ) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/folder/folder/${folderId || ''}`);
//       setFolders(response.data);
//     } catch (error) {
//       console.error('Error fetching folders:', error);
//     }
//   };

//   const fetchChildFolders = async (folderId: string) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/folder/children/${folderId}`);
//       setChildFolders(response.data);
//     } catch (error) {
//       console.error('Error fetching child folders:', error);
//     }
//   };

//   useEffect(() => {
//     fetchFolders();
//   }, [activeFolder, activeFolderName, parentFolderId]);

//   const handleCreateFolder = async (folderName: string) => {
//     const actualParentFolderId = activeFolder || parentFolderId || null;
//     if (actualParentFolderId !== null) {
//       try {
//         const response = await axios.post('http://localhost:5000/api/folder/create-folder', {
//           folderName,
//           parentFolderId: actualParentFolderId,
//         });
//         fetchChildFolders(actualParentFolderId);
//       } catch (error) {
//         console.error('Error creating folder:', error);
//       }
//     } else {
//       try {
//         const response = await axios.post('http://localhost:5000/api/folder/create-folder', {
//           folderName,
//         });
//       } catch (error) {
//         console.error('Error creating folder:', error);
//       }
//     }
//   };

//   const handleFolderClick = (folderId: string, folderName: string) => {
//     setActiveFolder(folderId);
//     setActiveFolderName(folderName);
//     fetchChildFolders(folderId);
//     updateFolderHierarchy(folderId);
//   };

//   const updateFolderHierarchy = (folderId: string) => {
//     if (folderId) {
//       setFolderHierarchy(prevHierarchy => [...prevHierarchy, folderId]);
//     }
//   };

//   const [folderNames, setFolderNames] = useState<string[]>([]);

//   // ...
  
//   const handleGoBack = () => {
//     if (folderHierarchy.length > 1) {
//       const parentFolderId = folderHierarchy[folderHierarchy.length - 2];
//       setActiveFolder(parentFolderId);
//       setFolderHierarchy((prevHierarchy) => prevHierarchy.slice(0, -1));
//       fetchChildFolders(parentFolderId);
//     } else {
//       setActiveFolder(null);
//       setChildFolders([]);
//       setFolderHierarchy([]);
//       fetchFolders();
//     }
//   };
  
// const handleNavigateToFolder = (index: number) => {
//   if (index === 0) {
//     setActiveFolder(null); // Reset to root folder
//     setFolderHierarchy([]); // Reset folder hierarchy
//     setChildFolders([]); // Clear child folders
//     fetchFolders(); // Fetch root folders
//   } else {
//     const folderId = folderHierarchy[index];
//     setActiveFolder(folderId);
//     setFolderHierarchy((prevHierarchy) => prevHierarchy.slice(0, index + 1));
//     fetchChildFolders(folderId);
//   }
// };

  
//   useEffect(() => {
//     // Fetch folder names for the entire hierarchy
//     const fetchFolderNames = async () => {
//       try {
//         const names = await Promise.all(
//           folderHierarchy.map(async (folderId) => {
//             const response = await axios.get(`http://localhost:5000/api/folder/folder/${folderId}`);
//             return response.data?.name || '';
//           })
//         );
//         setFolderNames(names);
//       } catch (error) {
//         console.error('Error fetching folder names:', error);
//       }
//     };
  
//     fetchFolderNames();
//   }, [folderHierarchy]);
  
//   // ...
  

  

//   return (
//     <div className='overflow-x-hidden'>
//       <div className='flex items-center justify-between'>
//         <div className=''>
  
//           <div className='flex items-center space-x-2'>
//                     {folderHierarchy.map((folderId, index) => (
//             <span
//               key={folderId}
//               className='text-[color:var(--mainTitleColor)] cursor-pointer'
//               onClick={() => handleNavigateToFolder(index)}>
//               {index >0 && ' > '}
//               {folderNames[index]}
//             </span>
//           ))}

//           </div>

//         </div>
//         <div className=''></div>
//       </div>
//       <CreateFolderForm
//         refreshData={() => fetchFolders(activeFolder || parentFolderId || null)}
//         onCreateFolder={(folderName) => handleCreateFolder(folderName)}
//         parentFolderId={activeFolder || parentFolderId || null}
//       />

//       <ul>
//         {Array.isArray(folders) && folders.length > 0 ? (
//           folders
//             .filter((folder) => !folder.parentFolder)
//             .map((folder) => (
//               <li
//                 key={folder._id}
//                 onClick={() => handleFolderClick(folder._id, folder.name)}
//                 className='flex items-center bg-slate-100 m-2 h-10 text-[color:var(--mainTitleColor)] text-sm sm:text-md shadow-sm'>
//                 <div className='flex gap-x-4 items-center'>
//                   <div className='text-[color:var(--primaryColor)] text-[20px] p-3 bg-slate-200 '>
//                     <FaFolder />
//                   </div>
//                   <div>{folder.name}</div>
//                 </div>
//               </li>
//             ))
//         ) : (
//           ''
//         )}
//       </ul>

//       {Array.isArray(childFolders) && childFolders.length > 0 && (
//         <div>
//           <ul className='p-2 space-y-2'>
//             {childFolders.map((childFolder) => (
//               <li
//                 key={childFolder._id}
//                 onClick={() => handleFolderClick(childFolder._id, childFolder.name)}
//                 className='flex items-center bg-white  text-[color:var(--mainTitleColor)] text-sm sm:text-md shadow-sm hover:-translate-y-1 hover:scale-100 rounded-xl p-4 duration-300 cursor-pointer'>
//                 <div className='flex gap-x-4 items-center p-2'>
//                   <div className='text-[color:var(--primaryColor)] text-[20px]'>
//                     <FaFolder />
//                   </div>
//                   <div className=''> {childFolder.name}</div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       {activeFolder && <FileUploadForm folderId={activeFolder} refreshData={fetchFolders} />}
//     </div>
//   );
// };

// export default FolderStructure;




// Update 3
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateFolderForm from './CreateFolderForm';
import FileUploadForm from './FileUploadForm';
import Select from 'react-select';
import { EllipsisOutlined } from '@ant-design/icons';
import { FaAngleLeft, FaAngleRight, FaArrowLeft, FaFolder, FaLock, FaPen, FaTrash, FaUnlock, FaUserPlus } from 'react-icons/fa';
import CommonPopup from '@/app/components/common/popUp';
import { Popover } from 'antd';

export interface Folder {
  createdAt: Date;
  _id: string;
  name: string;
  parentFolder: string;
  publicAccess: boolean; // Property to indicate if folder is publicly accessible
  allowed_users: string[]; // Array of user IDs allowed to access the folder
  access_control_ids:string[];
}

interface User {
  _id: string;
  first_name: string;
  name:string;
 
}

interface FolderStructureProps {
  parentFolderId?: string;
  project_name?:string;
  contractorId?:string;
  recieved_folders?:any;
}

const FolderStructure: React.FC<FolderStructureProps> = ({ parentFolderId,project_name ,contractorId,recieved_folders}) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [folders2, setFolders2] = useState<Folder[]>([]);
  const [activeFolder, setActiveFolder] = useState<string | null>(parentFolderId || null);
  const [activeFolderName, setActiveFolderName] = useState<string | null>(parentFolderId || null);
  const [childFolders, setChildFolders] = useState<Folder[]>([]);
  const [folderHierarchy, setFolderHierarchy] = useState<string[]>([]);
  const [allusers, setUsers] = useState<User[]>([]); // State to store users
  const [contractorCompanies, setContractorCompanies] = useState([]);
  const [editFolderId, setEditFolderId] = useState<string | null>(null);
  const [editedFolderName, setEditedFolderName] = useState<string>('');
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [folderNames, setFolderNames] = useState<string[]>([]);
  const [popupFolder, setPopupFolder] = useState<Folder | null>(null); // Store entire folder object
  console.warn(parentFolderId,project_name)
 
  const fetchFoldersByIDs = async () => {
    try {
        if (recieved_folders?.length > 0) { // Check if recieved_folders is non-empty
            const response = await axios.get('http://localhost:5000/api/folder/recievedFolders/foldersbyIds', {
                params: { ids: recieved_folders } // Pass project IDs as query parameters
            });
            setFolders2(response.data);
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching projects by IDs:', error);
        throw error;
    }
};

useEffect(() => {
    fetchFoldersByIDs();
}, []);


    const fetchFolders = async (
    folderId: string | null = activeFolder || (parentFolderId ? parentFolderId : null)
  ) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/folder/folder/${folderId || ''}`, {
        params: {
          projectId: project_name // Pass project_name as a query parameter
        }
      });
      
      setFolders(response.data);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };
  useEffect(() => {
    fetchFolders();
  }, [activeFolder, activeFolderName, parentFolderId]);
  useEffect(() => {
    if (activeFolder) {
      fetchChildFolders(activeFolder);
    }
  }, [activeFolder]);
  const fetchChildFolders = async (folderId: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/folder/children/${folderId}`);
      setChildFolders(response.data);
    } catch (error) {
      console.error('Error fetching child folders:', error);
    }
  };

  const handleCreateFolder = async (folderName: string) => {
    const actualParentFolderId = activeFolder || parentFolderId || null;
    
    // Get the current date and time in IST
    const currentDate = new Date();
    const currentISTDate = currentDate.toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
    });
    
    // Format the date as per your requirement
    const formattedDate = new Date(currentISTDate);
    const formattedDateString = formattedDate.toISOString(); // Get the ISO string
    
    if (actualParentFolderId !== null) {
        try {
            const response = await axios.post('http://localhost:5000/api/folder/create-folder', {
                folderName,
                parentFolderId: actualParentFolderId,                                                                            
                createdAt: formattedDateString, // Include the creation date and time
            });
            fetchChildFolders(actualParentFolderId);
        } catch (error) {
            console.error('Error creating folder:', error);
        }
    } else {
        try {
            const response = await axios.post('http://localhost:5000/api/folder/create-folder', {
                folderName,
                projectId: project_name,
                createdAt: formattedDateString, // Include the creation date and time
            });
        } catch (error) {
            console.error('Error creating folder:', error);
        }
    }
};

  const handleFolderClick = (folderId: string, folderName: string, folder:Folder,index: number) => {
    setActiveFolder(folder._id);
    setActiveFolderName(folder.name);
    fetchChildFolders(folder._id);
    updateFolderHierarchy(folder._id);
    // handleTogglePopup(folder, index); // Pass folder ID and index to handleTogglePopup
  };

  const updateFolderHierarchy = (folderId: string) => {
    if (folderId) {
      setFolderHierarchy(prevHierarchy => [...prevHierarchy, folderId]);
    }
  };

const handleNavigateToFolder = (index: number) => {
  if (index === 0) {
    setActiveFolder(null); // Reset to root folder
    setFolderHierarchy([]); // Reset folder hierarchy
    setChildFolders([]); // Clear child folders
    fetchFolders(); // Fetch root folders
  } else {
    const folderId = folderHierarchy[index];
    setActiveFolder(folderId);
    setFolderHierarchy((prevHierarchy) => prevHierarchy.slice(0, index + 1));
    fetchChildFolders(folderId);
  }
};

  useEffect(() => {
    // Fetch folder names for the entire hierarchy
    const fetchFolderNames = async () => {
      try {
        const names = await Promise.all(
          folderHierarchy.map(async (folderId) => {
            const response = await axios.get(`http://localhost:5000/api/folder/folder/${folderId}`);
            return response.data?.name || '';
          })
        );
        setFolderNames(names);
      } catch (error) {
        console.error('Error fetching folder names:', error);
      }
    };
  
    fetchFolderNames();
  }, [folderHierarchy]);
  

  const handleEditFolder = (folderId: string, folderName: string) => {
    setEditFolderId(folderId);
    setEditedFolderName(folderName);
  };

  const handleCancelEdit = () => {
    setEditFolderId(null);
    setEditedFolderName('');
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/folder/folder/${editFolderId}/rename`, {
        name: editedFolderName,
      });
      setEditFolderId(null);
      setEditedFolderName('');
      fetchFolders();
    } catch (error) {
      console.error('Error updating folder name:', error);
    }
  };

  
  const handleSaveEditChild = async () => {
    try {
      await axios.put(`http://localhost:5000/api/folder/${editFolderId}/rename`, {
        newName: editedFolderName,
      });
      setEditFolderId(null);
      fetchFolders(activeFolder || parentFolderId || null);
    } catch (error) {
      console.error('Error renaming folder:', error);
    }
  };
  
  const handleCancelEditChild = () => {
    setEditFolderId(null);
    setEditedFolderName('');
  };

    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user');
        setUsers(response.data); // Set the fetched users in state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    const fetchContractorCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contractor_company');
        const contractorCompanies = response.data;
        setContractorCompanies(contractorCompanies); // Set the fetched contractor companies in state
      } catch (error) {
        console.error('Error fetching contractor companies:', error);
      }
    };
  
    useEffect(() => {
      fetchUsers(); // Fetch users when the component mounts
      fetchContractorCompanies(); // Fetch contractor companies when the component mounts
    }, []);

      
  const handleDeleteFolder = async (folderId:string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/folder/folder/${folderId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Folder deleted successfully, update UI or fetch data again
        fetchFolders();
        fetchChildFolders(activeFolder||'')
      } else {
        // Handle error
        console.error('Failed to delete folder');
      }
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  const handleTogglePopup = (folder: Folder, index: number) => {
      setPopupVisible(!isPopupVisible);
      setPopupFolder(folder); // Set the entire folder object to state
  
    };
  
    const handleRevokeAccess = async (folderId: string, userId: string) => {
      try {
        // Call API to revoke access for the specified user in the folder
        await axios.put(`http://localhost:5000/api/folder/folder/${folderId}/revoke-access`, { userId });
    
        // Update the local state to reflect the changes
        setPopupFolder((prevFolder: Folder | null) => {
          if (!prevFolder) {
            return null; // Return null if there is no folder
          }
    
          // Check if the current popup folder matches the updated folder
          if (prevFolder._id === folderId) {
            // Filter out the revoked user from the allowed_users array
            const updatedAllowedUsers = prevFolder.allowed_users.filter(id => id !== userId);
    
            // Return the updated folder object with the new allowed_users array
            return {
              ...prevFolder,
              allowed_users: updatedAllowedUsers
            };
          } else {
            return prevFolder; // Return the unmodified folder if it doesn't match the current popup folder
          }
        });
    
        // Fetch folders after revoking access
        fetchFolders();
        fetchChildFolders(activeFolder || '');
    
      } catch (error) {
        console.error('Error revoking access:', error);
      }
    };
    
    const handleGiveAccess = async (folderId: string, userIds: string[]) => {
      try {
        // Iterate over each user ID and give access to the folder
        await Promise.all(userIds.map(userId => axios.put(`http://localhost:5000/api/folder/folder/${folderId}/give-access`, { userId,contractorId })));
    
        // Update folder state after granting access
        setPopupFolder((prevFolder: Folder | null) => {
          if (!prevFolder) {
            return null; // Return null if there is no folder
          }
    
          // Check if the current popup folder matches the updated folder
          if (prevFolder._id === folderId) {
            // Update the allowed_users array with the newly added users
            const updatedAllowedUsers = [...new Set([...prevFolder.allowed_users, ...userIds])];
    
            // Return the updated folder object with the new allowed_users array
            return {
              ...prevFolder,
              allowed_users: updatedAllowedUsers
            };
          } else {
            return prevFolder; // Return the unmodified folder if it doesn't match the current popup folder
          }
        });
    
        // Fetch folders after granting access
        fetchFolders();
        fetchChildFolders(activeFolder || '');
    
      } catch (error) {
        console.error('Error giving access to multiple users:', error);
      }
    };
    
  const users = [...allusers, ...contractorCompanies];
    
 useEffect(() => {
  // Merge projects2 into projects
  setFolders((prevFolders: any) => [...prevFolders, ...folders2]);
}, [folders2]);
  return (
    <>
    <div className='overflow-x-hidden '>
      <div className='flex items-center justify-between'>
        <div className=''> 
          <div className='flex items-center space-x-2'>          
          {folderHierarchy.map((folderId, index) => (
            <span
              key={folderId}
              className='flex items-center text-[color:var(--mainTitleColor)] cursor-pointer'
              onClick={() => handleNavigateToFolder(index)}>
              {index >0 &&  <FaAngleRight/>}
              {folderNames[index]}   
            </span>
          ))}
          </div>
        </div>
        <div className=''></div>
      </div>
      <CreateFolderForm
        refreshData={() => fetchFolders(activeFolder || parentFolderId || null)}
        onCreateFolder={(folderName) => handleCreateFolder(folderName)}
        parentFolderId={activeFolder || parentFolderId || null}
      />
    <table className="w-full">
      <tbody className='flex flex-wrap gap-x-1'>
      {Array.isArray(folders) && folders.length > 0 ? (
      folders
        .filter((folder) => !folder.parentFolder)
        .map((folder, index) => (
          <tr key={folder._id} className={`${index % 2 === 0 ? '' : 'hidden'} md:flex p-2`}>
            {editFolderId === folder._id ? (
              <>
                <td colSpan={4} className="flex flex-col items-center justify-center">
                  <input
                    type='text'
                    value={editedFolderName}
                    onChange={(e) => setEditedFolderName(e.target.value)}
                    autoFocus
                    onFocus={(e) => e.target.select()}
                  />
                  <button className='p-1 pl-2 pr-2 m-2 shadow-md rounded-sm text-white font-bold bg-[color:var(--mainTitleColor)] hover:-translate-y-1 hover:scale-110  duration-300 cursor-pointer' onClick={handleSaveEdit}>Save</button>
                  <button className='p-1 pl-2 pr-2 m-2 shadow-md rounded-sm text-red-500 font-bold bg-red-100 hover:-translate-y-1 hover:scale-110  duration-300 cursor-pointer' onClick={handleCancelEdit}>Cancel</button>
                </td>
              </>
            ) : (
            <>
              <td  className={`relative shadow-md p-2 rounded-md h-auto  ${recieved_folders?.includes(folder._id ?? '') ? 'bg-yellow-50 rounded-t-xl' : 'bg-white'}`}>

                <div className="flex flex-col items-center justify-center gap-x-2 cursor-pointer hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer " onClick={() => handleFolderClick(folder._id, folder.name, folder,index)}>
                  <div className={`text-[color:var(--primaryColor)] opacity-40 text-[100px]`}>
                    <FaFolder/>
                  </div>
                  <h1 className='text-lg font-semibold w-[100px] truncate'>{folder.name}</h1>
                </div>

                <div className='text-[color:var(--lightGrayFontColor)] text-sm p-2'>
                {folder.createdAt && !isNaN(new Date(folder.createdAt).getTime()) ? 
                    (() => {
                        const dateObj = new Date(folder.createdAt);
                        const dateString = dateObj.toLocaleDateString('en-US', {
                            timeZone: 'Asia/Kolkata',
                        });
                        const timeString = dateObj.toLocaleTimeString('en-US', {
                            timeZone: 'Asia/Kolkata',
                            hour12: false,
                            hour: '2-digit',
                            minute: '2-digit',
                        });
                        return `${dateString} ${timeString}`;
                    })()
                  : ''}

                </div>
                <div >
                  <div className='absolute top-0 right-0 p-1'>
                          <Popover content={
                <div className='flex justify-between items-center'>
                  <div className="cursor-pointer p-2 hover:bg-[color:var(--lightBackgroundColor)] hover:rounded-full hover:text-white" onClick={() => handleEditFolder(folder._id, folder.name)}>
                    <FaPen />
                  </div>
                  <div className='cursor-pointer p-2 hover:bg-[color:var(--lightBackgroundColor)] hover:rounded-full hover:text-white' onClick={() => handleTogglePopup(folder,index)}>
                    <FaUserPlus />
                  </div>
                  {recieved_folders?.includes(folder._id ?? '') ?'':
                  <div className='cursor-pointer p-2 hover:bg-[color:var(--lightBackgroundColor)] hover:rounded-full hover:text-white' onClick={() => handleDeleteFolder(folder._id)}>
                            <FaTrash />
                          </div>}
                </div>
                                        } trigger="click">
                                        <EllipsisOutlined />
                  </Popover>
                  </div>
                  </div>
                {isPopupVisible && (
                            <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-10 ">
                              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                <div className="flex justify-between items-center mb-4">
                                  <div className='flex text-lg font-bold items-center items-center gap-x-4'>
                                    <h4 className='text-[color:var(--primaryColor)]'><FaFolder/></h4>
                                    <h4 className='  ' >{popupFolder?.name}</h4>                                   
                                  </div>
                                  <div className='text-3xl p-2 m-2 '>
                                  <button  onClick={() => handleTogglePopup(folder,index)}>&times;</button>
                                  </div>
                                </div>
                                <h3>Allowed Users</h3>
                                {popupFolder?.allowed_users.map((userId) => {
                                            // Find the user object in the users array based on the userId
                                    const user = users.find((user) => user._id === userId);
                                    if (user) {
                                        return (
                                        <div key={userId} className="flex items-center justify-between bg-gray-100 p-2 rounded-xl mb-2 cursor-pointer" onClick={() => handleRevokeAccess(popupFolder._id, userId)}>
                                        <div className="mr-2">{`${user.first_name} (${userId})`}</div>
                                            <button className="text-red-500 bg-red-100 hover:bg-[color:var(--lightBackgroundColor)] rounded-xl px-4">Revoke Access</button>
                                        </div>
                                        );
                                    } else {
                                    return null; // User not found in users array
                                    }
                                    })}
                                    <Select
                                      options={users.map(user => ({ value: user._id, label: user.first_name || user.name }))}
                                      isMulti
                                  
                                      onChange={(selectedOptions) => {
                                      const selectedUserIds = selectedOptions.map(option => option.value);
                                      if (popupFolder) {
                                        handleGiveAccess(popupFolder._id, selectedUserIds);
                                        }
                                      }}
                                      placeholder="Select Users"
                                    />
                              </div>
                            </div>
                          )}
              </td>
              </>
              )}
          </tr>
        ))
        ) : (
            ''
            )}
      </tbody>
    </table>

    <table className="w-full">
      <tbody className="flex flex-wrap gap-x-4">
        {Array.isArray(childFolders) && childFolders.length > 0 ? (
          childFolders.map((childFolder, index) => (
            <tr key={childFolder._id} className={`${index % 2 === 0 ? '' : 'hidden'} md:flex p-2`}>
              {editFolderId === childFolder._id ? (
                <>
                  <td colSpan={4} className="flex flex-col items-center justify-center">
                    <input
                      type="text"
                      value={editedFolderName}
                      onChange={(e) => setEditedFolderName(e.target.value)}
                      autoFocus
                      onFocus={(e) => e.target.select()}
                      />
                    <button onClick={handleSaveEditChild}>Save</button>
                    <button onClick={handleCancelEditChild}>Cancel</button>
                    </td>
                      </>
                    ) : (
                      <>
                        <td className="relative shadow-md p-2 rounded-md h-auto">

                          <div className="flex flex-col items-center justify-center gap-x-2 cursor-pointer hover:-translate-y-1 hover:scale-110  duration-300 cursor-pointer "  onClick={() => handleFolderClick(childFolder._id, childFolder.name,childFolder,index)} >
                            <div className="text-[color:var(--primaryColor)] opacity-40 text-[100px]">
                              <FaFolder />
                            </div>
                            <h1 className='flex items-center justify-center text-lg font-semibold w-[100px] truncate'> {childFolder.name}</h1>
                          </div>

                          <div className="text-[color:var(--lightGrayFontColor)]">
        
                            <div className='text-[color:var(--lightGrayFontColor)] text-sm p-2'>
                            {childFolder.createdAt && !isNaN(new Date(childFolder.createdAt).getTime()) ? 
                                (() => {
                                    const dateObj = new Date(childFolder.createdAt);
                                    const dateString = dateObj.toLocaleDateString('en-US', {
                                        timeZone: 'Asia/Kolkata',
                                    });
                                    const timeString = dateObj.toLocaleTimeString('en-US', {
                                        timeZone: 'Asia/Kolkata',
                                        hour12: false,
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    });
                                    return `${dateString} ${timeString}`;
                                })()
                              : ''}

                            </div>
                          </div>
                          <div >
                            <div className='absolute top-0 right-0 p-1'>
                          <Popover content={
                          <div className="flex justify-between items-center">
                            <div className="cursor-pointer p-1 hover:bg-[color:var(--lightBackgroundColor)] hover:rounded-full hover:text-white" onClick={() => handleEditFolder(childFolder._id, childFolder.name)}>
                              <FaPen />
                            </div>
                            <div className="cursor-pointer p-1 hover:bg-[color:var(--lightBackgroundColor)] hover:rounded-full hover:text-white" onClick={()=>handleTogglePopup(childFolder,index)}>
                              <FaUserPlus />
                            </div>
                            <div className='cursor-pointer p-2 hover:bg-[color:var(--lightBackgroundColor)] hover:rounded-full hover:text-white' onClick={() => handleDeleteFolder(childFolder._id)}>
                            <FaTrash />
                          </div>
                          </div>
                                                                  } trigger="click">
                                                                  <EllipsisOutlined />
                                            </Popover>
                                            </div>
                                            </div>
                          {isPopupVisible && (
                            <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-10 ">
                              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                <div className="flex justify-between items-center mb-4">
                                  <div className='flex text-lg font-bold items-center items-center gap-x-4'>
                                    <h4 className='text-[color:var(--primaryColor)]'><FaFolder/></h4>
                                    <h4 className='  ' >{popupFolder?.name}</h4>                                   
                                  </div>
                                  <div className='text-3xl p-2 m-2 '>
                                  <button  onClick={() => handleTogglePopup(childFolder,index)}>&times;</button>
                                  </div>
                                </div>
                                <h3>Allowed Users</h3>
                                {popupFolder?.allowed_users.map((userId) => {
                                            // Find the user object in the users array based on the userId
                                    const user = users.find((user) => user._id === userId);
                                    if (user) {
                                        return (
                                        <div key={userId} className="flex items-center justify-between bg-gray-100 p-2 rounded-xl mb-2 cursor-pointer" onClick={() => handleRevokeAccess(popupFolder._id, userId)}>
                                        <div className="mr-2">{`${user.first_name} (${userId})`}</div>
                                            <button className="text-red-500 bg-red-100 hover:bg-[color:var(--lightBackgroundColor)] rounded-xl px-4">Revoke Access</button>
                                        </div>
                                        );
                                    } else {
                                    return null; // User not found in users array
                                    }
                                    })}
                                    <Select
                                      options={users.map(user => ({ value: user._id, label: user.first_name || user.name }))}
                                      isMulti
                                  
                                      onChange={(selectedOptions) => {
                                      const selectedUserIds = selectedOptions.map(option => option.value);
                                      if (popupFolder) {
                                        handleGiveAccess(popupFolder._id, selectedUserIds);
                                        }
                                      }}
                                      placeholder="Select Users"
                                    />
                              </div>
                            </div>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
''
              )}
            </tbody>
            </table>
      {activeFolder && <FileUploadForm folderId={activeFolder} refreshData={fetchFolders} />}
    </div>
    </>
  );
};

export default FolderStructure;






    // const handleRevokeAccess = async (folderId: string, userId: string) => {
    //   try {
    //     // Revoke access to the user for the folder
    //     await axios.put(`http://localhost:5000/api/folder/folder/${folderId}/revoke-access`, { userId });
    
    //     // Update folder state after revoking access
    //     setFolders(prevFolders => {
    //       if (!Array.isArray(prevFolders)) {
    //         return prevFolders; // Return the current state if it's not an array
    //       }
    
    //       // Create a new array of folders with updated allowedUsers for the target folder
    //       const updatedFolders = prevFolders.map(folder => {
    //         if (folder._id === folderId) {
    //           // Create a new folder object with the updated allowedUsers array
    //           return { ...folder, allowedUsers: folder.allowedUsers.filter(id => id !== userId) };
    //         }
    //         return folder;
    //       });
    
    //       return updatedFolders;
    //     });
    //   } catch (error) {
    //     console.error('Error revoking access from user:', error);
    //   }
    // };
    
    
    // const handleGiveAccess = async (folderId: string, userIds: string[]) => {
    //   try {
    //     // Iterate over each user ID and give access to the folder
    //     await Promise.all(userIds.map(userId => axios.put(`http://localhost:5000/api/folder/folder/${folderId}/give-access`, { userId })));
    
    //     // Update folder state after granting access
    //     setFolders(prevFolders => {
    //       if (!Array.isArray(prevFolders)) {
    //         return prevFolders; // Return the current state if it's not an array
    //       }
    
    //       // Create a new array of folders with updated allowedUsers for the target folder
    //       const updatedFolders = prevFolders.map(folder => {
    //         if (folder._id === folderId) {
    //           // Create a new folder object with the updated allowedUsers array
    //           return { ...folder, allowedUsers: [...new Set([...folder.allowedUsers, ...userIds])] };
    //         }
    //         return folder;
    //       });
    
    //       return updatedFolders;
    //     });
    //   } catch (error) {
    //     console.error('Error giving access to multiple users:', error);
    //   }
    // };