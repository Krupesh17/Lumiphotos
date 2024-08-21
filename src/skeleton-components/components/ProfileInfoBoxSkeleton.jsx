import React from "react";
import SkeletonElement from "../SkeletonElement";

const ProfileInfoBoxSkeleton = () => {
  const interests = [1, 2, 3, 4, 5];

  return (
    <>
      <div className="relative shrink-0">
        <SkeletonElement className="w-[150px] max-md:w-[120px] max-sm:w-[100px] h-[150px] max-md:h-[120px] max-sm:h-[100px] rounded-full" />
        <div className="hidden max-sm:flex items-center gap-2.5 absolute top-0 right-0">
          <SkeletonElement className="skeleton-btn" />
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center gap-2.5 mb-3">
          <SkeletonElement className="w-3/5 h-9 max-sm:h-7 rounded" />
          <SkeletonElement className="skeleton-btn max-sm:hidden" />
        </div>

        <div className="mb-4">
          <SkeletonElement className="h-4 rounded mb-2" />
          <SkeletonElement className="w-3/5 h-4 rounded" />
        </div>

        <SkeletonElement className="w-1/4 h-5 rounded mb-4" />
        <SkeletonElement className="w-1/4 h-5 rounded mb-4" />

        <SkeletonElement className="w-20 h-4 rounded mb-2" />
        <ul className="list-none flex items-center gap-2.5 flex-wrap">
          {interests.map((_, index) => (
            <li key={index}>
              <SkeletonElement className="h-7 w-20 rounded" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProfileInfoBoxSkeleton;
