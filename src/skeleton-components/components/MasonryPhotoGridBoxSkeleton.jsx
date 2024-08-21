import React from "react";
import SkeletonElement from "../SkeletonElement";
import { MasonryGridBox } from "../../components/shared";

const MasonryPhotoGridBoxSkeleton = () => {
  return (
    <MasonryGridBox>
      <SkeletonElement className="h-[650px]" />
      <SkeletonElement className="h-[300px]" />
      <SkeletonElement className="h-[480px]" />
      <SkeletonElement className="h-[250px]" />
      <SkeletonElement className="h-[650px]" />
      <SkeletonElement className="h-[300px]" />
    </MasonryGridBox>
  );
};

export default MasonryPhotoGridBoxSkeleton;
