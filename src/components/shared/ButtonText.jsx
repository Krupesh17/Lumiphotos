import React, { forwardRef } from "react";

const ButtonText = forwardRef(
  ({
    children,
    type = "button",
    className = "",
    buttonBlock = false,
    outline = true,
    disabled = false,
    ...props
  }, ref) => {
    return (
      <button
        type={type}
        ref={ref}
        className={`relative text-nowrap text-sm h-[35px] px-2.5 ${
          buttonBlock && "w-full"
        } rounded overflow-hidden bg-transparent text-copy-lighter ${
          disabled
            ? "cursor-not-allowed"
            : "hover:bg-foreground hover:text-copy focus-visible:bg-foreground focus-visible:text-copy"
        } ${outline && "focus-visible:outline-box"} ${className}`}
        {...props}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);

export default ButtonText;
