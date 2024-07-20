// import { faDownload, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
// import pdfjs from "pdfjs-dist";
// import Tesseract from "tesseract.js";
import { FaTrash, FaTrashAlt } from "react-icons/fa";
import { CollapsibleItem } from "./collapsible";
import { Fahkwang } from "next/font/google";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// Replace this with your actual delete function
// import { deleteFileFromEvidence } from "../utils/fetches";

interface FileUploaderProps {
  id: string;
  accept: string;
  files?: { file: File; filename: string; url?: string; id?: number }[];
  onFileUpload?: (files: { file: File; filename: string }[]) => void;
  disabled?: boolean;
  enableDownload?: boolean;
  currentOrganisation?: string;
  currentEvidence?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  id,
  accept,
  files = [],
  onFileUpload,
  disabled = false,
  enableDownload = true,
  currentOrganisation,
  currentEvidence,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState(files);
  const [extractedText, setExtractedText] = useState('');
  useEffect(() => {
    if (uploadedFiles !== files && onFileUpload) {
      onFileUpload(uploadedFiles);
    }
  }, [uploadedFiles, files, onFileUpload]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const newFile = {
        file: selectedFile,
        filename: selectedFile.name,
      };
      setUploadedFiles([...uploadedFiles, newFile]);
    }
  };
  const handleExtractText = async (file: { file: File; filename: string; url?: string; id?: number })  => {
    try {
        const response = await fetch('http://localhost:5000/api/extract-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileType: file.filename.endsWith('.pdf') ? 'pdf' : 'image', filePath: file.url }),
        });

        if (!response.ok) {
            throw new Error('Text extraction failed');
        }

        const data = await response.json();
        setExtractedText(data.text);
    } catch (error) {
        console.error('Error extracting text:', error);
    }
};


  const handleDeleteFile = (index: number, fileId?: number) => {
    const newFiles = [...uploadedFiles];
    if (fileId) {
      // deleteFileFromEvidence(currentOrganisation, currentEvidence, fileId);
    }
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  return (
    <div>
      <input
        type="file"
        id={id}
        accept={accept}
        className="hidden"
        onChange={handleFileUpload}
      />
      <div className="sm:space-y-4">
        <div className="border-b w-full py-2 border-gray-200 text-lg font-semibold select-none">
          <div>Upload Files</div>
        </div>
        <div className="flex space-x-4 items-center">
          {!disabled && (
            <div className="flex space-x-4 items-center">
              <button
                type="button"
                className="sm:flex sm:font-semibold justify-center py-2 px-2 sm:px-6 border border-transparent  text-[14px] sm:text-sm rounded text-white bg-blue-500 hover:bg-blue-700 shadow h-10"
                onClick={() => document.getElementById(id)?.click()}
              >
                File
              </button>
              <div className="hidden sm:flex font-normal text-sm text-gray-400 select-none">
                Valid formats include pdf, doc, docx, xls, xlsx, ppt, pptx.
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="hidden sm:flex w-full flex items-center flex-row border-b border-gray-200 select-none text-sm items-stretch font-semibold text-gray-700 py-2">
            Attached Files
          </div>
          <div className="w-full flex flex-col select-none text-sm">
            {uploadedFiles.length > 0 ? (
              uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="w-full flex items-center flex-row border-b border-gray-200 select-none text-sm items-stretch"
              >
              <div className="flex flex-auto py-3 px-4">
                <div>{file.filename.split("\\")[file.filename.split("\\").length - 1]}</div>
              </div>
                {enableDownload && file.url ? (
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-center items-center py-3 px-4 text-gray-600 text-sm hover:border-blue-200 hover:bg-blue-500 hover:text-white"
                  >
                    <FontAwesomeIcon icon={faTrash} fixedWidth />
                  </a>
           ) : null}
          {!disabled ? (
              <div
                className="flex justify-center items-center py-3 px-4 text-gray-600 text-sm hover:border-red-200 hover:bg-red-500 hover:text-white cursor-pointer"
                aria-hidden
                onClick={() => {
                  handleExtractText(file);
                  const newFiles = [...uploadedFiles];
                  const deletedFile = newFiles.splice(index, 1)[0];

                  if (deletedFile.id) {
                    // deleteFileFromEvidence(currentOrganisation, currentEvidence, deletedFile.id);
                  }

                  setUploadedFiles(newFiles);
                }}
              >
                  <FontAwesomeIcon icon={faTrash} fixedWidth />
                </div>
                ) : null}
              </div>
            ))
          ) : (
          <div className="hidden sm:flex w-full py-3 px-4 space-x-4 flex flex-row font-normal border-b border-gray-200 select-none text-sm">
            No Content to Display
          </div>
        )}  
        {extractedText && (
                <div className="w-full py-2 px-4 space-x-4 flex flex-row font-normal text-sm">
                  <div className="w-full border-t border-gray-200" />
                  <div className="w-full pt-2 text-gray-700">{extractedText}</div>
                </div>
              )}
    
          </div>
        </div>
      </div>
    </div>
  );
};

 










interface UploadedFile {
  file: File;
  filename: string;
}

interface FileUploaderProps {
  onFileUpload?: (files: UploadedFile[]) => void;
 
}

export const GeneralFileUpload: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const newFile: UploadedFile = { file: selectedFile, filename: selectedFile.name };
      setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, newFile]);
      event.target.value = ''; // Clear the input
      if (onFileUpload) {
        onFileUpload([...uploadedFiles, newFile]);
      }
    }
  };

  const handleDeleteFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
  };

  return (
    <div>
      
    <form>
      <label className="block">
        <span className="sr-only">Choose profile photo</span>
        <input type="file" accept="*" onChange={handleFileUpload} className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-[color:var(--primaryColor)] file:text-white
          hover:file:bg-blue-600
          p-2
        "/>
      </label>
    </form>
      <div className="p-2">
        {uploadedFiles.map((file, index) => (
          <div key={index} className="">
            <CollapsibleItem headerText={file.filename} 
              iconClass={ <div className="p-2 m-1">
                          <a href={URL.createObjectURL(file.file)} download>
                            <FontAwesomeIcon icon={faTrash} />
                          </a>
                          </div>} 
                          isActive={false}
                          leftIcon={<FaTrash/>}
                          >

            </CollapsibleItem>
          </div>
        ))}
      </div>
    </div>
  );
};





interface CommonButtonProps {
  className?: string;
  icon: React.ReactNode;
  label: string;
  onFileSelected: (files: FileList | null) => void; // Updated parameter type
  accept?: string;
  multiple?: boolean;
}

export const CommonButtonFileUploader: React.FC<CommonButtonProps> = ({ className, icon, label, onFileSelected, accept, multiple }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    onFileSelected(selectedFiles);
  };

  return (
    <div className={`flex  w-26 md:w-36 h-26items-center relative ${className} `}>
      <button
        className="flex items-center rounded-lg items-center cursor-pointer"
        onClick={handleButtonClick}
      >
        <span className="">{icon}</span>
        {label}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept || "image/*"}
        className="absolute inset-0 opacity-0 cursor-pointer "
        onChange={handleFileChange}
        multiple={multiple}
      />
    </div>
  );
};








// import Tesseract from "tesseract.js";

// export const ImageTextExtractor: React.FC = () => {
//   const [extractedText, setExtractedText] = useState<string | null>(null);

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];

//     if (file) {
//       const { data } = await Tesseract.recognize(file, "eng");
//       setExtractedText(data.text);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//       {extractedText && <div>Extracted Text: {extractedText}</div>}
//     </div>
//   );
// };












export const FileUploadertest = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('fileType', selectedFile.type);
      formData.append('file', selectedFile);

      const res = await fetch('http://127.0.0.1:5000/api/fileUploader/fileUploader' , {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setExtractedText(data.text);
      }
    } catch (error) {
      console.error('Error with sending the POST request:', error);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf, .jpeg, .jpg, .png" onChange={handleFileChange} />
        <button type="submit">Upload and Extract Text</button>
      </form>
      {selectedFile && (
        <div>
          <p>Selected File: {selectedFile.name}</p>
          <p>Extracted Text: {extractedText}</p>
        </div>
      )}
    </div>
  );
};










































