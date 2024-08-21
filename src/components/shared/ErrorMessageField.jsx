import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

const ErrorMessageField = ({ children, className }) => {
  return (
    <small
      className={`text-error font-medium flex items-center gap-1 ${className}`}
    >
      <ExclamationCircleIcon
        className="w-4 h-4 text-inherit"
        strokeWidth={2.5}
      />
      {children}
    </small>
  );
};

export default ErrorMessageField;
