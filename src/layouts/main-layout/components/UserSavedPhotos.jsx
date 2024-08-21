import React, { useEffect, useState } from "react";
import { useGetInfiniteSavedPostsByUserId } from "../../../react-query/queries";
import { useInView } from "react-intersection-observer";
import { MasonryPhotoGridBoxSkeleton } from "../../../skeleton-components/components";
import { Loader } from "../../../components/shared";
import PhotosMasonryGrid from "./PhotosMasonryGrid";

const UserSavedPhotos = ({ userId }) => {
  const { ref, inView } = useInView();

  const {
    data: data,
    fetchNextPage,
    hasNextPage,
    isPending,
  } = useGetInfiniteSavedPostsByUserId(userId);

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    if (data?.pages) {
      const allFetchedPosts = data.pages.reduce((acc, page) => {
        return [...acc, ...page.documents.map((item) => item.post)];
      }, []);
      setAllPosts(allFetchedPosts);
    }
  }, [data]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <section className="bg-transparent sm:px-2.5 max-w-[1300px] mx-auto py-2.5">
      {isPending ? (
        <MasonryPhotoGridBoxSkeleton />
      ) : (
        <>
          <PhotosMasonryGrid posts={allPosts} />

          {hasNextPage && (
            <div ref={ref} className="flex items-center justify-center p-5">
              <Loader />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default UserSavedPhotos;
