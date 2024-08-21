import React from "react";
import SkeletonElement from "../SkeletonElement";

const PostDetailsInfoBoxSkeleton = () => {
  const tags = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div className="px-2.5">
      <div className="mt-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <SkeletonElement className="w-[35px] h-[35px] rounded-full" />
          <div className="flex flex-col gap-1">
            <SkeletonElement className="w-[150px] h-[16px]" />
            <SkeletonElement className="w-[100px] h-[12px]" />
          </div>
        </div>
        <div className="flex item-center gap-2.5">
          <SkeletonElement className="w-[80px] h-[35px] rounded" />
          <SkeletonElement className="w-[80px] h-[35px] rounded" />
          <SkeletonElement className="w-[80px] h-[35px] rounded" />
        </div>
      </div>

      <div className="flex flex-col gap-2.5 my-5">
        <SkeletonElement className="w-[350px] h-[20px]" />
        <SkeletonElement className="w-[200px] h-[20px]" />
        <SkeletonElement className="w-[280px] h-[20px]" />
        <SkeletonElement className="w-[100px] h-[20px]" />
      </div>

      <ul className="flex items-center gap-2.5 list-none flex-wrap">
        {tags.map((_, index) => (
          <li key={index}>
            <SkeletonElement className="w-[100px] h-[30px] rounded" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetailsInfoBoxSkeleton;
