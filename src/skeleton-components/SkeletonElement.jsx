import React from "react";

const SkeletonElement = ({ className }) => {
  return (
    <div
      className={`bg-foreground overflow-hidden animate-pulse ${className}`}
    ></div>
  );
};

export default SkeletonElement;
