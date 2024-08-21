import React, { useEffect, useState } from "react";
import { PushPin, TrendUp } from "@phosphor-icons/react";
import { trendingSearches, trendingTopics } from "../../../constants/index";
import { Link } from "react-router-dom";

const SearchBarDropdownMenu = ({
  dropDownPositionTop,
  setSearchBarDropdown,
}) => {
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    if (
      localStorage.getItem("recentSearches") &&
      localStorage.getItem("recentSearches").length > 0
    ) {
      setRecentSearches(localStorage.getItem("recentSearches").split(","));
    }
  }, []);
  return (
    <div
      className={`absolute max-sm:hidden p-2.5 bg-background border border-border w-full ${dropDownPositionTop} rounded z-10`}
    >
      {recentSearches.length > 0 && (
        <div className="mb-2.5">
          <h5 className="mb-2">Recent Searches</h5>
          <ul className="flex items-center gap-2.5 flex-wrap">
            {recentSearches.map((tag, index) => (
              <li key={index}>
                <Link
                  to={`/search/photos/${tag}`}
                  className="flex items-center gap-2 h-[30px] px-2.5 bg-foreground rounded focus-visible:outline-box"
                  onClick={() => setSearchBarDropdown(false)}
                >
                  {tag.replace(/\-/g, " ")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-2.5">
        <h5 className="mb-2">Trending Searches</h5>
        <ul className="flex items-center gap-2.5 flex-wrap">
          {trendingSearches?.map((tag, index) => (
            <li key={index}>
              <Link
                to={`/search/photos/${tag.slug}`}
                className="flex items-center gap-2 h-[30px] px-2.5 bg-foreground rounded focus-visible:outline-box"
                onClick={() => setSearchBarDropdown(false)}
              >
                <TrendUp size={16} />
                {tag.tagName}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h5 className="mb-2">Trending Topics</h5>
        <ul className="flex items-center gap-2.5 flex-wrap">
          {trendingTopics?.map((tag, index) => (
            <li key={index}>
              <Link
                to={`/search/photos/${tag.slug}`}
                className="flex items-center gap-2 h-[30px] px-2.5 bg-foreground rounded focus-visible:outline-box"
                onClick={() => setSearchBarDropdown(false)}
              >
                <PushPin size={16} />
                {tag.tagName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBarDropdownMenu;
