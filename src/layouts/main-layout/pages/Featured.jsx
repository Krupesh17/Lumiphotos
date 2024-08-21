import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useLocation, useParams } from "react-router-dom";
import {
  useGetFeaturedTagBySlug,
  useGetInfiniteSearchPostsBySearchTerm,
} from "../../../react-query/queries";
import { BannerBox, PhotosMasonryGrid } from "../components";
import { ButtonFilled, Loader } from "../../../components/shared";
import { MasonryPhotoGridBoxSkeleton } from "../../../skeleton-components/components";
import {
  updateFeaturedTopic,
  updateIsCreatePostModalOpen,
} from "../../../redux/features/preferenceSlice";
import { useDispatch } from "react-redux";

const Featured = () => {
  const { ref, inView } = useInView();
  const { topic } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const keywords = location.state?.keywords;

  const [allPosts, setAllPosts] = useState([]);

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isPending,
  } = useGetInfiniteSearchPostsBySearchTerm(keywords);

  const { data: featuredTagData, isPending: isFeaturedTagDataLoading } =
    useGetFeaturedTagBySlug(topic);

  const setIsCreatePostModalOpen = (isOpen) => {
    dispatch(updateIsCreatePostModalOpen({ isCreatePostModalOpen: isOpen }));
  };

  const setFeaturedTag = (slug) => {
    dispatch(updateFeaturedTopic({ featuredTopic: slug }));
  };

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
    <section>
      <BannerBox
        heading={featuredTagData?.heading}
        subHeading={featuredTagData?.subHeading}
        post={featuredTagData?.post}
        isLoading={isFeaturedTagDataLoading}
      >
        <div className="absolute bottom-0 left-0 right-0 p-2.5">
          <ButtonFilled
            className="mt-4"
            onClick={() => {
              setIsCreatePostModalOpen(true);
              setFeaturedTag(featuredTagData?.slug);
            }}
          >
            Submit to{" "}
            <span className="font-medium">{featuredTagData?.heading}</span>
          </ButtonFilled>
        </div>
      </BannerBox>

      <div className="bg-transparent sm:px-2.5 max-w-[1300px] mx-auto py-2.5">
        {isPending && <MasonryPhotoGridBoxSkeleton />}
        {!isPending && <PhotosMasonryGrid posts={allPosts} />}
        {hasNextPage && (
          <div ref={ref} className="flex items-center justify-center p-5">
            <Loader />
          </div>
        )}
      </div>
    </section>
  );
};

export default Featured;
