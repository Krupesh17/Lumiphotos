import React from "react";
import SkeletonElement from "../SkeletonElement";
import MasonryPhotoGridBoxSkeleton from "./MasonryPhotoGridBoxSkeleton";

const FollowingSkeleton = () => {
  return (
    <div className="bg-transparent sm:px-2.5 max-w-[1300px] mx-auto">
      <div className=" my-10">
        <SkeletonElement className="w-[200px] h-[50px] mb-5" />
        <SkeletonElement className="w-[350px] h-[20px]" />
      </div>
      <MasonryPhotoGridBoxSkeleton />
    </div>
  );
};

export default FollowingSkeleton;
