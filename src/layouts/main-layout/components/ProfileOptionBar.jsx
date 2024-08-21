import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { BookmarkSimple, Image } from "@phosphor-icons/react";

const ProfileOptionBar = ({ userData }) => {
  const { username } = useParams();
  const { pathname } = useLocation();

  return (
    <nav className="bg-background min-h-[60px] border-b border-border flex items-center px-2.5 mb-2.5">
      <div className="flex items-center flex-wrap basis-[1800px] mx-auto">
        <Link
          to={`/profile/${username}`}
          className={`flex items-center gap-2 text-base text-copy-lighter h-[60px] px-2.5 border-b border-transparent hover:text-copy focus-within:text-copy ${
            pathname === `/profile/${username}` && "!text-copy !border-copy"
          }`}
        >
          <Image
            size={20}
            weight={pathname === `/profile/${username}` ? "fill" : "regular"}
          />
          <span>Photos</span>
          <span>{userData?.posts?.length}</span>
        </Link>
        <Link
          to={`/profile/${username}/saved`}
          className={`flex items-center gap-2 text-base text-copy-lighter h-[60px] px-2.5 border-b border-transparent hover:text-copy focus-within:text-copy ${
            pathname === `/profile/${username}/saved` &&
            "!text-copy !border-copy"
          }`}
        >
          <BookmarkSimple
            size={20}
            weight={
              pathname === `/profile/${username}/saved` ? "fill" : "regular"
            }
          />
          <span>Saved</span>
          <span>{userData?.save?.length}</span>
        </Link>
      </div>
    </nav>
  );
};

export default ProfileOptionBar;
