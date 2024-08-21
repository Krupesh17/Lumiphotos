import React from "react";
import { useParams } from "react-router-dom";
import { useGetPostById } from "../../../react-query/queries";
import {
  PostDetailsImageHolder,
  PostDetailsInfoBox,
  PostDetailsRelatedImages, 
} from "../components";

const PostDetails = () => {
  const { postId } = useParams();

  const { data: post, isPending: isPostLoading } = useGetPostById(postId);

  return (
    <section className="max-w-[1800px] mx-auto">
      <PostDetailsImageHolder
        imageUrl={post?.imageUrl}
        isPostLoading={isPostLoading}
      />

      <PostDetailsInfoBox post={post} isPostLoading={isPostLoading} />

      {!isPostLoading && <PostDetailsRelatedImages post={post} />}
    </section>
  );
};

export default PostDetails;
