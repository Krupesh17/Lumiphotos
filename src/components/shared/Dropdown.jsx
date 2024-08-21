import React, { useEffect, useRef } from "react";

const Dropdown = ({
  children,
  isDropdownOpen,
  setIsDropdownOpen,
  dropdownPosition = "left-0",
  className = "",
  width = "",
  dropdownButton,
}) => {
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative inline-flex items-center ${width}`} ref={dropdownRef}>
      <div
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`flex items-center w-full`}
      >
        {dropdownButton}
      </div>

      {isDropdownOpen && (
        <div
          className={`absolute top-11 ${dropdownPosition} bg-background border border-border rounded-md overflow-hidden py-2.5 z-10 ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
