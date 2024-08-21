import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Image, Users } from "@phosphor-icons/react";

const SearchOptionBar = () => {
  const { searchTerm } = useParams();
  const { pathname } = useLocation();

  return (
    <div className="h-[60px] max-w-[1800px] mx-auto flex items-center px-2.5">
      <Link
        to={`/search/photos/${searchTerm}`}
        className={`flex items-center gap-2 text-base text-copy-lighter h-[60px] px-2.5 border-b border-transparent hover:text-copy focus-within:text-copy ${
          pathname === `/search/photos/${searchTerm}` &&
          "!text-copy !border-copy"
        }`}
      >
        <Image size={20} weight={"regular"} />
        <span>Photos</span>
      </Link>
      <Link
        to={`/search/users/${searchTerm}`}
        className={`flex items-center gap-2 text-base text-copy-lighter h-[60px] px-2.5 border-b border-transparent hover:text-copy focus-within:text-copy ${
          pathname === `/search/users/${searchTerm}` &&
          "!text-copy !border-copy"
        }`}
      >
        <Users size={20} weight={"regular"} />
        <span>Users</span>
      </Link>
    </div>
  );
};

export default SearchOptionBar;
