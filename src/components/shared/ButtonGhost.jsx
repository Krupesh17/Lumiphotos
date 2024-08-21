import React from "react";

const ButtonGhost = ({
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
      } rounded overflow-hidden bg-transparent text-copy-lighter border border-border ${
        disabled
          ? "cursor-not-allowed"
          : "hover:text-copy hover:border-copy focus-visible:text-copy focus-visible:border-copy"
      } ${outline && "focus-visible:outline-box"} ${className}`}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonGhost;
