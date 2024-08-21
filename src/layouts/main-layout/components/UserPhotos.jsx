import React, { useEffect, useState } from "react";
import { useGetInfinitePostsByUserId } from "../../../react-query/queries";
import { useInView } from "react-intersection-observer";
import { MasonryPhotoGridBoxSkeleton } from "../../../skeleton-components/components";
import PhotosMasonryGrid from "./PhotosMasonryGrid";
import { Loader } from "../../../components/shared";
import EditPostModal from "./EditPostModal";
import { useSelector } from "react-redux";

const UserPhotos = ({ userId }) => {
  const { ref, inView } = useInView();

  const editPostInfo = useSelector((state) => state?.editPost);

  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  const [postToBeEdited, setPostToBeEdited] = useState(null);

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isPending,
  } = useGetInfinitePostsByUserId(userId);

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

  useEffect(() => {
    if (editPostInfo?.post) {
      setPostToBeEdited(editPostInfo?.post);
      setIsEditPostModalOpen(editPostInfo?.modalOpen);
    }
  }, [editPostInfo]);

  return (
    <>
      {postToBeEdited && (
        <EditPostModal
          isOpen={isEditPostModalOpen}
          setIsOpen={setIsEditPostModalOpen}
          post={postToBeEdited}
        />
      )}

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
    </>
  );
};

export default UserPhotos;
