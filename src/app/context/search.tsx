// import React from 'react';
// import CommonSearchBar from '../components/common/searchBar'; // Update the path as needed

// const SearchComponent: React.FC = () => {
//   const handleSearch = (searchQuery: string, option: string) => {
//     // Perform the search logic here using the searchQuery and option
//     console.log('Searching for:', searchQuery, 'with option:', option);
//   };

//   const searchOptions = ['Option 1', 'Option 2', 'Option 3'];

//   return (
//     <div className='flex justify-center bsm:mb-4 rounded-md'>
//       <CommonSearchBar onSearch={handleSearch} searchOptions={searchOptions} />
//     </div>
//   );
// };

// export default SearchComponent;


// version 2
// import React, { useState } from 'react';
// import CommonSearchBar from '../components/common/searchBar'; // Update the path as needed
// import { CommonAddButton } from '../components/common/buttons';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import styled from 'styled-components';
// import { CustomSelect } from '../components/common/inputs';


// interface SearchComponentProps {
//   onSearch: (results: any[]) => void;
//   employees: any[];
// }


// const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch, employees }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchOption, setSearchOption] = useState(''); // State to hold the selected search option

//   const handleSearch = () => {
//     let results = [];
//     switch (searchOption) {
//       case 'first_name':
//         results = employees.filter((employee) =>
//           employee.first_name.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         break;
//       case 'last_name':
//         results = employees.filter((employee) =>
//           employee.last_name.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         break;
//       case 'email':
//         results = employees.filter((employee) =>
//           employee.email.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         break;
//       case 'phone_no':
//         results = employees.filter((employee) =>
//           employee.phone_no.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         break;
//       case 'emirates_id':
//         results = employees.filter((employee) =>
//           employee.emirates_id.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         break;
//       case 'experiance':
//         results = employees.filter((employee) =>
//           employee.experiance.toString().toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         break;
//       case 'qualification':
//         results = employees.filter((employee) =>
//           employee.qualification.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         break;
//       // Add more cases for other search options as needed
//       default:
//         // If no search option is selected, search based on first name by default
//         results = employees.filter((employee) =>
//           employee.first_name.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         break;
//     }
//     onSearch(results); // Pass the search results to the parent component
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   // const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
   
//   //   setSearchOption(e.target.value);
//   // };
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//       setIsOpen(!isOpen);
//   };
//   // const [searchOption, setSearchOption] = useState('');

//   const handleOptionChange = (optionValue: string) => {
//     setSearchOption(optionValue);
//   };
//   const options = [
//     { value: 'first_name', label: 'First Name' },
//     { value: 'last_name', label: 'Last Name' },
//     { value: 'email', label: 'Email' },
//     { value: 'phone_no', label: 'Phone Number' },
//     { value: 'emirates_id', label: 'Emirates ID' },
//     { value: 'experience', label: 'Experience' },
//     { value: 'qualification', label: 'Qualification' },
//     // Add more options as needed
//   ];

//   return (
//     <div className=' flex justify-center justify-center bsm:mb-4 rounded-md mt-2  '>
//       <div className='hover:scale-105 duration-300 flex' >
//       <CustomSelect
//         options={options}
//         value={searchOption}
//         onChange={handleOptionChange}
//       />
//       <input
//         type='text'
//         placeholder='Search...'
//         value={searchQuery}
//         onChange={handleInputChange}
//         className='border-2 bg-white h-10 px-5 pr-16 focus:outline-1 outline-[color:var(--lightBackgroundColor)] transition-all text-md hover:scale-105 duration-300'
//       />
// </div>

//       <div className='lg:ml-2' onClick={handleSearch}>
//       <CommonAddButton
//                   icon={faSearch}
//                   color="color:var(--mainTitleColor)" // Add your desired color here
//                   title="Search"
//                   width={20}
//                   height={20}
                 
//                   className='cursor-pointer hover:scale-105 duration-300'
//                 />
//       </div>
      

//       {/* <form className="relative max-w-lg mx-auto">
//             <div className="relative flex items-center">
//                 <div className="relative">
//                     <select
//                         value=""
//                         onChange={handleOptionChange}
//                         className="appearance-none bg-gray-50 rounded-l-full pl-4 pr-8 py-2.5 text-sm font-medium text-gray-900 border border-gray-300 focus:ring-gray-100 focus:border-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-gray-700"
//                     >
//                         <option disabled hidden value="">Search Option</option>
//                         <option value='first_name'>First Name</option>
//                         <option value='last_name'>Last Name</option>
//                         <option value='email'>Email</option>
//                         <option value='phone_no'>Phone Number</option>
//                         <option value='emirates_id'>Emirates ID</option>
//                         <option value='experiance'>Experience</option>
//                         <option value='qualification'>Qualification</option>
//                     </select>
//                     <svg className="absolute top-1/2 right-3 transform -translate-y-1/2 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M7.293 9.293a1 1 0 0 0-1.414 1.414l3.5 3.5a1 1 0 0 0 1.414 0l3.5-3.5a1 1 0 1 0-1.414-1.414L11 11.086V5a1 1 0 1 0-2 0v6.086L7.293 9.293zM5 3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4H6v13h8v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" clipRule="evenodd" />
//                     </svg>
//                 </div>
//                 <div className="relative flex-1">
//                     <label htmlFor="search-dropdown" className="sr-only">Search</label>
//                     <input 
//                       type="search"
//                       id="search-dropdown" 
//                       value={searchQuery}
//                       onChange={handleInputChange}
//                       className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" 
//                       placeholder="Search Name, Qualification, Phone..." required />
//                 </div>
//                 <button type="submit" onClick={handleSearch}  className="absolute right-0 inset-y-0 flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                     <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//                     </svg>
//                     <span className="sr-only">Search</span>
//                 </button>
//             </div>
//         </form> */}

//     </div>
//   );
// };

// export default SearchComponent;



// version 3
import React, { useState,useEffect } from 'react';
import CommonSearchBar from '../components/common/searchBar'; // Update the path as needed
import { CommonAddButton } from '../components/common/buttons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { CommonSelect, CustomOption, CustomSelect, OptionsList, SelectBox, SelectContainer } from '../components/common/inputs';



interface Employee {
  first_name: string;
  last_name: string;
  email: string;
  phone_no: string;
  emirates_id: string;
  experience: number;
  qualification: string;
}

interface SearchComponentProps {
  onSearch: (results: Employee[]) => void;
  employees: Employee[];
}
const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch, employees }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOption, setSearchOption] = useState<string | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const handleSearch = () => {
      if (debouncedQuery.trim() === '') {
        onSearch([]);
        return;
      }

      const results = employees.filter((employee) => {
        const attributesToSearch = searchOption ? [searchOption] : Object.keys(employee);
        return attributesToSearch.some((attribute) => {
          const value = employee[attribute as keyof Employee];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(debouncedQuery.toLowerCase());
          } else if (typeof value === 'number') {
            return value.toString().includes(debouncedQuery);
          }
          return false;
        });
      });

      onSearch(results);
    };

    handleSearch();
  }, [debouncedQuery, searchOption, employees, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleOptionChange = (optionValue: string | null) => {
    setSearchOption(optionValue);
    setIsOpen(false);
  };

  const options = [
    { value: 'first_name', label: 'First Name' },
    { value: 'last_name', label: 'Last Name' },
    { value: 'email', label: 'Email' },
    { value: 'phone_no', label: 'Phone Number' },
    { value: 'emirates_id', label: 'Emirates ID' },
    { value: 'experience', label: 'Experience' },
    { value: 'qualification', label: 'Qualification' },
  ];

  return (
    <div className='flex justify-center rounded-md mt-2'>
      <div className='hover:scale-105 duration-300 flex'>
        <SelectContainer>
          <SelectBox onClick={() => setIsOpen(!isOpen)}>
            {searchOption ? options.find(option => option.value === searchOption)?.label : 'All'}
          </SelectBox>
          {isOpen && (
            <OptionsList>
              <CustomOption isSelected={!searchOption} onClick={() => handleOptionChange(null)}>
                All
              </CustomOption>
              {options.map((option) => (
                <CustomOption
                  key={option.value}
                  isSelected={searchOption === option.value}
                  onClick={() => handleOptionChange(option.value)}
                >
                  {option.label}
                </CustomOption>
              ))}
            </OptionsList>
          )}
        </SelectContainer>
        <input
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={handleInputChange}
          className='border-2 bg-white h-10 px-5 pr-16 focus:outline-1 transition-all text-md hover:scale-105 duration-300'
        />
      </div>
    </div>
  );
};


export default SearchComponent;


