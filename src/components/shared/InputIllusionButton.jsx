import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { useRef } from "react";

const InputIllusionButton = ({
  children,
  label,
  subLabel,
  preFixIcon,
  className = "",
  clickEffect = true,
  required = false,
  ...props
}) => {
  const inputIllusionButtonRef = useRef(null);

  const handleClickOnLabel = () => {
    inputIllusionButtonRef.current.focus();
  };

  return (
    <div>
      {label && (
        <label
          className="inline-block font-base mb-1 text-copy"
          onClick={handleClickOnLabel}
        >
          {label} {required && <span className="text-error">*</span>}{" "}
          <span className="text-copy-lighter text-xs">{subLabel}</span>
        </label>
      )}
      <button
        type="button"
        className={`relative w-full h-[35px] flex items-center gap-x-1.5 rounded border border-border px-2 overflow-hidden hover:bg-foreground focus-visible:bg-foreground focus-visible:outline-box ${className}`}
        {...props}
      >
        {preFixIcon}
        <span className="mr-auto">{children}</span>
        <div className="absolute top-0 right-0 h-full flex items-center p-1.5">
          <ArrowRightIcon className="w-5 h-5" strokeWidth={2} />
        </div>
      </button>
    </div>
  );
};

export default InputIllusionButton;
