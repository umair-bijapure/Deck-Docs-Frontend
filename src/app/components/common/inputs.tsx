import React, { ChangeEvent, ReactElement, ReactNode, useState,useRef, forwardRef, useImperativeHandle  } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FaAccessibleIcon, FaCheck, FaCopy, FaLocationArrow } from "react-icons/fa";
import { Farsan } from "next/font/google";
import { FloatingMenu } from "./FloatingMenu";
interface CommonLabelProps {
  id: string;
  title?: string;
  required?: boolean;
  tooltip?: boolean;
  icon?:ReactElement
  
}

export const CommonLabel: React.FC<CommonLabelProps> = ({ id, 
    title, 
    required, tooltip,icon}) => {
  return (
    <label htmlFor={id} className="flex text-sm font-semibold text-slate-900">
      <div className="flex space-x-1">
        <div>{icon}</div>
        <div>{title}</div>
      </div>
      

      {required ? <div className="text-red-500">*</div> : null}
      {tooltip ? (
        <div className="px-2 text-blue-600">
          <FontAwesomeIcon icon={faUserAlt} fixedWidth />
        </div>
      ) : null}
    </label>
  );
};

interface CommonTextInputProps {
  id: string;
  required?: boolean;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  autoComplete?: string;
  tabIndex?: number;
  className?:string;
  
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CommonTextInput: React.FC<CommonTextInputProps> = ({
  id,
  required,
  value,
  placeholder,
  disabled,
  maxLength,
  autoComplete,
  tabIndex,
  onChange,
  className,
  
}) => {
  return (
    <input
      id={id}
      name={id}
      defaultValue={value}
      placeholder={placeholder}
      type="text"
      disabled={disabled}
      required={required}
      className={`${className} mt-1 block w-full h-8 mb-1 bg-gray-100 py-2 px-3 shadow-sm focus:border-green-600 focus:outline-none focus:ring-blue-500 disabled:bg-gray-100 text-sm sm:text-md`}
      maxLength={maxLength}
      autoComplete={autoComplete}
      onChange={onChange}
      tabIndex={tabIndex}
    />
  );
};

interface CommonFormTextInputProps extends CommonTextInputProps, CommonLabelProps {
  labelSide?: boolean;
  className?:string;
 
}

export const CommonFormTextInput: React.FC<CommonFormTextInputProps> = ({
  id,
  title,
  required,
  tooltip,
  value,
  placeholder,
  disabled,
  maxLength,
  autoComplete,
  tabIndex,
  onChange,
  labelSide,
  className,
  icon
  

}) => {
  return (
    <div className={`flex flex-1 ${labelSide ? "flex-row items-center space-x-2" : "flex-col"}`}>
      <CommonLabel id={id} 
      title={title}  
      required={required} tooltip={tooltip} icon={icon} />
      <CommonTextInput
        id={id}
        required={required}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        maxLength={maxLength}
        autoComplete={autoComplete}
        onChange={onChange}
        tabIndex={tabIndex}
        className={className}
      />
    </div>
  );
};


interface CommonSelectProps {
  id: string;
  value?: string;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
  defaultValue?: string;
  autoComplete?: string; // Add autoComplete prop
  className?:string;
}

export const CommonSelect: React.FC<CommonSelectProps> = ({
  id,
  value,
  disabled,
  onChange,
  children,
  defaultValue,
  autoComplete, // Add autoComplete prop
  className
}) => {
  return (
    <select
      aria-label="select"
      name={id}
      id={id}
      onChange={onChange}
      className={`p-2 ${className}`}
      defaultValue={defaultValue}
      // value={value}
      disabled={disabled}
      autoComplete={autoComplete} // Use autoComplete prop here
    >
      {children}
    </select>
  );
};

interface CommonFormSelectProps extends CommonLabelProps {
  id: string;
  title: string;
  required?: boolean;
  tooltip?: boolean;

  disabled?: boolean;
  autoComplete?: string;
  children: ReactNode;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  labelSide?: boolean;
  defaultValue?: string;
  className?:string
  
}

export const CommonFormSelect: React.FC<CommonFormSelectProps> = ({
  id,
  title,
  required,
  tooltip,
 
  disabled,
  autoComplete,
  children,
  onChange,
  labelSide,
  defaultValue,
  className,
  icon
}) => {
  return (
    <div className={`flex flex-1 ${labelSide ? 'flex-row items-center space-x-2' : 'flex-col'}`}>
      {/* CommonLabel component goes here */}
      <CommonLabel id={id} 
      title={title}  
      required={required} tooltip={tooltip} icon={icon} />
      <CommonSelect
        id={id}
        // value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        disabled={disabled}
        autoComplete={autoComplete}
        className={className}
      >
        {children}
      </CommonSelect>
    </div>
  );
};




interface SearchInputProps {
  id: string;
  placeholder: string;
  icon?: IconDefinition | string;
  required?: boolean;
  onChange?: (e: any) => void;
  isDisabled?:boolean;
  defaultvalue?:string;
  value?: string;
   // Icon from FontAwesome
}

export const CommonIconInput: React.FC<SearchInputProps> = ({ placeholder, icon ,onChange,isDisabled,defaultvalue }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    onChange && onChange(event); // Pass the event to the parent component if onChange is provided
  };

  return (
    <div className=" h-full justify-center flex items-center rounded-md shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
       {/* shadow-[0_4px_9px_-4px_#3b71ca]  */}
      <div>
      <button
          type="submit"
          className={`flex items-center rounded-l-md border border-white justify-center w-12 h-14  text-white 
            ${search.length > 0 ? 'bg-[color:var(--mainTitleLightestColor)]' : 'bg-[color:var(--lightBackgroundGreyColor)]  cursor-not-allowed'}`}
          disabled={search.length === 0}
        >
          {typeof icon === 'string' ? (
            <img src={icon} alt="Icon" className="h-4 w-4 text-red-400" />
          ) : (
            icon && <FontAwesomeIcon icon={icon} className="h-10 w-4 text-red-500" />
          )}
        </button>
      </div>
      <div className="w-full">
        <input
          type="search"
          
          defaultValue={defaultvalue}
          onChange={handleSearchChange}
          className="w-full h-9 px-4 py-1 text-gray-800 focus:outline-none"
          placeholder={placeholder}
          disabled={isDisabled}

          
        />
      </div>
    </div>
  );
};  

interface TableRowEditorProps {
    rowIndex: number;
    onSave: (rowIndex: number, description: string) => void;
  }

 export const TableRowEditor: React.FC<TableRowEditorProps> = ({ rowIndex, onSave }) => {
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [fontSize, setFontSize] = useState('16px');
    const [fontColor, setFontColor] = useState('red');
    const [showTextOptions, setShowTextOptions] = useState(false); 
    const [displayedDescription, setDisplayedDescription] = useState('');
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
    const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsEditing(true);
      setClickPosition({ x: e.clientX, y: e.clientY });
    };
  
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
    };
  
    const handleSaveClick = () => {
      onSave(rowIndex, description);
      setIsEditing(false);
      setDescription('');
    };
  
    const handleBoldClick = () => {
      setIsBold(!isBold);
    };
  
    const handleItalicClick = () => {
      setIsItalic(!isItalic);
    };
  
    const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = e.target.value;
        setFontSize(newSize + 'px'); // Adding 'px' suffix to the font size
      };
  
    const handleFontColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFontColor(e.target.value);
    };
  
    const textStyle = {
      fontWeight: isBold ? 'bold' : 'normal',
      fontStyle: isItalic ? 'italic' : 'normal',
      fontSize,
      color: fontColor,
    };
    const fontSizes = ['12', '14', '16', '18','22']; 
  
    return (
<div className="relative">
  <button
    className={`text-blue-500 hover:text-blue-700 ${isEditing ? 'hidden' : 'block'}`}
    onClick={handleEditClick}
  >
    {displayedDescription || 'Add Description'}
  </button>
  {isEditing && (
    <div className="relative">
      <div className="flex items-center">
        <FloatingMenu position={clickPosition}>
            <div className=" grid-cols-1 justify-items-center bg-gray-300 w-12 mb-2">
                <div className="m-1 w-10 border-b border-white">
                    <input
                        type="color"
                        value="#FF0000"
                        onChange={handleFontColorChange}
                        className="mx-2 w-6 h-6"
                    />
                </div>
                <div className="p-1 border-b border-white">
                    <select
                        id={`font-size`}
                        value={fontSize.replace('px', '')}
                        onChange={handleFontSizeChange}
                        className="w-10"
                    >
                        {fontSizes.map((size) => (
                        <option key={size} value={size}>
                            {size}px
                        </option>
                        ))}
                    </select>
                </div>
                <div className="m-1 border-b border-white">
                    <button className="text-[color:var(--mainTitleColor)] hover:text-blue-700 mx-2 font-extrabold" onClick={handleBoldClick}>
                        B
                    </button>
                </div>
                <div className="p-1 border-b border-white">
                    <button className="text-[color:var(--mainTitleColor)] hover:text-blue-700 mx-2 italic " onClick={handleItalicClick}>
                        I
                    </button>
                </div>

                <div className="p-1">
                    <button className="text-green-600 hover:text-blue-700" onClick={handleSaveClick}>
                        <FaCheck/>
                    </button>
                </div>
            </div>
      
        </FloatingMenu>
      </div>
      <textarea
        style={{
          fontSize,
          color: fontColor,
          fontWeight: isBold ? 'bold' : 'normal', // Apply fontWeight for bold
          fontStyle: isItalic ? 'italic' : 'normal', // Apply fontStyle for italic
          resize: 'none',
        }}
        className="border border-gray-300 rounded-md p-2 mt-2"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter description..."
        rows={3}
      />

    </div>
  )}
</div>
 
    );
  };





//   {isEditing && (
//     <div className="relative">
//       <div className="flex items-center">
//         <input
//           type="color"
//           value={fontColor}
//           onChange={handleFontColorChange}
//           className="mx-2"
//         />
//         <label htmlFor={`font-size`} className="block font-medium mx-2">
//           Font Size
//         </label>
//         <select
//           id={`font-size`}
//           value={fontSize.replace('px', '')}
//           onChange={handleFontSizeChange}
//           className="border border-gray-300 rounded-md px-2 py-1"
//         >
//           {fontSizes.map((size) => (
//             <option key={size} value={size}>
//               {size}px
//             </option>
//           ))}
//         </select>
//       </div>
//       <textarea
//         style={{
//           fontSize,
//           color: fontColor,
//           resize: 'none',
//         }}
//         className="border border-gray-300 rounded-md p-2 mt-2"
//         value={description}
//         onChange={handleDescriptionChange}
//         placeholder="Enter description..."
//         rows={3}
//       />
//       <button className="text-blue-500 hover:text-blue-700" onClick={handleSaveClick}>
//         Done
//       </button>
      
//     </div>
//   )}

// interface SearchInputProps {
//   id: string;
//   placeholder: string;
//   icon?: IconDefinition | string;
//   required?: boolean;
//    // Icon from FontAwesome
// }

// export const CommonIconInput: React.FC<SearchInputProps> = ({ placeholder, icon }) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const [inputValue, setInputValue] = useState('');

//   const handleFocus = () => {
//     setIsFocused(true);
//   };

//   const handleBlur = () => {
//     setIsFocused(false);
//   };

//   const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
//     setInputValue(e.target.value);
//   };

//   return (
//     <div className="">
//       <div className="relative">
//         <input
//           className={`w-full h-10 rounded-md text-black text-xl border-2 bg-transparent bg-white outline-none `}
//           type="text"
//           id="input"
//           required
//           onFocus={handleFocus}
//           onBlur={handleBlur}
//           onChange={handleInputChange}
//           value={inputValue}
//         />
//         <label
//           className={`absolute left-4 transition-all duration-300 mb-2 ${
//             isFocused || inputValue ? `-top-2 text-black mb-2 ${icon} text-sm ` : 'top-1/2'
//           } pointer-events-none`}
//           htmlFor="input"
//         >
//           {placeholder}
//         </label>
//       </div>
//     </div>
//   );
// };  




interface CommonInputProps {
  label: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  handleCopyToClipboard?:()=>void;
  copy?:boolean;
  className?:string;
}

export const CommonInput = forwardRef<HTMLInputElement, CommonInputProps>(
  (
    { label, defaultValue, onChange, placeholder, isDisabled = false, isRequired = false,handleCopyToClipboard,copy,className },
    ref
  ) => {
    return (
      <div className={`flex-col z-10 items-center justify-center w-full sm:h-auto gap-x-4 sm:pl-2 sm:pr-2 p-1 ${className}`}>
        <div className="truncate p-2 bg-[color:var(--mainTitleLightestColor)] rounded-2xl pl-4 w-full ">
          <h1 className="text-[10px] text-[color:var(--mainTitleLightColor)]">{label}</h1>
          <div className="flex items-center justify-center w-full ">
          <input
            className="text-md bg-[color:var(--mainTitleLightestColor)] text-[color:var(--mainTitleColor)] mt-1 px-2 py-1 placeholder-slate-400 focus:outline-none focus:border-[color:var(--primaryColor)] focus:ring-[color:var(--primaryColor)] block rounded-md sm:text-sm focus:ring-1 w-full"
            defaultValue={defaultValue}
            onChange={onChange}
            placeholder={placeholder}
            disabled={isDisabled}
            required={isRequired}
            ref={ref}
          />
          {copy &&
        
                            <button
        onClick={handleCopyToClipboard}
        className=" text-[color:var(--mainTitleLightColor)] p-1 rounded cursor-pointer "
      >
        <FaCopy /> {/* Use the copy icon */}
      </button>}
      </div>
        </div>
      </div>
    );
  }
);
CommonInput.displayName = 'CommonInput';


import styled from 'styled-components';
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
 
`;

export const SelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color:#EEF3FB;
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
  border: 2px ;
  border: #EEF3FB;
  height: 2.5rem;
  padding: 0 1.25rem;
  cursor: pointer;
  transition: border-color 0.3s;
  &:hover {
    border-color: #007bff;
  }
`;

export const OptionsList = styled.ul`
  position: absolute;
  z-index: 10;
   width: 200px;
  background-color: white;
  border: 2px solid #FFC61D;
  box-shadow: 0px 6px 8px rgba(25, 50, 47, 0.08), 0px 3px 4px rgba(18, 71, 52, 0.02), 0px 1px 16px rgba(18, 71, 52, 0.03);
  border-top: none;
  border-radius: 0 0 0.375rem 0.375rem;
  max-height: 15rem;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0;
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export const Option = styled.li<{ isSelected: boolean }>`
  padding: 0.75rem 1rem;
  cursor: pointer;
 width: 200px;
  background-color: ${({ isSelected }) => (isSelected ? '#FFC61D' : 'white')};
  color: ${({ isSelected }) => (isSelected ? 'white' : ' #007bff')};
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #D0E1F9;
    box-shadow: 0px 6px 8px rgba(25, 50, 47, 0.08),0px 3px 4px rgba(18, 71, 52, 0.02), 0px 1px 16px rgba(18, 71, 52, 0.03);
  }
`;
export const CustomOption = styled.li<{ isSelected: boolean }>`
  padding: 0.75rem 1rem;
  cursor: pointer;
  width: 200px;
  background-color: ${({ isSelected }) => (isSelected ? '#FFC61D' : 'white')};
  color: ${({ isSelected }) => (isSelected ? 'white' : '#007bff')};
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #D0E1F9;
    box-shadow: 0px 6px 8px rgba(25, 50, 47, 0.08), 0px 3px 4px rgba(18, 71, 52, 0.02), 0px 1px 16px rgba(18, 71, 52, 0.03);
  }
`;
export const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const handleOptionClick = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <SelectContainer>
      <SelectBox onClick={() => setIsOpen(!isOpen)}>
        {selectedValue ? options.find(option => option.value === selectedValue)?.label : <div className="text-[color:var(--mainTitleLightColor)] font-semibold">Select</div>}
      </SelectBox>
      {isOpen && (
        <OptionsList>
          <CustomOption isSelected={!selectedValue} onClick={() => handleOptionClick('')}>
            All
          </CustomOption>
          {options.map(option => (
            <Option
              key={option.value}
              isSelected={selectedValue === option.value}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </Option>
          ))}
        </OptionsList>
      )}
    </SelectContainer>
  );
};


