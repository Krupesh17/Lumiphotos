import React, { useState, useCallback, useEffect, useRef } from "react";
import { useId } from "react";
import { Controller } from "react-hook-form";

const TagsInput = ({
  label,
  subLabel,
  name,
  type = "text",
  className = "",
  control,
  children,
  required = false,
  ...props
}) => {
  const tagsInputRef = useRef();
  const tagsTextareaId = useId();
  const [rows, setRows] = useState(1);
  const textareaLineHeight = 24;
  const maxRows = 5;

  const handleTagsTextareaChange = useCallback((e, field) => {
    const previousRows = e.target.rows;
    e.target.rows = 1;
    // 👆 Reset number of rows in textarea is temporarily set to a single row.
    // This allows the full height of the content to be measured accurately "scrollHeight" of textarea.
    const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      e.target.rows = maxRows;
      e.target.scrollTop = e.target.scrollHeight;
    }

    setRows(currentRows < maxRows ? currentRows : maxRows);
    field.onChange(e);
  }, []);

  useEffect(() => {
    const previousRows = tagsInputRef.current.rows;
    tagsInputRef.current.rows = 1;
    const currentRows = Math.floor(
      tagsInputRef.current.scrollHeight / textareaLineHeight
    );

    if (currentRows === previousRows) {
      tagsInputRef.current.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      tagsInputRef.current.rows = maxRows;
      tagsInputRef.current.scrollTop = tagsInputRef.current.scrollHeight;
    }

    setRows(currentRows < maxRows ? currentRows : maxRows);
  }, [tagsInputRef.current]);

  return (
    <div>
      {label && (
        <label
          htmlFor={tagsTextareaId}
          className="inline-block font-base mb-1 text-copy"
        >
          {label} {required && <span className="text-error">*</span>}{" "}
          <span className="text-copy-lighter text-xs">{subLabel}</span>
        </label>
      )}

      <div
        className={`w-full min-h-[35px] flex items-center gap-x-1.5 bg-background rounded border border-border px-2 overflow-hidden focus-within:outline-box ${className}`}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <textarea
              type={type}
              className="w-full h-full bg-inherit text-copy max-sm:text-sm placeholder:text-copy-lighter resize-none"
              rows={rows}
              id={tagsTextareaId}
              {...field}
              {...props}
              ref={tagsInputRef}
              onChange={(e) => handleTagsTextareaChange(e, field)}
              required={required}
              placeholder="Enter tags (separated by commas)"
            />
          )}
        />
        {children}
      </div>
    </div>
  );
};

export default TagsInput;
