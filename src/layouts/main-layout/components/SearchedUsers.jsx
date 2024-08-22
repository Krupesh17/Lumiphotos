import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetInfiniteUsersBySearchTerm } from "../../../react-query/queries";
import { useDispatch } from "react-redux";
import { updateSearchCategory } from "../../../redux/features/preferenceSlice";
import NoImageFoundBox from "./NoImageFoundBox";
import { MasonryUserCardGridBoxSkeleton } from "../../../skeleton-components/components";
import { useInView } from "react-intersection-observer";
import { Loader } from "../../../components/shared";
import UsersMasonryGrid from "./UsersMasonryGrid";

const SearchedUsers = () => {
  const { searchTerm } = useParams();
  const { ref, inView } = useInView();
  const dispatch = useDispatch();

  const {
    data: users,
    fetchNextPage,
    hasNextPage,
    isPending,
  } = useGetInfiniteUsersBySearchTerm(
    searchTerm
      .split("-")
      .filter((item) => item.length > 0)
      .join(" ")
  );

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (users?.pages) {
      const allFetchedUsers = users.pages.reduce((acc, page) => {
        return [...acc, ...page.documents];
      }, []);
      setAllUsers(allFetchedUsers);
    }
  }, [users]);

  useEffect(() => {
    dispatch(updateSearchCategory({ searchCategory: "users" }));
  }, [searchTerm]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <section className="bg-transparent sm:px-2.5 max-w-[1300px] mx-auto">
      <div className="my-10">
        <h1 className="text-copy text-5xl px-2.5">
          {searchTerm.replace(/\-/g, " ").charAt(0).toUpperCase() +
            searchTerm.replace(/\-/g, " ").slice(1)}
        </h1>
      </div>

      {isPending ? (
        <MasonryUserCardGridBoxSkeleton />
      ) : users?.pages[0]?.total <= 0 ? (
        <NoImageFoundBox className="!my-20">
          <p>No search related users were found.</p>
        </NoImageFoundBox>
      ) : (
        <>
          <UsersMasonryGrid users={allUsers} />

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

export default SearchedUsers;
