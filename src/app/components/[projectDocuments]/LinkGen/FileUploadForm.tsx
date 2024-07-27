import React, { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import { CommonButtonFileUploader } from '@/app/components/common/fileUploader';
  
import { AiOutlineDelete } from 'react-icons/ai';
import { getUploadedImageLink } from '@/app/components/utils/utils';
import { FaFileImage, FaFilePdf, FaFileExcel, FaFileCsv, FaFileAlt ,FaFileWord, FaSquare, FaList} from 'react-icons/fa';

interface FileUploadFormProps {
  folderId: string;
  refreshData: () => void;
  text?:string;
  icon?:ReactNode;
}
interface File {
  filename: string;
  type: string;
  size: number;
  imageLink:string;
  
}
interface FolderContents {
  folderId: string;
  files: FileData[];
  childFolders: FolderContents[];
}

const fetchFolderContents = async (folderId: string, parentFolderId: string | null = null): Promise<FolderContents> => {
  try {
    const files = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/file/folders/${folderId}/files`);
    const childFolders = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/folder/${folderId}/child-folders`);
    
    // Ensure to handle responses from your API correctly and extract data as needed
    const folderData: FolderContents = {
      folderId,
      files: files.data,
      childFolders: childFolders.data,
    };

    return folderData;
  } catch (error) {
    console.error('Error fetching folder contents:', error);
    throw new Error('Error fetching folder contents');
  }
};

interface FileData {
  folderId: string;
  files: File[];
  childFolders: FileData[];
}

interface File {
  _id: string; // Example property
  filename: string;
  size: number;
  type: string;
  uploadDate: Date;
  // Add other properties as needed
}

interface TableRow {
    fileName: string[];
    fileData: FileData[];
    thumbnails: string[]; // An array of strings representing image URLs
  }

const FileUploadForm: React.FC<FileUploadFormProps> = ({ folderId, refreshData,icon,text }) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadDate,setuploadDate]=useState('')
    const [fileName,setfileName]=useState('')
    

   
    const [rows, setRows] = useState<TableRow[]>([
        // Initial rows with empty thumbnails array
        {fileName: [], fileData:[],thumbnails: [] },
      ]);
      const [imagePreviews, setImagePreviews] = useState<string[]>([]);
      const [uploadedImages, setUploadedImages] = useState<string[]>([]);
       // Provide the folder ID
       const [folderContents, setFolderContents] = useState<FileData>({ folderId: "", files: [], childFolders: [] });

  // Function to fetch all documents within a folder
  const fetchFolderContents = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/file/folders/${folderId}/files`);
      setFolderContents(response.data);
    } catch (error) {
      console.error('Error fetching folder contents:', error);
    }
  };

  useEffect(() => {
    // Call the function to fetch folder contents when the component mounts
    fetchFolderContents();
  }, [folderId]);
    
       const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
          try {
            const uploadPromises: Promise<string>[] = Array.from(files).map(async (file) => {
              // Use the getUploadedImageLink function to get the AWS link for the uploaded file
         
              const awsLink = await getUploadedImageLink(file);
        
              // Prepare file metadata
             
              const fileData = {
                filename: file.name,
                type: file.type,
                size: file.size,               
                imageLink: awsLink,
                folder: folderId,
              };
        
              // Save file metadata to the backend
              await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/file/${folderId}`, fileData);
        
              // Show image preview
              const reader = new FileReader();
              reader.onload = () => {
                if (reader.result) {
                  setImagePreviews((prevPreviews) => [...prevPreviews, reader.result as string]);
                }
              };
              reader.readAsDataURL(file);
        
              return awsLink;
            });
        
            const uploadedLinks = await Promise.all(uploadPromises);
            setUploadedImages((prevImages) => [...prevImages, ...uploadedLinks]);
            fetchFolderContents();
            // Optionally, update state or trigger data refresh as needed
          } catch (error) {
            console.error('Error uploading file:', error);
          }
        }
      };
    

  console.log(folderContents,"kkkkkkkkkkkkkkkkkkkkkkkkkkk")




  const [isGridDisplay, setIsGridDisplay] = useState(false);

  const GridView = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {folderContents.files.map((file, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-md flex flex-col items-center justify-center">
          {file.type.startsWith('image/') && <FaFileImage className="text-blue-500 text-[40px]" style={{ width: '60px' }} />}
          {file.type === 'application/pdf' && <FaFilePdf className="text-red-500 text-[40px]" style={{ width: '60px' }} />}
          {file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && <FaFileExcel className="text-green-500 text-[60px]" style={{ width: '60px' }} />}
          {file.type === 'application/csv' && <FaFileCsv className="text-yellow-500 text-[40px]" style={{ width: '60px' }} />}
          {file.type === 'text/csv' && <FaFileCsv className="text-yellow-500 text-[40px]" style={{ width: '60px' }} />}
          {file.type === 'text/plain' && <FaFileAlt className="text-gray-500 text-[40px]" style={{ width: '60px' }} />}
          {file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && <FaFileWord className="text-blue-500 text-[60px]" style={{ width: '60px' }} />}

          <div className="mt-2 text-center">
            <h2 className="font-bold overflow-hidden overflow-ellipsis whitespace-nowrap w-[120px]">{file.filename}</h2>
            {/* Additional file information */}
          </div>
        </div>
      ))}
      {folderContents.files.length === 0 && (
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
      )}
    </div>
  );
  const formatFileSize = (bytes:number) => {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    } else if (bytes >= 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    } else {
      return `${bytes} bytes`;
    }
  };

  const ListView = () => (
    <ul className="space-y-2">
    {folderContents.files.map((file, index) => (
      <li key={index} className="bg-gray-100 p-4 rounded-md flex items-center hover:-translate-y-1 hover:scale-100 duration-300 cursor-pointer">
        {/* File icons */}
        {file.type.startsWith('image/') && <FaFileImage className="mr-2 text-blue-500" />}
        {file.type === 'application/pdf' && <FaFilePdf className="mr-2 text-red-500" />}
        {file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && <FaFileExcel className="mr-2 text-green-500" />}
        {file.type === 'application/csv' && <FaFileCsv className="mr-2 text-yellow-500" />}
        {file.type === 'text/csv' && <FaFileCsv className="mr-2 text-yellow-500" />}
        {file.type === 'text/plain' && <FaFileAlt className="mr-2 text-gray-500" />}
        {file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && <FaFileWord className="mr-2 text-blue-500" />}

        {/* File details */}
        <div className='flex items-center justify-between gap-x-6'>
          <h2 className="font-bold">{file.filename}</h2>
          {/* Display file size */}
          <h2 className="text-gray-400">{formatFileSize(file.size)}</h2>
        </div>
      </li>
    ))}
    {/* Display message if no files */}
    {folderContents.files.length === 0 && (
      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>
    )}
  </ul>
  );

  return (
    <div className=" mx-auto p-2 flex flex-col justify-between w-full border-2 mt-2 rounded-md">
      <div className="flex justify-between">
          {/* <label htmlFor="fileUpload" className="flex justify-center block mb-2 text-lg font-bold">Upload Files</label> */}
          <input id="fileUpload" type="file" accept=".jpg,.jpeg,.png,.gif,.pdf,.xlsx,.csv,.odt,.docx,.text" multiple onChange={handleFileUpload} className="block w-full text-sm text-gray-500
            file:me-3 file:py-2 file:px-2
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-[color:var(--mainTitleColor)] file:text-white
            hover:file:text-[color:var(--mainTitleL ightCOlor)] 
            hover:file:bg-white
            hover:shadow-sm
            file:disabled:opacity-50 file:disabled:pointer-events-none
            dark:file:bg-white
            dark:hover:file:bg-while
            hover:file:cursor-pointer
          "/>
          <div className="flex justify-end mb-4 p-2">
            <button onClick={() => setIsGridDisplay(!isGridDisplay)} className="px-1 py-1 text-[color:var(--mainTitleColor)] rounded-md">
              {isGridDisplay ? <FaSquare/>: <FaList/>}
            </button>
          </div>
          {/* Add image previews here */}
        </div>
      <div className="flex flex-col md:flex-row items-start">

        <div className="w-full md:pl-4">

          {isGridDisplay ? <GridView /> : <ListView />}
        </div>
      </div>
    </div>
  );


};

export default FileUploadForm;


// import React, { ReactNode, useState } from 'react';
// import axios from 'axios';
// import { CommonButtonFileUploader } from '@/app/components/common/fileUploader';
// import { FaCertificate, FaFile, FaFilePdf, FaImage, FaTimes, FaTrash, FaUpload } from 'react-icons/fa';
// import { AiOutlineDelete } from 'react-icons/ai';
// import { getUploadedImageLink } from '@/app/components/utils/utils';


// interface FileUploadFormProps {
//   folderId: string;
//   refreshData: () => void;
//   text?:string;
//   icon?:ReactNode;
// }
// interface FileData {
//   name: string;
//   size: number;
//   type: string;
//   uploadDate: string;
//   link: string;
//   // thumbnailUrl: string; // Add thumbnailUrl property
// }


// interface TableRow {
//     fileName: string[];
//     fileData: FileData[];
//     thumbnails: string[]; // An array of strings representing image URLs
    
//   }

// const FileUploadForm: React.FC<FileUploadFormProps> = ({ folderId, refreshData,icon,text }) => {
//     const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//     const [uploadDate,setuploadDate]=useState('')
//     const [fileName,setfileName]=useState('')
   
//     const [rows, setRows] = useState<TableRow[]>([
//         // Initial rows with empty thumbnails array
//         {fileName: [], fileData:[],thumbnails: [] },
//       ]);
//       const handleFileUpload = async (files: FileList | null) => {
//         if (files) {
//           const selectedFiles: File[] = Array.from(files);
//           try {
//             const promises = selectedFiles.map(async file => {
//               const link = await getUploadedImageLink(file);
//               const fileData: FileData = {
//                 name: file.name,
//                 size: file.size,
//                 type: file.type,
//                 uploadDate: new Date().toISOString(),
//                 link: link,
//               };
//               return { fileName: [file.name], fileData: [fileData], thumbnails: [link] };
//             });
      
//             const newRowsData: TableRow[] = await Promise.all(promises);
//             setRows(prevRows => [...prevRows, ...newRowsData]);
//           } catch (error) {
//             console.error('Error uploading files:', error);
//           }
//         }
//       };
      
      
      
      
      
      
//       // const handleFileInputChange = (index: number, files: FileList | null) => {
//       //   if (files && files.length > 0) {
//       //     const selectedFiles: File[] = Array.from(files);
//       //     const readerPromises: Promise<FileData>[] = selectedFiles.map(file => {
//       //       return new Promise<FileData>((resolve) => {
//       //         const reader = new FileReader();
//       //         reader.onload = (event: ProgressEvent<FileReader>) => {
//       //           if (event.target) {
//       //             const thumbnailUrl = event.target.result as string;
//       //             const uploadDate = new Date().toISOString();
//       //             const name = file.name;
//       //             const size = file.size;
//       //             const type = file.type;
//       //             const link = ''; // Add a placeholder link for now
//       //             const fileData: FileData = { thumbnailUrl, uploadDate, name, size, type, link };
//       //             resolve(fileData); // Resolve with complete FileData object
//       //           } else {
//       //             // Handle error case
//       //             resolve({
//       //               thumbnailUrl: '',
//       //               uploadDate: '',
//       //               name: '',
//       //               size: 0,
//       //               type: '',
//       //               link: '', // Include the link property
//       //             });
//       //           }
//       //         };
//       //         reader.readAsDataURL(file);
//       //       });
//       //     });
      
//       //     Promise.all(readerPromises).then(thumbnailData => {
//       //       const updatedRows = rows.map((row, i) => {
//       //         if (i === index) {
//       //           const updatedThumbnails = [...row.thumbnails, ...thumbnailData.map(data => data.thumbnailUrl)].filter(url => url !== '');
//       //           return { ...row, thumbnails: updatedThumbnails, fileData: thumbnailData };
//       //         }
//       //         return row;
//       //       });
//       //       setRows(updatedRows);
//       //     });
//       //   }
//       // };
      
//       const handleRemoveThumbnail = (rowIndex: number, thumbnailIndex: number) => {
//         const updatedRows = [...rows];
//         updatedRows[rowIndex].thumbnails.splice(thumbnailIndex, 1); // Remove the thumbnail at the specified index
//         setRows(updatedRows);
//       };
      
//   return (
//     <div className="">
//                     <div className='flex items-center justify-center'>
//   <CommonButtonFileUploader
//     className="flex justify-center items-center m-2 p-4 bg-white text-xl rounded-xl border-black whitespace-nowrap text-green-500 hover:-translate-y-1 hover:scale-110  duration-300 cursor-pointer "
//     icon={icon ? icon : <FaFile />}
//     label=''
//     onFileSelected={(files) => handleFileUpload(files)} // Add type check for files
//     accept=".jpg,.jpeg,.png,.gif,.pdf,.xlsx,.csv,.odt,.docx"
//     multiple
//   />
// </div>
//       <div className="flex w-full">
//         <div className="p-1 w-full">
//          {rows.map((row, rowIndex) => (
//             <div>
              



       
//             <div className="flex-col overflow-scroll mb-10">
//               {row.thumbnails.map((thumbnailUrl, thumbnailIndex) => (
//                 <div key={thumbnailIndex} className=" h-18 p-2 overflow-hidden">
//                 <ul className=''>
//                     <li className='flex items-center justify-between bg-slate-100  text-[color:var(--mainTitleColor)] text-sm sm:text-md shadow-sm '>
                        

//                       <div className=''>
                        
//                           <div className="file-info">
//                           {row.fileData.map((file, fileIndex) => (
//                               <div key={fileIndex} className='flex-col '>
//                                   <div className='flex items-center justify-between'>
//                                   <div className='ml-[-12px]'>
//                                           <img
//                                               src={thumbnailUrl}
//                                               alt={`Thumbnail ${thumbnailIndex + 1}`}
//                                               className="w-14 h-14 object-contain border-2 border-white hover:-translate-y-1 hover:scale-110  duration-300 cursor-pointer"
//                                           />
//                                   </div>
//                                   <div className='ml-2'>
//                                       <div>
//                                           <p>{file.name.slice(0, -4)}</p>
//                                       </div>
//                                       <div className='flex text-[12px] text-gray-400 gap-x-2'>
//                                           {/* <p>{file.size} bytes</p> */}
//                                           <p>{file.type}</p>
//                                           <p>{file.uploadDate.slice(0,10)}</p>

//                                       </div>
//                                   </div>

//                                   </div>

//                               </div>
//                           ))}
//                           </div>
//                       </div>
//                       <div>

//                       <div className="bg-red-100 rounded-xl flex justify-center items-center gap-x-2 p-2 text-red-500 font-bold m-4 hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer"  onClick={() => handleRemoveThumbnail(rowIndex, thumbnailIndex)}>
//                       <h1 className="text-lg">
//                         <AiOutlineDelete />
//                       </h1>
//                       <h1 className="text-sm">Delete</h1>
//                   </div>
//                       </div>
                 
//                   </li>
//                   </ul>
//                 </div>
//               ))}

//             </div>
//           </div>
//           ))}
//         </div>
//       </div>
//       </div>
    
//   );
// };

// export default FileUploadForm;

