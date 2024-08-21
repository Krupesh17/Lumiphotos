import React from "react";
import SkeletonElement from "../SkeletonElement";

const PostDetailsImageHolderSkeleton = ({ className }) => {
  return (
    <div className={`px-2.5 ${className}`}>
      <SkeletonElement className="w-full h-[800px]" />
    </div>
  );
};

export default PostDetailsImageHolderSkeleton;
