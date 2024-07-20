'use client';
import React, { ReactNode, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface CollapsibleComponentProps {
  expanded: boolean;
  children: ReactNode;
  leftIcon?:ReactNode|string;
  className?:string;
  
}

export const CollapsibleComponent: React.FC<CollapsibleComponentProps> = ({ expanded, children ,leftIcon,className}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const toggleCollapse = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col items-center mt-6 ">
      {className?
            <button
            className={`inline-block rounded px-10 py-2 text-xs font-medium uppercase leading-normal ${className}`}
    
            type="button"
            onClick={toggleCollapse}
            aria-expanded={isExpanded}
          >
            {leftIcon? <div className='flex gap-x-4 items-center'>{leftIcon} <FaChevronDown /></div>:<FaChevronDown />}
          </button>
      :
      <button
        className="inline-block rounded bg-primary px-10 py-2 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"

        type="button"
        onClick={toggleCollapse}
        aria-expanded={isExpanded}
      >
        {leftIcon? leftIcon:<FaChevronDown />}
      </button>
}
      <div
        className={`${
          isExpanded ? 'block' : 'hidden'
        } mt-2 w-full rounded-lg bg-white p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:text-neutral-50`}
      >
        <div className='w-full z-2'>{children}</div>
      </div>
    </div>
  );
};



interface CollapsibleItemProps {
    headerText: string | JSX.Element;
    iconClass: ReactNode;
    
    isActive?: boolean;
    onItemClick?: () => void;
    children?: ReactNode;
    leftIcon?:ReactNode;
    className?:string;
}

const CollapsibleItem: React.FC<CollapsibleItemProps> = ({   headerText,
    iconClass,
    isActive,
    onItemClick,
    children,leftIcon,className }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCollapse = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li>
      <div
        className={`${className} z-10 collapsible-header cursor-pointer flex items-center justify-between p-3 rounded-sm hover:bg-[color:var(--lightBackgroundGreyColor)] shadow-sm`}
        onClick={onItemClick}

      >   
        
        <i className={`material-icons mr-2 text-[color:var(--mainTitleLightColor)]`}>{iconClass}</i>
        {typeof headerText === 'string' ? (
        <span className="  flex-1">{headerText}</span>
        ) : (
          <span className=''>{headerText}</span>
        )}
        <i className={`material-icons mr-2 margin-left: auto`}>{leftIcon? leftIcon:<FaChevronDown />}</i> 
      </div>
      {isActive && <div className=" bg-gray-30 p-3 shadow-md"><span>{children}</span></div>}
    </li>
  );
};

interface CollapsibleProps {
    expanded?: number; // Index of the item to be initially expanded
  children: ReactNode;
}

const Collapsible: React.FC<CollapsibleProps> = ({expanded, children}) => {
    const [activeIndex, setActiveIndex] = useState(expanded !== undefined ? expanded : -1);

    const onItemClick = (index: number) => {
      if (activeIndex === index) {
        setActiveIndex(-1); // Collapse if already open
      } else {
        setActiveIndex(index); // Expand if closed
      }
    };
  return (
    <ul className="collapsible z-10 w-full">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement, {
          onItemClick: () => onItemClick(index),
          isActive: activeIndex === index,
        })
      )}
    </ul>
  );
};

export { Collapsible, CollapsibleItem };

