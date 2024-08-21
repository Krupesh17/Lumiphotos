import React from "react";
import PostCardUserInfoBox from "./PostCard/PostCardUserInfoBox";
import PostCardActionButtonBox from "./PostCard/PostCardActionButtonBox";
import {
  CalendarBlank,
  CheckCircle,
  ClosedCaptioning,
  MapPin,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import PostDetailsInfoBoxSkeleton from "../../../skeleton-components/components/PostDetailsInfoBoxSkeleton";

const PostDetailsInfoBox = ({ post, isPostLoading }) => {
  const formatDate = (dateString) => {
    const postDate = new Date(dateString);
    const currentDate = new Date();

    const differenceInMilliseconds = currentDate - postDate;

    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays === 0) {
      return "Today";
    } else if (differenceInDays === 1) {
      return "1 day ago";
    } else if (differenceInDays <= 7) {
      return `${differenceInDays} days ago`;
    } else {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return postDate.toLocaleDateString("en-US", options);
    }
  };

  return (
    <div>
      {isPostLoading ? (
        <PostDetailsInfoBoxSkeleton />
      ) : (
        <>
          <div className="w-full flex max-md:flex-wrap md:gap-2.5 md:items-center max-md:flex-col mb-5 px-2.5">
            <PostCardUserInfoBox
              post={post}
              buttonNamed={true}
              className="!px-0 w-full"
            />
            <PostCardActionButtonBox
              post={post}
              buttonNamed={true}
              className="!px-0"
            />
          </div>

          <div className="flex flex-col gap-2.5 px-2.5 mb-5">
            {post?.location && (
              <div className="flex items-center">
                <Link
                  to={`/search/photos/${post?.location.replace(/,\s*/g, '-').toLowerCase()}`}
                  className="inline-flex items-center gap-2.5 text-sm text-copy-lighter hover:text-copy focus-visible:text-copy focus-visible:outline-box"
                >
                  <MapPin size={20} /> <span>{post?.location}</span>
                </Link>
              </div>
            )}

            {post?.$createdAt && (
              <div className="flex items-center gap-2.5 text-sm text-copy-lighter">
                <CalendarBlank size={20} />
                <span>{`Published on ${formatDate(post?.$createdAt)}`}</span>
              </div>
            )}

            {post?.description && (
              <div className="flex items-center gap-2.5 text-sm text-copy-lighter">
                <ClosedCaptioning size={20} />
                <p>{post?.description}</p>
              </div>
            )}

            <div className="flex items-center gap-2.5 text-sm text-copy-lighter">
              <CheckCircle size={20} />
              <span>Free to use</span>
            </div>
          </div>

          <div className="px-2.5 flex flex-wrap items-center gap-2.5">
            {post?.tags.map((tag, index) => (
              <Link
                to={`/search/${tag.trim()}`}
                key={index}
                className="nav-link bg-foreground hover:bg-border hover:text-copy focus-visible:bg-border focus-visible:text-copy"
              >
                {(tag.charAt(0).toUpperCase() + tag.slice(1)).trim()}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetailsInfoBox;
