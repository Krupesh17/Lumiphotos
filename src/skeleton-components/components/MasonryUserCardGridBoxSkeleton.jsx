import React from "react";
import { MasonryGridBox } from "../../components/shared";
import SkeletonElement from "../SkeletonElement";

const MasonryUserCardGridBoxSkeleton = () => {
  return (
    <MasonryGridBox>
      <SkeletonElement className="h-[275px] max-sm:h-[305px] rounded" />
      <SkeletonElement className="h-[275px] max-sm:h-[305px] rounded" />
      <SkeletonElement className="h-[275px] max-sm:h-[305px] rounded" />
      <SkeletonElement className="h-[275px] max-sm:h-[305px] rounded" />
      <SkeletonElement className="h-[275px] max-sm:h-[305px] rounded" />
      <SkeletonElement className="h-[275px] max-sm:h-[305px] rounded" />
    </MasonryGridBox>
  );
};

export default MasonryUserCardGridBoxSkeleton;
