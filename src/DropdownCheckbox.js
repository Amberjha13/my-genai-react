import React, { useState, useRef, useEffect } from 'react';
import './DropdownCheckbox.css'; // Import your CSS file for styling

const DropdownCheckbox = () => {
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState(200); // Set an initial width
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Close dropdown when clicking outside the component
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
    if (dropdownRef.current) {
      setDropdownWidth(dropdownRef.current.clientWidth);
    }
  };

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  // Generate the comma-separated string
  const selectedOptionsString = selectedOptions.join(', ');

  return (
    <div className="dropdown-checkbox-container" ref={dropdownRef}>
      <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`} onClick={toggleDropdown} style={{ width: `${dropdownWidth}px` }}>
        {selectedOptions.length > 0 ? selectedOptionsString : 'Select Options'}
      </div>
      {isDropdownOpen && (
        <div className="dropdown-content" style={{ width: `${dropdownWidth}px` }}>
          {options.map((option) => (
            <label key={option} className="checkbox-label">
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownCheckbox;
