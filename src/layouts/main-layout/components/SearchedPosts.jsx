import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import { useGetInfiniteSearchPostsBySearchTerm } from "../../../react-query/queries";
import { Loader } from "../../../components/shared";
import PhotosMasonryGrid from "./PhotosMasonryGrid";
import { MasonryPhotoGridBoxSkeleton } from "../../../skeleton-components/components";
import NoImageFoundBox from "./NoImageFoundBox";
import { updateSearchCategory } from "../../../redux/features/preferenceSlice";
import { useDispatch } from "react-redux";

const SearchedPosts = () => {
  const { searchTerm } = useParams();
  const { ref, inView } = useInView();
  const dispatch = useDispatch();

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isPending,
  } = useGetInfiniteSearchPostsBySearchTerm(
    searchTerm
      .split("-")
      .map((item) => item.toLowerCase())
      .filter((item) => item.length > 0)
  );

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
  }, [searchTerm]);

  return (
    <section className="bg-transparent sm:px-2.5 max-w-[1300px] mx-auto">
      <div className="my-10">
        <h1 className="text-copy text-5xl px-2.5">
          {searchTerm.replace(/\-/g, " ").charAt(0).toUpperCase() +
            searchTerm.replace(/\-/g, " ").slice(1)}
        </h1>
      </div>

      {isPending ? (
        <MasonryPhotoGridBoxSkeleton />
      ) : posts?.pages[0]?.total <= 0 ? (
        <NoImageFoundBox className="!my-20">
          <p>No search related images were found.</p>
        </NoImageFoundBox>
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

export default SearchedPosts;
