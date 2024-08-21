import React from "react";
import { ScrollBox } from "../../components/shared";

const FeaturedTagListScrollBarSkeleton = () => {
  const tags = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  return (
    <ScrollBox>
      {tags.map((_, index) => (
        <div key={index} className="h-[16px] w-40 rounded bg-foreground"></div>
      ))}
    </ScrollBox>
  );
};

export default FeaturedTagListScrollBarSkeleton;
