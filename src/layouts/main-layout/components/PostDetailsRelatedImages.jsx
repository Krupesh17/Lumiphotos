import React, { useEffect, useState } from "react";
import { useGetInfinitePostRelatedPosts } from "../../../react-query/queries";
import { useInView } from "react-intersection-observer";
import { Loader } from "../../../components/shared";
import { PostDetailsRelatedImagesSkeleton } from "../../../skeleton-components/components";
import PhotosMasonryGrid from "./PhotosMasonryGrid";
import NoImageFoundBox from "./NoImageFoundBox";

const PostDetailsRelatedImages = ({ post }) => {
  const { ref, inView } = useInView();
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isPending,
  } = useGetInfinitePostRelatedPosts(post?.tags, post?.$id);

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    if (posts?.pages) {
      const allFetchedPosts = posts.pages.reduce((acc, page) => {
        return [...acc, ...page.documents];
      }, []);
      setAllPosts(allFetchedPosts);
    }
  }, [posts]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="bg-transparent sm:px-2.5 max-w-[1300px] mx-auto py-2.5 mt-5">
      {isPending ? (
        <PostDetailsRelatedImagesSkeleton />
      ) : posts?.pages[0]?.total <= 0 ? (
        <NoImageFoundBox>
          <p>No related images were found.</p>
        </NoImageFoundBox>
      ) : (
        <>
          <h1 className="text-copy text-2xl mb-2.5 px-2.5">Related images</h1>

          <PhotosMasonryGrid posts={allPosts} />

          {hasNextPage && (
            <div ref={ref} className="flex items-center justify-center p-5">
              <Loader />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostDetailsRelatedImages;
