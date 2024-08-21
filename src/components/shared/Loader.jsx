import React from "react";

const Loader = ({ className }) => {
  return (
    <div
      className={`h-6 w-6 border-2 border-border border-t-copy rounded-full animate-spin ${className}`}
    ></div>
  );
};

export default Loader;
