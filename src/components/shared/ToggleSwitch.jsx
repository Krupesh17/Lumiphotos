import React from "react";

const ToggleSwitch = ({ isOn, setIsOn, ...props }) => {
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      props.onClick();
    }
  };
  return (
    <div className="flex items-center">
      <div
        className={`w-10 h-6 flex items-center bg-foreground rounded-full p-1 border border-border cursor-pointer transition-colors duration-500 focus-visible:outline-box ${
          isOn ? "bg-primary-light" : "bg-foreground"
        }`}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="switch"
        aria-checked={isOn}
        {...props}
      >
        <div
          className={`bg-background w-[14px] h-[14px] rounded-full shadow-md transform transition-transform duration-500 ${
            isOn ? "translate-x-4" : "translate-x-0"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
