import React, { useState } from "react";
import { PostDetailsImageHolderSkeleton } from "../../../skeleton-components/components";

const PostDetailsImageHolder = ({ imageUrl, isPostLoading }) => {
  const [isImageLoading, setImageLoading] = useState(true);
  return (
    <>
      <PostDetailsImageHolderSkeleton
        className={isPostLoading || isImageLoading ? "block" : "hidden"}
      />
      <div
        className={`relative bg-inherit overflow-hidden ${
          isPostLoading || isImageLoading ? "hidden" : "block"
        }`}
      >
        <div className="w-full max-h-[800px] bg-inherit flex py-2.5 sm:px-2.5">
          <img
            src={imageUrl}
            className="w-full object-contain"
            onLoad={() => {
              setImageLoading(false);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default PostDetailsImageHolder;
