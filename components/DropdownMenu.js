
import { useState } from "react";


const DropdownMenu = ({value,options,placeholder,handleClick ,styles=""}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    handleClick(option.value);
    setIsOpen(false);
  };
  return (
    <div className={`inline-block text-left text-gray-700 px-2 py-2 rounded-lg w-[160px] ${styles} `}>
      <div className="">
        <div className="flex flex-row">
          <button
            onClick={toggleDropdown}
            className="flex flex-row justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-none rounded-md focus:outline-none focus:ring focus:ring-offset-2 focus:ring-deepskyblue"
          >
            <span className="mr-2 truncate">{value || placeholder}</span>
            <svg
              width="20" 
              height="20"
              className={`transition-transform duration-300 transform ${
                isOpen ? 'rotate-180' : 'rotate-0'
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8.293 11.293a1 1 0 011.414 0L12 13.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

    {isOpen && (
      <div className="absolute z-10 w-[300px] mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className="block w-[300px] px-4 py-2 text-left text-gray-500 hover:bg-deepskyblue hover:text-white focus:outline-none focus:bg-deepskyblue focus:text-white"
              role="menuitem"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
  )
}

export default DropdownMenu
