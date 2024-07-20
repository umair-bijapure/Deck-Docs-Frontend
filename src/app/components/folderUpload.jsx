// import React, { useRef, useState } from 'react';
// import axios from 'axios';

// const UploadDirectory = () => {
//   const [selectedFolder, setSelectedFolder] = useState(null);

//   const handleUpload = async () => {
//     if (!selectedFolder) {
//       console.error('No directory selected.');
//       return;
//     }

//     // Handle upload logic
//   };

//   const handleFolderSelect = async () => {
//     try {
//       const folderHandle = await window.showDirectoryPicker();
//       setSelectedFolder(folderHandle);
//     } catch (error) {
//       console.error('Error selecting folder:', error);
//     }
//   };

//   return (
//     <div>
//       <div
//         onClick={handleFolderSelect}
//         style={{ width: '100%', height: '200px', border: '2px dashed #ccc', cursor: 'pointer' }}
//       >
//         <p>Click here to select a folder</p>
//       </div>
//       {selectedFolder && (
//         <div>
//           Selected folder: {selectedFolder.name}
//           <button onClick={handleUpload}>Upload Directory</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadDirectory;


// import React, { useRef, useState } from 'react';
// import axios from 'axios';
// import { getUploadedImageLink } from './utils/utils';


// const UploadDirectory = () => {
//   const [selectedFolder, setSelectedFolder] = useState(null);
//   const [folderContents, setFolderContents] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   const handleUpload = async () => {
//     setUploading(true);
//     try {
//       // Upload each file in the folder to AWS
//       const uploadPromises = folderContents.map(async (file) => {
//         return getUploadedImageLink(file);
//       });
//       const uploadedLinks = await Promise.all(uploadPromises);
//       console.log('Uploaded links:', uploadedLinks);
//       alert('Folder contents uploaded successfully!');
//     } catch (error) {
//       console.error('Error uploading folder contents:', error);
//       alert('Error uploading folder contents');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleFolderSelect = async () => {
//     try {
//       const folderHandle = await window.showDirectoryPicker();
//       const folderContents = await getFolderContents(folderHandle);
//       setSelectedFolder(folderHandle);
//       setFolderContents(folderContents);
//     } catch (error) {
//       console.error('Error selecting folder:', error);
//     }
//   };

//   const getFolderContents = async (folderHandle) => {
//     const files = [];
//     for await (const [name, handle] of folderHandle.entries()) {
//       console.warn(handle.kind,"44444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444")
//       if (handle.kind === 'file') {
//         const file = await handle.getFile();
//         files.push(file);
//       } else if (handle.kind === 'directory') {
//         const nestedFolderContents = await getFolderContents(handle);
//         files.push(...nestedFolderContents);
//       }
//     }
//     return files;
//   };
  

//   return (
//     <div>
//       <div
//         onClick={handleFolderSelect}
//         style={{ width: '100%', height: '200px', border: '2px dashed #ccc', cursor: 'pointer' }}
//       >
//         <p>Click here to select a folder</p>
//       </div>
//       {selectedFolder && (
//         <div>
//           Selected folder: {selectedFolder.name}
//           {folderContents.length > 0 && (
//             <div>
//               <p>Folder contents:</p>
//               <ul>
//                 {folderContents.map((file, index) => (
//                   <li key={index}>{file.name}</li>
//                 ))}
//               </ul>
//               <button onClick={handleUpload} disabled={uploading}>
//                 {uploading ? 'Uploading...' : 'Upload Folder'}
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadDirectory;http://localhost:5000/api/directory-upload



// import React, { useRef, useState } from 'react';
// import axios from 'axios';
// import { getUploadedImageLink } from './utils/utils';


// const UploadDirectory = ({ projectId ,contractor_company})=> {
//   const [selectedFolder, setSelectedFolder] = useState(null);
//   const [folderContents, setFolderContents] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   const handleUpload = async () => {
//     setUploading(true);
//     console.warn(folderContents, "LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
//     try {
//       if (!folderContents || folderContents.length === 0) {
//         throw new Error('No folder contents to upload');
//       }
  
//       // Initialize a queue to track folders for processing
//       const queue = [...folderContents];
  
//       // Iterate through the queue and process each item
//       while (queue.length > 0) {
//         const currentItem = queue.shift();
//         if (currentItem.kind === 'directory') {
//           // Process directory
//           console.log('Processing directory:', currentItem.name);
//           // Add directory contents to the queue for further processing
//           const directoryContents = await getFolderContents(currentItem);
//           queue.push(...directoryContents);
//           // Prepare folder data to send to the backend
//           const folderData = {
//             folderName: currentItem.name,
//             files: [],
//             parentId: selectedFolder.parentFolder ? selectedFolder.parentFolder._id : null,
//             projectId:projectId,
//             contractor_company:contractor_company
//           };
//           // Send folderData to the backend
//           await axios.post('http://localhost:5000/api/folder/directory/create-directory', folderData);
//         } else if (currentItem.kind === 'file') {
//           // Process file
//           console.log('Processing file:', currentItem.name);
//           try {
//             const fileData = await processFile(currentItem);
//             console.log('File processed:', fileData);
//           } catch (fileError) {
//             console.error('Error processing file:', fileError);
//           }
//         }
//       }
  
//       // Reset state and notify user
//       setFolderContents([]);
//       setSelectedFolder(null);
//       alert('Folder contents uploaded successfully!');
//     } catch (error) {
//       console.error('Error uploading folder contents:', error);
//       alert('Error uploading folder contents');
//     } finally {
//       setUploading(false);
//     }
//   };
  
  

//   const processFile = async (file) => {
//     // Upload the file to AWS and get the link
//     const fileLink = await getUploadedImageLink(file);

//     // Map the link to the parent folder
//     return {
//       fileName: file.name,
//       fileLink: fileLink,
//     };
//   };

//   const handleFolderSelect = async () => {
//     try {
//       const folderHandle = await window.showDirectoryPicker();
//       const folderContents = await getFolderContents(folderHandle);
//       setSelectedFolder(folderHandle);
//       setFolderContents(folderContents);
//     } catch (error) {
//       console.error('Error selecting folder:', error);
//     }
//   };

//   const getFolderContents = async (folderHandle) => {
//     const files = [];
//     for await (const [name, handle] of folderHandle.entries()) {
//       if (handle.kind === 'file') {
//         const file = await handle.getFile();
//         files.push(file);
//       } else if (handle.kind === 'directory') {
//         files.push(handle); // Add the directory itself to the files array
//         const nestedFolderContents = await getFolderContents(handle);
//         files.push(...nestedFolderContents);
//       }
//     }
//     return files;
//   };

//   return (
//     <div>
//       <div
//         onClick={handleFolderSelect}
//         style={{ width: '100%', height: '200px', border: '2px dashed #ccc', cursor: 'pointer' }}
//       >
//         <p>Click here to select a folder</p>
//       </div>
//       {selectedFolder && (
//         <div>
//           Selected folder: {selectedFolder.name}
//           {folderContents.length > 0 && (
//             <div>
//               <p>Folder contents:</p>
//               <ul>
//                 {folderContents.map((item, index) => (
//                   <li key={index}>{item.name}</li>
//                 ))}
//               </ul>
//               <button onClick={handleUpload} disabled={uploading}>
//                 {uploading ? 'Uploading...' : 'Upload Folder'}
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadDirectory;



//Folder upload successfull version
// import React, { useRef, useState,useEffect } from 'react';
// import axios from 'axios';
// import { getUploadedImageLink } from './utils/utils';
// const UploadDirectory = ({ projectId, contractor_company }) => {
//   const [selectedFolder, setSelectedFolder] = useState(null);
//   const [folderContents, setFolderContents] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [queue, setQueue] = useState({}); // Use useState to store the queue

//   useEffect(() => {
//     console.warn("Queue has been updated:", queue);
//   }, [queue]); // Execute when queue is updated

//   // Function to print the queue
//   const printQueue = () => {
//     console.warn("Printing Queue...........................:");
//     if (Object.keys(queue).length === 0) {
//       console.warn("Queue is empty.");
//     } else {
//       for (const key in queue) {
//         if (Object.prototype.hasOwnProperty.call(queue, key)) {
//           console.warn(key, queue[key],"vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
//         }
//       }
//     }
//   };
  
// // Function to get folder contents
// const getFolderContents = async (folderHandle, parentFolderName = null) => {
//   const files = [];
//   for await (const [name, handle] of folderHandle.entries()) {
//     if (handle.kind === 'file') {
//       const file = await handle.getFile();
//       files.push(file);
//     } else if (handle.kind === 'directory') {
//       files.push(handle); // Add the directory itself to the files array

//       // Update queue state
//       setQueue(prevQueue => ({
//         ...prevQueue,
//         [handle.name]: {
//           parentFolderName: parentFolderName || "",
//           objectId: null,
//           parentFolderId: null,
//         }
//       }));

//       const nestedFolderContents = await getFolderContents(handle, handle.name);
//       files.push(...nestedFolderContents);
//     }
//   }
//   return files;
// };

// const handleFolderSelect = async () => {
//   try {
//     const folderHandle = await window.showDirectoryPicker();
//     setQueue(prevQueue => ({
//       ...prevQueue,
//       [folderHandle.name]: {
//         parentFolderName: "",
//         objectId: null,
//         parentFolderId: null,
//       }
//     }));
//     const folderContents = await getFolderContents(folderHandle, folderHandle.name);
//     // Include the parent folder itself in the folder contents
//     folderContents.unshift(folderHandle);
//     setSelectedFolder(folderHandle);
//     setFolderContents(folderContents);
//   } catch (error) {
//     console.error('Error selecting folder:', error);
//   }
// };
  
  

// const handleUpload = async () => {
//   setUploading(true);
//   console.warn(folderContents, "LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
//   try {
//     if (!folderContents || folderContents.length === 0) {
//       throw new Error('No folder contents to upload');
//     }

//     console.warn(queue,"jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")

//     // Iterate through the queue and process each item
//     while (Object.keys(queue).length > 0) {
//       const currentItemKey = Object.keys(queue)[0];

//       const currentItem = queue[currentItemKey];
//       console.warn(currentItem,currentItemKey,"iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
//       if (selectedFolder.name===currentItemKey){
//       let folderData = {
//         folderName: currentItemKey,
//         parentFolderId: currentItem.parentFolderId, 
//         projectId: selectedFolder ? (selectedFolder.name === currentItemKey ? projectId : "") : "",
//         contractor_company: contractor_company
//       };
//       const response = await axios.post('http://localhost:5000/api/folder/create-folder', folderData);
//       console.warn(response,"11111111111111vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")
//       let updatedParentFolderId = response.data._id;
//       console.warn(selectedFolder,"11111111111111BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
//       // Update parentFolderId of child folders in the queue
     
//         console.warn(selectedFolder.name, currentItemKey,queue[currentItemKey],"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
//         console.warn( queue[currentItemKey].parentFolderId,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
//         for (const childKey of Object.keys(queue)) {
//           console.warn(queue[childKey],queue[childKey].parentFolderName , currentItemKey,"fffffffffffffffffffffffffffffffffffgggggggggggooooooooooooooooooooooooooooooooooooooooooooffffffffffffffffffffffffffff")
//           if (queue[childKey].parentFolderName === currentItemKey) {
//             queue[childKey].parentFolderId = updatedParentFolderId;
//             queue[childKey].projectId = selectedFolder ? (selectedFolder.name === childKey ? projectId : "") : "";
//           }
//         }
//       }
//       delete queue[currentItemKey];
//       console.warn(queue,"MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM")
//       // Prepare folder data to send to the backend
//       const folderData = {
//         folderName: currentItemKey,
//         parentFolderId: currentItem.parentFolderId, 
//         projectId: selectedFolder ? (selectedFolder.name === currentItemKey ? projectId : "") : "",
//         contractor_company: contractor_company
//       };
//       console.warn(folderData)
//       // Send folderData to the backend
//       const response = await axios.post('http://localhost:5000/api/folder/create-folder', folderData);
//       console.warn(response,"vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")
//      const updatedParentFolderId = response.data._id;
//       console.warn(selectedFolder,"BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
//       // Update parentFolderId of child folders in the queue

//       for (const childKey of Object.keys(queue)) {
//         console.warn(queue[childKey],queue[childKey].parentFolderName , currentItemKey,"ooooooooooooooooooooooooooooooooooooooooooooffffffffffffffffffffffffffff")
//         if (queue[childKey].parentFolderName === currentItemKey) {
//           queue[childKey].parentFolderId = updatedParentFolderId;
//           queue[childKey].projectId = selectedFolder ? (selectedFolder.name === childKey ? projectId : "") : "";
//         }
//       }
      
//       // Process child files
//       if (currentItem.kind === 'file') {
//         console.warn('Processing fileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee:', currentItemKey);
//         try {
//           // Perform file upload
//           await handleFileUpload(currentItemKey,currentItem.parentFolderId);
//         } catch (fileError) {
//           console.error('Error processing file:', fileError);
//         }
//       }
//     }

//     // Reset state and notify user
//     setFolderContents([]);
//     setSelectedFolder(null);
//     alert('Folder contents uploaded successfully!');
//   } catch (error) {
//     console.error('Error uploading folder contents:', error);
//     alert('Error uploading folder contents');
//   } finally {
//     setUploading(false);
//   }
// };

// // useEffect(() => {
// //   // Initialize queue when folderContents changes
// //   const updateQueue = async () => {
// //     const updatedQueue = {};
// //     for (const folder of folderContents) {
// //       if (folder.kind === 'directory') {
// //         updatedQueue[folder.name] = {
// //           parentFolderName: folder.parentFolderName || "",
// //           objectId: null,
// //           parentFolderId: null,
// //           kind: folder.kind
// //         };
// //       }
// //     }
// //     setQueue(updatedQueue);
// //   };

// //   updateQueue();
// // }, [folderContents]);



//   const handleFileUpload = async (file,folderId) => {
//     // Use the getUploadedImageLink function to get the AWS link for the uploaded file
//     const awsLink = await getUploadedImageLink(file);

//     // Prepare file metadata
//     const fileData = {
//       filename: file.name,
//       type: file.type,
//       size: file.size,
//       imageLink: awsLink,
//       folder: folderId,
//     };
//     console.warn(fileData,"33333333333333333333333333333333333333333333333333333333333333333333333333333333")

//     // Save file metadata to the backend
//     await axios.post(`http://localhost:5000/api/file/${folderId}`, fileData);

//     // Show image preview
//     const reader = new FileReader();
//     reader.onload = () => {
//       if (reader.result) {
//         setImagePreviews((prevPreviews) => [...prevPreviews, reader.result]);

//       }
//     };
//     reader.readAsDataURL(file);

//     return awsLink;
//   };
//   ;
  

//   return (
//     <div>
//       <div
//         onClick={handleFolderSelect}
//         style={{ width: '100%', height: '200px', border: '2px dashed #ccc', cursor: 'pointer' }}
//       >
//         <p>Click here to select a folder</p>
//       </div>
//       {selectedFolder && (
//         <div>
//           Selected folder: {selectedFolder.name}
//           {folderContents.length > 0 && (
//             <div>
//               <p>Folder contents:</p>
//               <ul>
//                 {folderContents.map((item, index) => (
//                   <li key={index}>{item.name}</li>
//                 ))}
//               </ul>
//               <button onClick={handleUpload} disabled={uploading}>
//                 {uploading ? 'Uploading...' : 'Upload Folder'}
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };
// export default UploadDirectory;


import React, { useRef, useState,useEffect } from 'react';
import axios from 'axios';
import { getUploadedImageLink } from './utils/utils';
import ProgressBar, { FileUploadProgressBar } from './common/progressBar';
import { CommonAddButton, CommonButtonSolidBlue } from './common/buttons';
import { FaFolder, FaLink, FaLock, FaShareAlt, FaUpload } from 'react-icons/fa';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const UploadDirectory  = ({ projectId, contractor_company,onClick}) => {
  
  const [selectedFolder, setSelectedFolder] = useState(null);
  // const [parentFolderId, setparentFolderId] = useState(null);

  const [folderContents, setFolderContents] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [queue, setQueue] = useState({}); // Use useState to store the queue
  const [shareableLink, setShareableLink] = useState('');
  const [processingProgress, setProcessingProgress] = useState(0); // Progress state for processing files
  const [uploadProgress, setUploadProgress] = useState(0); // Progress state for uploading files
  const [count, setCount] = useState(0); // Progress state for uploading files
  const [totalFiles,setTotalFiles]=useState(0);
  const [uploadCount, setUploadCount] = useState(0); // Progress state for uploading files
  const [password, setPassword] = useState('');
  const [parentFolderId, setParentFolderId] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  

 

  useEffect(() => {
    console.warn("Queue has been updated:", queue);
  }, [queue]); // Execute when queue is updated



  
// Function to get folder contents
const getFolderContents = async (folderHandle, parentFolderName = null) => {
  const files = [];

  for await (const [name, handle] of folderHandle.entries()) {
    setCount((prevCount) => prevCount + 1); // Increment count for each item
  
    if (handle.kind === "file") {
      const file = await handle.getFile();
      files.push(file);
      const awsLink = await getUploadedImageLink(file);
      setQueue((prevQueue) => ({
        ...prevQueue,
        [handle.name]: {
          parentFolderName: parentFolderName || "",
          objectId: awsLink,
          filename: file.name,
          type: file.type,
          size: file.size,
          parentFolderId: null,
          kind: "file",
        },
      }));
    } else if (handle.kind === "directory") {
      files.push(handle);
      setQueue((prevQueue) => ({
        ...prevQueue,
        [handle.name]: {
          parentFolderName: parentFolderName || "",
          objectId: null,
          parentFolderId: null,
          kind: "directory",
        },
      }));
      const nestedFolderContents = await getFolderContents(handle, handle.name);
      files.push(...nestedFolderContents);
    }
  }
  return files;
};

const handleFolderSelect = async () => {
  try {
    const folderHandle = await window.showDirectoryPicker();
    setProcessingProgress(1);
    setQueue((prevQueue) => ({
      ...prevQueue,
      [folderHandle.name]: {
        parentFolderName: "",
        objectId: null,
        parentFolderId: null,
      },
    }));
    setCount(1); // Start the count
    const folderContents = await getFolderContents(folderHandle, folderHandle.name);
    folderContents.unshift(folderHandle);
    setSelectedFolder(folderHandle);
  
    setFolderContents(folderContents);
    
    setCount(0);
  } catch (error) {
    console.error("Error selecting folder:", error);
  }
};




// const handleFolderSelect = async () => {
//   try {
//     const folderHandle = await window.showDirectoryPicker();
    
//     // Initialize processing progress to a small value
//     setProcessingProgress(1);

//     // Update queue state for the selected folder
//     setQueue((prevQueue) => ({
//       ...prevQueue,
//       [folderHandle.name]: {
//         parentFolderName: "",
//         objectId: null,
//         parentFolderId: null,
//       },
//     }));

//     // Set the count to 1 since we have selected a folder
//     setCount(1);

//     // Get folder contents recursively
//     const folderContents = await getFolderContents(folderHandle, folderHandle.name);

//     // Include the parent folder itself in the folder contents
//     folderContents.unshift(folderHandle);

//     // Update states
//     setSelectedFolder(folderHandle);
//     setFolderContents(folderContents);

//     // Set processing progress to 100% when folder processing is complete
//     setProcessingProgress(100);
//   } catch (error) {
//     console.error("Error selecting folder:", error);
//   }
// };

useEffect(() => {
  let interval = null;
  if (uploading) {
    interval = setInterval(() => {
      setUploadCount(prevCount => {
        if (prevCount < totalFiles - 1) {
          return prevCount + 1;
        } else {
          clearInterval(interval);
          return prevCount + 1; // Ensures the last file index is included
        }
      });
    }, 1000); // Adjust the interval time to simulate upload speed
  }
  return () => {
    if (interval) {
      clearInterval(interval);
    }
  };
}, [uploading, totalFiles]);


const handleUpload = async () => {
  setUploading(true);
  try {
    if (!folderContents || folderContents.length === 0) {
      throw new Error('No folder contents to upload');
    }
    setUploadCount(0);
    let parentFolderId='';
    let filesUploaded = 0;
    console.warn(totalFiles,"9999..........................................................................................")
    setTotalFiles(Object.keys(queue).length)
    // Iterate through the queue and process each item
    while (Object.keys(queue).length > 0) {
      
      const currentItemKey = Object.keys(queue)[0];
      const currentItem = queue[currentItemKey];
      
  
      filesUploaded++;
      if (selectedFolder.name===currentItemKey){
        
      let folderData = {
        folderName: currentItemKey,
        parentFolderId: currentItem.parentFolderId, 
        projectId: selectedFolder ? (selectedFolder.name === currentItemKey ? projectId : "") : "",
        contractor_company: contractor_company
      };
      const response = await axios.post('http://localhost:5000/api/folder/create-folder', folderData);
      let updatedParentFolderId = response.data._id;
      setParentFolderId(updatedParentFolderId)
      parentFolderId=updatedParentFolderId
      console.warn("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",updatedParentFolderId,parentFolderId)
        for (const childKey of Object.keys(queue)) {
          if (queue[childKey].parentFolderName === currentItemKey) {
            queue[childKey].parentFolderId = updatedParentFolderId;
            queue[childKey].projectId = selectedFolder ? (selectedFolder.name === childKey ? projectId : "") : "";
          }
        }
      }
      delete queue[currentItemKey];
      // Prepare folder data to send to the backend
      const folderData = {
        folderName: currentItemKey,
        parentFolderId: currentItem.parentFolderId, 
        projectId: selectedFolder ? (selectedFolder.name === currentItemKey ? projectId : "") : "",
        contractor_company: contractor_company
      };
      console.warn(folderData)
      // Send folderData to the backend
      if(currentItem.kind === 'directory') {
      const response = await axios.post('http://localhost:5000/api/folder/create-folder', folderData);
      const updatedParentFolderId = response.data._id;
      // Update parentFolderId of child folders in the queue

      for (const childKey of Object.keys(queue)) {
        if (queue[childKey].parentFolderName === currentItemKey) {
          queue[childKey].parentFolderId = updatedParentFolderId;
          queue[childKey].projectId = selectedFolder ? (selectedFolder.name === childKey ? projectId : "") : "";
        }
      }
      }
      
      // Process child files
     else if(currentItem.kind==='file') {
        try {
          // Perform file upload
          await handleFileUpload(currentItemKey,currentItem.parentFolderId,currentItem.objectId,currentItem.filename,currentItem.size,currentItem.type);
        } catch (fileError) {
          console.error('Error processing file:', fileError);
        }
      }
      setUploadCount(filesUploaded);
    }

    const uploadData = {
      projectId: selectedFolder ? projectId : "",
      folderId: selectedFolder ? selectedFolder.id : "",
    
    };

    // Send data to the backend to generate the password-protected link
    const response = await axios.post('http://localhost:5000/api/folder/linkGen', uploadData);
    const uniqueIdentifier = response.data.uniqueIdentifier;
    console.warn(uniqueIdentifier,selectedFolder.id,"55555555555555555555555555555555555555555555555555555555nnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
    // Construct the shareable link using the unique identifier and folder ID
    // const link = `http://localhost:3000/components/password-protected?uniqueIdentifier=${uniqueIdentifier} folderId=${parentFolderId} projectId=${projectId}/LinkGen`;
    const link = `http://localhost:3000/components/uniqueIdentifier=${uniqueIdentifier} folderId=${parentFolderId} projectId=${projectId}/LinkGen`;
    
    // Set the shareable link in state or use it as needed
    setShareableLink(link);
    setFolderContents([]);
    setSelectedFolder(null);
    alert('Folder contents uploaded successfully!');
  } catch (error) {
    console.error('Error uploading folder contents:', error);
    alert('Error uploading folder contents');
  } finally {
    setUploading(false);
  
  }
};

const handleFileUpload = async (file,folderId,awsLink,filename,size,type) => {
    // Use the getUploadedImageLink function to get the AWS link for the uploaded file

    // Prepare file metadata
    const fileData = {
      filename: filename,
      type: type,
      size: size,
      imageLink: awsLink,
      folder: folderId,
    };

    // Save file metadata to the backend
    await axios.post(`http://localhost:5000/api/file/${folderId}`, fileData);


    return awsLink;
  };
  
  const handlePasswordSubmit = async () => {
    try {
        console.warn('Submitting password for folder:', parentFolderId);
        console.warn('Password:', password);

        if (!parentFolderId) {
            throw new Error('Parent folder ID is not set.');
        }

        if (!password) {
            throw new Error('Password is not set.');
        }

        const response = await axios.put(`http://localhost:5000/api/folder/folder/${parentFolderId}/set-password`, { password });

        console.log('Password set successfully:', response.data);
        alert('Password set successfully for the parent folder!');
    } catch (error) {
        console.error('Error setting password:', error);
        alert('Error setting password');
    }
};

 

  // Simulate file upload progress for demonstration purposes


  return (
    <div className="no-scrollbar flex flex-col p-4 w-[25vw] h-full bg-white shadow-lg fixed top-0 left-0 z-30 transition-transform duration-800 ease-in-out">
      <div className='flex justify-end'>
          <button
              className="bg-red-500 text-white p-1 rounded-sm z-40"
              onClick={onClick}
            >
              ×
            </button>
      </div>
      {count > 0 && !uploading && <ProgressBar />}


      <div>
        {uploading && (
          <div>
            <FileUploadProgressBar currentFileIndex={uploadCount} totalFiles={totalFiles} />
            <h1>{totalFiles}</h1>
          </div>
        )}
      </div>
        <div className='flex flex-col items-center'>
          {!selectedFolder &&
      <div
        onClick={handleFolderSelect}
        className="flex items-center justify-center gap-x-2 p-4 border-2 border-dashed border-gray-300 cursor-pointer rounded-md "
      >
        <FaFolder size={24} className='text-[color:var(--primaryColor)]' />
        <p className="text-lg font-semibold text-[color:var(--mainTitleLightColor)]">Upload Folder</p>
      </div>
}

      </div>

      {selectedFolder && (
        <div className="mt-20 flex flex-col items-center justify-center">
      <h1 className='text-bol text-green-500'>Folder Processing Done!</h1>
          <div className="font-semibold mt-4 ">Selected folder: {selectedFolder.name}</div>
          {/* {folderContents.length > 0 && (
            <div className="mt-2">
              <p className="font-semibold h-full">Folder contents:</p>
              <ul className="">
                {folderContents.map((item, index) => (
                  <li key={index} className="text-sm">{item.name}</li>
                ))}
              </ul>
            </div>
          )} */}
                <CommonAddButton
        icon={faUpload}
        color="color:var(--mainTitleColor)" // Add your desired color here
        title="Upload"
        width={20}
        height={20}
        className='shadow-md cursor-pointer hover:scale-105 duration-300'
        onClick={handleUpload}
      />
        </div>
      )}



      {shareableLink && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <p className="font-semibold">Shareable Link:</p>
          <div className="flex items-center gap-x-2 mt-2">
            <FaLink size={20} />
            <a href={shareableLink} className="text-blue-600 underline">{shareableLink}</a>
          </div>
          <div className="mt-4">
            <p className="font-semibold">Set a Password:</p>
            <div className="flex items-center gap-x-2 mt-2">
              <FaLock size={20} />
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="border rounded-md p-2"
                placeholder="Enter password"
              />
              <button onClick={handlePasswordSubmit} className="btn btn-primary">Set</button>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-semibold">Share:</p>
            <div className="flex items-center gap-x-2 mt-2">
              <FaShareAlt size={20} />
              <button className="btn btn-secondary">Share Link</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

};
export default UploadDirectory;

