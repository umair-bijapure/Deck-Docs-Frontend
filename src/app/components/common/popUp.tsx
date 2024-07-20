import React, { useState } from "react";

interface CommonPopupProps {
  showModal: boolean;
  onClose: () => void;
 
  heading: string;
  content: string;
  children?: React.ReactNode;
}

const CommonPopup: React.FC<CommonPopupProps> = ({
  showModal,
  onClose,
  heading,
  content,
  children,
 
}) => {

  return (
    <div className="p-10 flex items-center justify-center z-50">
      {showModal && (
        <>
          <div className="hidden sm:flex no-scrollbar">
            <div className="justify-center no-scrollbar items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative no-scrollbar w-auto my-2 mx-auto max-w-3xl no-scrollbar">
                {/*content*/}
                <div className=" rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className=" pl-2 pr-2 flex items-center opacity-50 justify-between border-b border-solid border-slate-200  rounded-t-2xl">
                    <h3 className="text-xl font-semibold p-2 text-[color:var(--mainTitleColor)] opcacity-50">{heading}</h3>
                    <button
                        className="p-1 ml-auto float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={onClose}
                    >
                        <span className=" text-[color:var(--mainTitleColor)]  h-6 w-6 text-2xl block outline-none focus:outline-none mb-1 mr-1">X</span>
                    </button>
                    </div>
                    {/*body*/}
                    <div className="relative pl-2 pr-2 flex-auto">
                    <p className=" text-slate-500 text-lg no-scrollbar">
                        {content}
                    </p>
                    {children}
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-1 rounded-b">

                    </div>
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
          {/* big comment  */}
          <div className="opacity-25 fixed inset-0  bg-black" onClick={onClose}></div>
          <div className="sm:hidden ">       

          <div className="relative">
            
      {showModal && (
        <div className="fixed bottom-0 left-0 w-full bg-opacity-80 shadow-md transition-all duration-300 z-2 ">
                    <div className=" pl-2 pr-2 ml-2 mr-2 flex items-center justify-center bg-white rounded-t-2xl">
                    <h3 className="text-lg sm:text-xl font-semibold p-2 text-[color:var(--mainTitleLightColor)]">{heading}</h3>
            </div>
          <div className="h-full overflow-y-auto p-2">       
                {/*content*/}
                <div className="  rounded-lg shadow-lg relative bg-white outline-none focus:outline-none">
                    {/*header*/}
 
                    {/*body*/}
                    <div className="relative mr-2 ml-2 ">
                    <p className=" text-slate-500 text-lg ">
                        {content}
                    </p>
                    {children}
                    </div>
                    {/*footer*/}

                
            </div>
            </div>

        </div>
      )}
    </div>
            
          </div>
        </>
      )}
    </div>
  );
};

export default CommonPopup;
