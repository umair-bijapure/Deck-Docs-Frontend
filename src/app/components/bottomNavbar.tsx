import React, { useState } from 'react';

interface Tab {
  name: string;
  content: JSX.Element;
  background: string;
  icon: JSX.Element;
}

interface BottomMenuProps {
  tabs: Tab[];
}

const BottomMenu: React.FC<BottomMenuProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleItemClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="flex flex-col mt-10 z-30">
      <div className="flex-grow relative overflow-hidden z-30">
        <div className={`h-full ${tabs[activeTab].background}`}>
          {tabs[activeTab].content}
        </div>
      </div>
      <div className="p-2 bg-white border-[color:var(--lightBackgroundGreyColor)] border-t-2 shadow-t-lg fixed bottom-0 w-full z-30 rounded-lg">
        <div className="flex justify-evenly z-30">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={` focus:outline-none transition-all border-2 border-[color:var(--lightBackgroundGreyColor)]  shadow-xl z-30 rounded-lg ${
                activeTab === index ? 'bg-[color:var(--primaryColor)] text-xl' : ''
              }`}
              style={{
                transform: activeTab === index ? 'scale(1.2)' : 'scale(1)',
                marginBottom: activeTab === index ? '-0.25rem' : '0',
              }}
              onClick={() => handleItemClick(index)}
            >
            <div className='flex flex-row p-2 items-center justify-center broder-1  w-max z-60'>
              {tab.icon}
              {/* {activeTab === index && <div className="text-[8px] mt-[-4px] ">{tab.name}</div>} */}
            </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomMenu;
