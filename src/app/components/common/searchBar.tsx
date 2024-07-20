import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight,FaSearch } from 'react-icons/fa';
import { CommonFormTextInput, CommonTextInput } from './inputs';


interface CommonSearchBarProps {
  onSearch: (searchQuery: string, option: string) => void;
  searchOptions: string[];
}

const CommonSearchBar: React.FC<CommonSearchBarProps> = ({ onSearch, searchOptions }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(searchOptions[0]);

  const handleSearch = () => {
    onSearch(searchQuery, selectedOption);
  };

  return (
    <div className='vvsm:w-[300px] bsm:w-[400px] w-full rounded-md'>
    <div className="flex items-center  p-2 rounded-md ">
      {/* <select
        className="outline-none  vvvsm:w-[30px] bsm:w-[100px] bg-gray-200"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {searchOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select> */}
      <CommonFormTextInput
          // type="text"
          placeholder="Search..."
          className="rounded-l-md  bg-white text-[color:var(--mainTitleColor)] font-semibold hover:ring-1 ring-current "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} id={''}      />
      <button
        className=" hidden bg-[color:var(--mainTitleColor)] text-white px-4 py-2 sm:flex h-[32px] items-center rounded-r-md hover:ring-1 ring-curren"
        onClick={handleSearch}
      >
        Search
      </button>
      <button
        className="flex sm:hidden bg-[color:var(--mainTitleColor)] text-white px-1 py-2 rounded-r-md"
        onClick={handleSearch}
      >
        <FaSearch/>
      </button>
    </div>
    </div>
  );
};

export default CommonSearchBar;
