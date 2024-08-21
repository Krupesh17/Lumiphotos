import React from "react";
import PostCardUserInfoBox from "./PostCardUserInfoBox";
import PostCardActionButtonBox from "./PostCardActionButtonBox";

const PostCardPositionedContentBox = ({ post }) => {
  return (
    <div className="hidden absolute inset-0 bg-gradient-to-b text-white from-black/65 via-transparent to-black/65 sm:group-hover:block sm:group-focus-within:block">
      <div className="absolute bottom-0 left-0 right-0">
        <PostCardUserInfoBox post={post} />
        <PostCardActionButtonBox post={post} />
      </div>
    </div>
  );
};

export default PostCardPositionedContentBox;
