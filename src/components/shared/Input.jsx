import React, { useCallback, useId } from "react";
import { Controller } from "react-hook-form";

const Input = ({
  label,
  subLabel,
  name,
  type = "text",
  className = "",
  control,
  children,
  preFixIcon,
  usernameInput = false,
  toPascalCase = false,
  required = false,
  ...props
}) => {
  const inputId = useId();

  const handleInputChange = useCallback(
    (e, field) => {
      let processedValue = e.target.value;

      if (usernameInput) {
        processedValue = processedValue
          .replace(/[^\w\s]/gi, "")
          .toLowerCase()
          .split(" ")
          .join("_");
      } else if (toPascalCase) {
        processedValue = processedValue
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
      }

      field.onChange(processedValue);
    },
    [usernameInput, toPascalCase]
  );

  return (
    <div>
      {label && (
        <label
          htmlFor={inputId}
          className="inline-block font-base mb-1 text-copy"
        >
          {label} {required && <span className="text-error">*</span>}{" "}
          <span className="text-copy-lighter text-xs">{subLabel}</span>
        </label>
      )}

      <div
        className={`w-full h-[35px] flex items-center gap-x-1.5 bg-background rounded border border-border px-2 overflow-hidden focus-within:outline-box ${className}`}
      >
        {preFixIcon}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              type={type}
              className="w-full h-full bg-inherit text-copy max-sm:text-sm placeholder:text-copy-lighter"
              id={inputId}
              {...field}
              {...props}
              onChange={(e) => handleInputChange(e, field)}
              required={required}
            />
          )}
        />
        {children}
      </div>
    </div>
  );
};

export default React.memo(Input);
