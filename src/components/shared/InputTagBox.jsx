// File: InputTagBox.jsx
import React, { forwardRef, useId, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const InputTagBox = forwardRef(
  (
    {
      label,
      subLabel,
      className = "",
      setValue,
      tags,
      name = "",
      length = 5,
      placeholder = "",
      ...props
    },
    ref
  ) => {
    const inputId = useId();
    const [tag, setTag] = useState("");

    const handleTagInsert = (e) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        e.stopPropagation(); // Stop event bubbling
        if (tag.trim() !== "" && name) {
          setValue(name, [...tags, tag].join(","));
          setTag("");
          ref?.current?.focus();
        }
      }
    };

    const handleTagRemoval = (tagToBeDeleted) => {
      const updatedTags = tags.filter((tag) => tag !== tagToBeDeleted);
      if (name) {
        setValue(name, updatedTags.join(","));
      }
    };

    return (
      <div>
        {label && (
          <label
            htmlFor={inputId}
            className="inline-block font-base mb-1 text-copy"
          >
            {label}{" "}
            <span className="text-copy-lighter text-xs">{subLabel}</span>
          </label>
        )}
        <div
          className={`w-full min-h-[35px] flex items-center gap-2 flex-wrap rounded ${
            tags.length ? "p-2" : "px-2"
          } border border-border overflow-hidden focus-within:outline-box ${className}`}
        >
          {tags.length !== 0 &&
            tags.map((tag, index) => (
              <div
                key={index}
                className="bg-border h-[30px] px-1 flex items-center gap-1.5 rounded"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  className="p-1 rounded text-copy-lighter hover:bg-foreground hover:text-copy focus-visible:bg-foreground focus-visible:text-copy focus-visible:outline-box"
                  onClick={() => handleTagRemoval(tag)}
                >
                  <XMarkIcon className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            ))}

          {tags.length < length && (
            <input
              type="text"
              className="h-[30px] flex-1 bg-inherit placeholder:text-copy-lighter"
              id={inputId}
              ref={ref}
              placeholder={placeholder}
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onKeyDown={handleTagInsert}
              {...props}
            />
          )}
        </div>
      </div>
    );
  }
);

export default InputTagBox;
