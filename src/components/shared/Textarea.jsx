import React, { useEffect, useId, useState } from "react";
import { Controller } from "react-hook-form";

const Textarea = ({
  label,
  subLabel,
  name,
  rows = 6,
  cols = 50,
  control,
  maxLength = 250,
  className = "",
  ...props
}) => {
  const textareaId = useId();
  const [textLength, setTextLength] = useState(0);

  const handleTextareaChange = (e, field) => {
    let textareaValue = e.target.value;

    if (textareaValue.length <= maxLength) {
      field.onChange(textareaValue);
      setTextLength(textareaValue.length);
    }
  };

  useEffect(() => {
    const initialTextLength = control._defaultValues[name].length || 0;
    setTextLength(initialTextLength);
  }, [control._defaultValues[name], name]);

  return (
    <div>
      {label && (
        <label
          htmlFor={textareaId}
          className="inline-block font-base mb-1 text-copy"
        >
          {label} <span className="text-copy-lighter text-xs">{subLabel}</span>
        </label>
      )}
      <div
        className={`relative w-full flex items-center border border-border text-copy rounded-md p-2 placeholder:text-copy-lighter overflow-hidden focus-within:outline-box ${className}`}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <textarea
              id={textareaId}
              rows={rows}
              cols={cols}
              className={`w-full bg-inherit resize-none`}
              {...field}
              {...props}
              onChange={(e) => handleTextareaChange(e, field)}
            />
          )}
        />
        <div className="absolute bottom-0 right-0 text-xs text-copy-lighter bg-border/60 rounded-tl-md px-2 py-1">
          {maxLength - textLength}
        </div>
      </div>
    </div>
  );
};

export default Textarea;
