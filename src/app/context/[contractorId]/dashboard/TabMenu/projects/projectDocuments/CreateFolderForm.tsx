
import { CommonButton } from '@/app/components/common/buttons';
import { CommonFormTextInput } from '@/app/components/common/inputs';
import CommonPopup from '@/app/components/common/popUp';
import React, { useState, useEffect, useRef } from 'react';
import { FaFolder, FaPlus } from 'react-icons/fa';

interface CreateFolderFormProps {
  refreshData: () => Promise<void>;
  onCreateFolder: (folderName: string) => Promise<void>;
  parentFolderId: string | null;
}

const CreateFolderForm: React.FC<CreateFolderFormProps> = ({ refreshData, onCreateFolder }) => {
  const [folderName, setFolderName] = useState('');
  const [isInputVisible, setInputVisible] = useState(false);
  const floatingMenuRef = useRef<HTMLDivElement | null>(null); // Explicitly type the ref
  const [isPopupVisible, setPopupVisible] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (floatingMenuRef.current && !floatingMenuRef.current.contains(event.target as Node)) {
        setInputVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCreateFolder = async () => {
    if (folderName.trim() === '') {
      return; // Prevent creating a folder with an empty name
    }

    try {
      await onCreateFolder(folderName); // Call the onCreateFolder prop
      refreshData();
      setFolderName(''); // Clear the input field
      setInputVisible(false); // Close the input field and button
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  const toggleInput = () => {
    setInputVisible(!isInputVisible);
  };

  return (
    <div className='flex justify-center items-center'ref={floatingMenuRef}>
      <div>
        <div onClick={() => setPopupVisible(true)}>
         
          <div className='flex items-center justify-center'>
      <div className='flex flex-col'>
    {/* <div className='flex items-center justify-center text-sm text-[color:var(--mainTitleLightColor)]'>No folders to display.</div> */}
      <div>              
        <li  className='flex items-center justify-center p-2 w-26 md:w-36 h-26 hover:-translate-y-1 hover:scale-110  duration-300 cursor-pointer text-3xl text-extrabold bg-white text-[color:var(--primaryColor)] rounded-2xl transition-all duration-[250ms] ease-out group-hover:w-full' >
              <span className='flex items-center justify-center gap-x-2'>
              +  <FaFolder/>
              </span>
        </li>
      </div>
      </div>
    </div>
        </div>

        <div className="flex fixed top-[450px] items-center justify-center z-20 p-2 w-full">
          <CommonPopup
              showModal={isPopupVisible}
              onClose={() => setPopupVisible(false)}
              heading={"Folder Name"}
              content='' >
            <div className='flex-cols sm:w-auto  h-auto sm:h-auto p-10 overflow-scroll no-scrollbar'> 
              <div className='p-6'>
                <CommonFormTextInput
                      // type="text"
                          placeholder="Enter folder name"
                          value={folderName}
                          onChange={(e) => setFolderName(e.target.value)} id={''}          />
              </div>         
              <div className='p-6'>
                <CommonButton onClick={handleCreateFolder} text='Create Folder' className='bg-[color:var(--primaryColor)]' />
              </div> 
            
            </div>    
          </CommonPopup>
          </div>



      </div>
    <div className="sm:hidden floating-menu" ref={floatingMenuRef}>
      <button className="floating-menu-button" onClick={toggleInput}>
      
      <FaFolder/>
        <i className={`fas ${isInputVisible ? 'fa-times' :<div className='text-black'><FaPlus/></div> }`} />
      </button>
      {isInputVisible && (
        <div className="floating-menu-content">
          <CommonFormTextInput
                      // type="text"
                      placeholder="Enter folder name"
                      value={folderName}
                      onChange={(e) => setFolderName(e.target.value)} id={''}          />
          <CommonButton onClick={handleCreateFolder} text='Create Folder' className='bg-[color:var(--primaryColor)]' />
        </div>
      )}
    </div>
    </div>
  );
};

export default CreateFolderForm;

