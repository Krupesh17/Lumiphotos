import React, { useEffect, useState } from "react";
import PhotosMasonryGrid from "../components/PhotosMasonryGrid";
import { useInView } from "react-intersection-observer";
import {
  useGetFeaturedTagBySlug,
  useGetInfinitePosts,
} from "../../../react-query/queries";
import { Loader } from "../../../components/shared";
import { MasonryPhotoGridBoxSkeleton } from "../../../skeleton-components/components";
import { BannerBox } from "../components";
import { useDispatch } from "react-redux";
import { updateSearchCategory } from "../../../redux/features/preferenceSlice";
import { trendingSearches } from "../../../constants";
import { Link } from "react-router-dom";

const Explore = () => {
  const { ref, inView } = useInView();
  const dispatch = useDispatch();

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isPending,
  } = useGetInfinitePosts();

  const { data: featuredTagData, isPending: isFeaturedTagDataLoading } =
    useGetFeaturedTagBySlug("explore");

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
    dispatch(updateSearchCategory({ searchCategory: "photos" }));
  }, []);

  return (
    <section>
      <BannerBox
        heading={featuredTagData?.heading}
        subHeading={featuredTagData?.subHeading}
        post={featuredTagData?.post}
        isLoading={isFeaturedTagDataLoading}
      >
        <div className="absolute bottom-0 left-0 right-0 p-2.5">
          <h5 className="text-xs font-medium">Tending Searches</h5>
          <ul className="flex items-center gap-x-2 gap-y-0 flex-wrap">
            {trendingSearches?.map((tag, index) => (
              <li key={index}>
                <Link
                  to={`/search/photos/${tag.slug}`}
                  className="text-copy-lighter text-sm hover:text-copy hover:underline focus-within:text-copy focus-visible:underline"
                >
                  {tag.tagName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </BannerBox>

      <div className="bg-transparent sm:px-2.5 max-w-[1300px] mx-auto">
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

export default Explore;
