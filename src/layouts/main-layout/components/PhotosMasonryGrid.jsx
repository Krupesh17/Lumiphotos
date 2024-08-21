import React from "react";
import { MasonryGridBox } from "../../../components/shared";
import PostCard from "./PostCard";

const PhotosMasonryGrid = ({ posts }) => {
  return (
    <MasonryGridBox className="py-2.5">
      {posts?.map((post) => (
        <PostCard key={post?.$id} post={post} />
      ))}
    </MasonryGridBox>
  );
};

export default PhotosMasonryGrid;
