import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Folder {
  _id: string;
  name: string;
}

interface FileData {
  folderId: string;
  files: File[];
  childFolders: Folder[];
}

 const NavigationBar: React.FC<{
  folderContents: FileData;
  setFolderContents: React.Dispatch<React.SetStateAction<FileData>>;
  folderId: string;
  setFolderId: React.Dispatch<React.SetStateAction<string>>;
}> = ({ folderContents, setFolderContents, folderId, setFolderId }) => {
  const navigateToFolder = async (folderId: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/file/folders/${folderId}/files`);
      setFolderContents(response.data);
      setFolderId(folderId);
    } catch (error) {
      console.error('Error navigating to folder:', error);
    }
  };

  return (
    <div>
      {folderContents.childFolders.map((folder, index) => (
        <span key={index}>
          {index > 0 && ' >> '}
          <button onClick={() => navigateToFolder(folder._id)}>{folder.name}</button>
        </span>
      ))}
    </div>
  );
};

export default NavigationBar


