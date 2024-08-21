import React, { forwardRef } from "react";

const ButtonIcon = forwardRef(
  (
    { type = "button", disabled = false, className = "", children, ...props },
    ref
  ) => {
    return (
      <button
        type={type}
        className={`p-1 relative rounded text-gray-400 hover:text-gray-500 focus-visible:text-gray-500 focus-visible:outline-box ${
          disabled && "cursor-not-allowed"
        } ${className}`}
        {...props}
        ref={ref}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);

export default ButtonIcon;
