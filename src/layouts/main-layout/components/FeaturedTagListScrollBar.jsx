import React from "react";
import { ScrollBox } from "../../../components/shared";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { Compass, UsersThree } from "@phosphor-icons/react";
import { useGetAllFeaturedTags } from "../../../react-query/queries";
import { FeaturedTagListScrollBarSkeleton } from "../../../skeleton-components/components";

const FeaturedTagListScrollBar = () => {
  const { pathname } = useLocation();
  const { topic } = useParams();

  const { data: featuredTagList, isPending: isFeaturedTagListLoading } =
    useGetAllFeaturedTags();

  return (
    <section className="h-[60px] max-w-[1800px] mx-auto flex items-center px-2.5">
      <div className="flex items-center gap-1 border-r border-border pr-2.5">
        <NavLink
          to="/"
          className={`nav-link ${pathname === "/" && "nav-link-active"}`}
        >
          <Compass size={24} className="block sm:hidden" />
          <span className="hidden sm:block">Explore</span>
        </NavLink>
        <NavLink
          to="/following"
          className={`nav-link ${
            pathname === "/following" && "nav-link-active"
          }`}
        >
          <UsersThree size={24} className="block sm:hidden" />
          <span className="hidden sm:block">Following</span>
        </NavLink>
      </div>

      {isFeaturedTagListLoading ? (
        <FeaturedTagListScrollBarSkeleton />
      ) : (
        <ScrollBox>
          {featuredTagList?.map((item, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={`/featured/${item?.slug}`}
                  state={{ keywords: item?.keywords }}
                  className={`nav-link ${
                    topic === item?.slug && "nav-link-active"
                  }`}
                >
                  {item?.tagName}
                </NavLink>
              </li>
            );
          })}
        </ScrollBox>
      )}
    </section>
  );
};

export default FeaturedTagListScrollBar;
