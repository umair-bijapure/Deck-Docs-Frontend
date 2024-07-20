import React, { useState,useEffect, useRef, ReactNode  } from 'react';
import { FaEdit } from 'react-icons/fa';

interface FloatingMenuProps {
  children: React.ReactNode;
  position: { x: number; y: number };
}

export const FloatingMenu: React.FC<FloatingMenuProps> = ({ children, position }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
    style={{
        position: 'fixed',
        left: `${position.x+200}px`, // Use the x position from the prop
        top: `${position.y}px`, // Use the y position from the prop
        zIndex: 1000,
        transition: 'transform 0.3s',
        transform: isOpen ? 'translateY(-60px)' : 'translateY(0)',
        display: 'flex',
        flexDirection: 'row',

      }}
    >

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '10px',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      >
        {children}
      </div>
      <button
        style={{
          backgroundColor: 'white',
          color: 'gray',
          border: '2',
          borderRadius: '10%',
          width: '30px',
          height: '30px',
          fontSize: '20px',
          cursor: 'pointer',
         
        }}
        onClick={toggleMenu}
      >
        
        <FaEdit/>
      </button>
    </div>
  );
};





interface FloatingMenuNextProps {
  contentClassName: string;
  buttonIcon: React.ReactNode;
  buttonClassName: string;
  menuItems: React.ReactNode[];
}

export const FloatingMenuNext: React.FC<FloatingMenuNextProps> = ({
  contentClassName,
  buttonIcon,
  buttonClassName,
  menuItems,
}) => {
  const floatingMenuRef = useRef<HTMLDivElement | null>(null);
  const [isInputVisible, setInputVisible] = useState(false);

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

  const toggleInput = () => {
    setInputVisible(!isInputVisible);
  };

  return (
    <div className={`floating-menu ${isInputVisible ? 'open' : ''}`}>
      <button className={buttonClassName} onClick={toggleInput}>
        {buttonIcon}
      </button>
      {isInputVisible && (
        <div className={contentClassName}>
          {menuItems.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      )}
    </div>
  );
};



