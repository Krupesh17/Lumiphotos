import React from "react";

const ButtonRounded = ({
  children,
  type = "button",
  className = "",
  border = true,
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`relative h-[35px] w-[35px] shrink-0 rounded-full bg-foreground text-sm text-copy-lighter ${
        border && "border border-border"
      } ${
        disabled
          ? "cursor-not-allowed"
          : `focus-visible:outline-box hover:text-copy focus-visible:text-copy ${
              border && "hover:border-copy focus-visible:border-copy"
            }`
      } ${className}`}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonRounded;
