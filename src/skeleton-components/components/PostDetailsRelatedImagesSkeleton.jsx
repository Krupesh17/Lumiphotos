import React from "react";
import SkeletonElement from "../SkeletonElement";
import MasonryPhotoGridBoxSkeleton from "./MasonryPhotoGridBoxSkeleton";

const PostDetailsRelatedImagesSkeleton = () => {
  return (
    <div className="bg-transparent flex flex-col gap-5 sm:px-2.5 max-w-[1300px] mx-auto py-2.5">
      <SkeletonElement className="w-[200px] h-[30px]" />
      <MasonryPhotoGridBoxSkeleton />
    </div>
  );
};

export default PostDetailsRelatedImagesSkeleton;
