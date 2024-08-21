import React from "react";

const ButtonFilled = ({
  children,
  type = "button",
  className = "",
  buttonBlock = false,
  outline = true,
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`relative text-nowrap text-sm h-[35px] px-2.5 ${
        buttonBlock && "w-full"
      } rounded overflow-hidden bg-primary text-primary-content ${
        disabled
          ? "cursor-not-allowed"
          : "hover:bg-primary-dark focus-visible:bg-primary-dark"
      } ${outline && "focus-visible:outline-box"} ${className}`}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonFilled;
