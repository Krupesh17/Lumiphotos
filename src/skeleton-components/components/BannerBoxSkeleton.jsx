import React from "react";
import SkeletonElement from "../SkeletonElement";

const BannerBoxSkeleton = () => {
  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 max-w-[1300px] mx-auto mt-5 mb-5 bg-pattern">
      <div className="relative p-2.5 h-[300px] overflow-hidden max-sm:hidden">
        <SkeletonElement className="w-32 h-8 mb-2.5 rounded" />
        <SkeletonElement className="w-full h-10 mb-2.5 rounded" />
        <SkeletonElement className="max-w-96 h-6 mb-2.5 rounded" />
        <SkeletonElement className="max-w-96 h-6 mb-2.5 rounded" />
        <SkeletonElement className="max-w-40 h-8 mb-2.5 rounded" />
        <div className="absolute bottom-0 left-0 right-0 p-2.5">
          <SkeletonElement className="max-w-28 h-3 mb-2.5 rounded" />
          <SkeletonElement className="max-w-80 h-4 mb-2.5 rounded" />
        </div>
      </div>
      <div className="h-[300px] overflow-hidden">
        <SkeletonElement className="w-full h-full sm:rounded" />
      </div>
    </section>
  );
};

export default BannerBoxSkeleton;
