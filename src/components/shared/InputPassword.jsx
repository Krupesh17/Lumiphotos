import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Input from "./Input";

const InputPassword = ({ label, name, className = "", control, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <Input
      label={label}
      name={name}
      type={isPasswordVisible ? "text" : "password"}
      control={control}
      className={className}
      {...props}
    >
      {isPasswordVisible ? (
        <EyeSlashIcon
          className="h-5 w-5 text-copy-lighter cursor-pointer hover:text-copy"
          onClick={() => setIsPasswordVisible(false)}
        />
      ) : (
        <EyeIcon
          className="h-5 w-5 text-copy-lighter cursor-pointer hover:text-copy"
          onClick={() => setIsPasswordVisible(true)}
        />
      )}
    </Input>
  );
};

export default InputPassword;
