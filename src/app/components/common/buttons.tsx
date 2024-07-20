import React, { ReactElement, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FaPlus, FaUser, FaUserPlus } from "react-icons/fa";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
export interface CommonButtonProps {
  text?: string;
  id?: string;
  type?: "button" | "submit" | "reset"; // Update the type prop here
  title?: string;
  onClick?: () => void;
  form?: string;
  hidden?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const CommonButton: React.FC<CommonButtonProps> = ({
  text,
  id,
  type,
  title,
  onClick,
  form,
  hidden,
  loading,
  disabled,
  className,
  
  
  
}) => {
  if (hidden) {
    return null;
  }

  return loading ? (
    <button
      disabled={true}
      className="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
        
      <FontAwesomeIcon icon={faPlus} className="fa-spin px-6"/>
    </button>
  ) : (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className="relative rounded px-5 py-2.5 overflow-hidden group bg-indigo-500 relative hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-indigo-400 transition-all ease-out duration-300"
      disabled={disabled}
      title={title}
      form={form}
    >
      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
      <span className="relative pl-4 pr-4">
      {text}
      </span>
    </button>
  );
};

CommonButton.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]), // Use oneOf to define the allowed values
  title: PropTypes.string,
  onClick: PropTypes.func,
  form: PropTypes.string,
  hidden: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export interface CommonButtonBlockSolidBlueProps extends CommonButtonProps {
  // Additional props specific to CommonButtonBlockSolidBlue
  // (if there are any, otherwise, it can be an empty interface)
}

export const CommonButtonBlockSolidBlue: React.FC<CommonButtonBlockSolidBlueProps> = ({
  hidden,
  loading,
  id,
  type, // Update the type prop here
  onClick,
  disabled,
  title,
  form,
  text,
}) => {
  return (
    <CommonButton
      id={id}
      type={type}
      className="w-full border-transparent bg-blue-500 text-base text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:bg-blue-500"
      text={text}
      onClick={onClick}
      disabled={disabled}
      hidden={hidden}
      loading={loading}
      form={form}
      title={title}
    />
  );
};

CommonButtonBlockSolidBlue.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]), // Use oneOf to define the allowed values
  text: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
  form: PropTypes.string,
  hidden: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

interface CommonButtonTextProps extends CommonButtonProps {
  // Additional props specific to CommonButtonText (if any)
}

export const CommonButtonText: React.FC<CommonButtonTextProps> = ({
  hidden,
  loading,
  id,
  type,
  onClick,
  disabled,
  title,
  text,
}) => {
  return (
    <CommonButton
      id={id}
      type={type}
      className="border-transparent text-white hover:text-black focus:outline-none w-full"
      text={text}
      onClick={onClick}
      disabled={disabled}
      hidden={hidden}
      loading={loading}
      title={title}
    />
  );
};

CommonButtonText.propTypes = {
  // Ensure that the prop types match CommonButtonProps
  id: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  text: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
  hidden: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};


interface CommonButtonSolidBlueProps extends CommonButtonProps {
  // Additional props specific to CommonButtonSolidBlue (if any)
}

export const CommonButtonSolidBlue: React.FC<CommonButtonSolidBlueProps> = ({
  hidden,
  loading,
  id,
  type,
  onClick,
  disabled,
  title,
  form,
  text,
  className,
}) => {
  return (
    <CommonButton
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      hidden={hidden}
      title={title}
      form={form}
      text={text}
    />
      
    
  );
};

CommonButtonSolidBlue.propTypes = {
  // Ensure that the prop types match CommonButtonProps
  id: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  text: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
  form: PropTypes.string,
  hidden: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};



interface CircularButtonProps {
  icon?: string; // Icon image URL
  href?: string; // Link to navigate when button is clicked
  color?: string; // Background color of the button
  title: string; // Title of the button
  width?:number;
  height?:number;
  onClick?: () => void;
}

export const CircularButton: React.FC<CircularButtonProps> = ({
  icon,
  href,
  color,
  title,
  width,
  height,
}) => {
  // bg-${color}-500
  return (
    <a href={href} className={`flex flex-col items-center text-center p-2`}>
      <div
        className={`w-full h-full rounded-full  flex justify-center items-center vvvsm:mt-[-8px] p-2`}
      >
        <img src={icon} alt="Button Icon" className='rounded-full shadow-md border-2 border-white w-[80px] h-[80px] md:w-[60px] md:h-[60px] sm:w-[38px] vvvsm:w-[40px] vvvsm:h-[40px]' />
      </div>
      <span className={`vvvsm:text-[12px]  bsm:text-[14px] bsm:ml-[-2px] vvvsm:mt-[-16px] p-2 '${color}'`} >{title}</span>
    </a>
  );
};


interface PlusButtonProps {
  onClick: () => void;
  className?:string;
}

export const PlusButton: React.FC<PlusButtonProps> = ({ onClick,className }) => {
  return (
    <div className="p-2 sm:m-10">
      <button
        className={`p-2 bg-[color:var(--lightBackgroundColor)] text-[color:var(--mainTitleLightColor)] border rounded cursor-pointer ${className}`}
        onClick={onClick}
      >
        <FaPlus />
      </button>
    </div>
  );
};



// Define a TypeScript interface for the component props
interface CommonAddButtonProps {
  icon?: IconDefinition;
  href?: string;
  title: string;
  color?: string;
  width?: number;
  height?: number;
  className?:string;
  onClick?: () => void;
}

// Create the reusable CommonIconButton component
export const CommonAddButton: React.FC<CommonAddButtonProps> = ({
  icon,
  href,
  title,
  color,
  width,
  height,
  className,
  onClick,
}) => {
  return (
    <div className={`flex flex-col justify-center items-center font-bold text-20 ${className}`}>
      
      <div className="">
        <button onClick={onClick} className={`bg-[color:var(--lightBackgroundGreyColor)] hover:text-white hover:bg-[color:var(--mainTitleLightColor)] text-[color:var(--mainTitleLightColor)] font-bold gap-x-2 py-2 px-4 rounded inline-flex items-center ${color}`}>
          {icon?
          <FontAwesomeIcon icon={icon} style={{ color, width, height }} />:""}
          <span >{title}</span>
        </button>
      </div>
    </div>
  );
};

interface CheckboxProps {
  label: string;
  isChecked:boolean;

  handleCheckboxChange :()=>void;

}

export const Checkbox: React.FC<CheckboxProps> = ({ label,isChecked,handleCheckboxChange }) => {


  return (
    <div>
      <div className="inline-flex items-center">
        <label
          className="relative flex items-center p-3 rounded-full cursor-pointer"
          htmlFor="green"
        >
          <input
            type="checkbox"
            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-amber-500 checked:bg-amber-500 checked:before:bg-amber-500 hover:before:opacity-10"
            id="green"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </label>
      </div>
      <label htmlFor="sunny">{label}</label>
    </div>
  );
};

interface ToggleSwitchProps {
  project_status?: boolean;
  onToggle: (status: boolean) => void;
  defaultValue?:boolean;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ project_status, onToggle,defaultValue }) => {
  const [isOn, setIsOn] = useState(defaultValue||project_status);

  useEffect(() => {
    setIsOn(project_status);
  }, [project_status]);

  const handleToggle = () => {
    const newStatus = isOn ? false : true;
    setIsOn(!isOn);
    onToggle(newStatus); // Callback to update the parent component or make an API call
  };


  return (
<div
  className={`relative w-[60px] h-[20px] border-2 rounded-full transition-all duration-700 ease-in-out ${isOn ? 'border-amber-200' : 'border-green-600'}`}
  onClick={handleToggle}
  style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
>
  <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
        <div className={`absolute h-3.5 rounded-full cursor-pointer transition-all duration-700 ease-in-out ${isOn ? 'flex items-center justify-center w-[55px] bg-amber-200 shadow-md right-0.5' : 'w-3.5 left-0.5 bg-green-600'}`} />
        <div className={`absolute ${isOn ? 'text-amber-800' : 'text-transparent'} transition-colors font-bold duration-700 ease-in-out text-sm font-normal cursor-pointer`}>
          Active
        </div>
        <div className={`absolute right-1 text-[10px] font-bold transition-colors duration-700 ease-in-out ${isOn ? 'text-transparent' : 'text-green-600'} cursor-pointer`}>
          Closed
        </div>
      </div>
    </div>
  </div>
</div>

  );
};










