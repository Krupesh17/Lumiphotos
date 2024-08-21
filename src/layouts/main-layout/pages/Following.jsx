import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetInfinitePostsByFollowedUsers } from "../../../react-query/queries";
import { NoImageFoundBox, PhotosMasonryGrid } from "../components";
import { useInView } from "react-intersection-observer";
import { Loader } from "../../../components/shared";
import { FollowingSkeleton } from "../../../skeleton-components/components";

const Following = () => {
  const userData = useSelector((state) => state?.auth?.authData?.userData);
  const { ref, inView } = useInView();

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isPending,
  } = useGetInfinitePostsByFollowedUsers(userData?.following);

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

  return isPending ? (
    <FollowingSkeleton />
  ) : (
    <section className="bg-transparent sm:px-2.5 max-w-[1300px] mx-auto py-2.5">
      <div className="my-10 px-2.5">
        <h1 className="text-copy text-5xl mb-5">Following</h1>
        <p className="text-copy-light text-base">
          Newest photos from the people you follow.
        </p>
      </div>
      {posts ? (
        <>
          <PhotosMasonryGrid posts={allPosts} />

          {hasNextPage && (
            <div ref={ref} className="flex items-center justify-center p-5">
              <Loader />
            </div>
          )}
        </>
      ) : (
        <NoImageFoundBox className="h-full">
          <p>
            No images to display. Follow some photographers and check back soon.
          </p>
        </NoImageFoundBox>
      )}
    </section>
  );
};

export default Following;
