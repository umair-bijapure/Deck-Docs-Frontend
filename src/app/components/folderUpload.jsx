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

