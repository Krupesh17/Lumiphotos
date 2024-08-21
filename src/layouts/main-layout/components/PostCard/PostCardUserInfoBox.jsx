import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ButtonIcon } from "../../../../components/shared";
import { useDispatch, useSelector } from "react-redux";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { addPostToBeEdited } from "../../../../redux/features/editPostSlice";

const PostCardUserInfoBox = ({ post, buttonNamed = false, className = "" }) => {
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const [isActionButtonsActive, setIsActionButtonsActive] = useState(false);

  const userData = useSelector((state) => state?.auth?.authData?.userData);

  const handleEditPost = (e) => {
    e.stopPropagation();
    dispatch(addPostToBeEdited({ post }));
  };

  useEffect(() => {
    if (pathname === `/profile/@${userData?.username}-${userData?.$id}`) {
      setIsActionButtonsActive(true);
    } else {
      setIsActionButtonsActive(false);
    }
  }, [pathname]);

  return (
    <div
      className={`px-2.5 h-[50px] flex items-center justify-between gap-2.5 ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <img
          src={post?.creator?.imageUrl}
          alt={`Profile picture of ${post?.creator?.firstName} ${post?.creator?.lastName}`}
          className="bg-foreground w-[35px] h-[35px] rounded-full"
          title={`Profile picture of ${post?.creator?.firstName} ${post?.creator?.lastName}`}
        />

        <Link
          className="flex flex-col focus-visible:outline-box rounded"
          to={`/profile/@${post?.creator?.username}-${post?.creator?.$id}`}
          onClick={(e) => e.stopPropagation()}
        >
          <p
            className="text-base font-medium text-nowrap"
            title={`${post?.creator?.firstName} ${post?.creator?.lastName}`}
          >{`${post?.creator?.firstName} ${post?.creator?.lastName}`}</p>
          <small
            className="text-xs"
            title={`@${post?.creator?.username}`}
          >{`@${post?.creator?.username}`}</small>
        </Link>
      </div>

      {userData?.$id === post?.creator?.$id && isActionButtonsActive && (
        <div className="flex items-center gap-2.5">
          <ButtonIcon
            className={`${
              buttonNamed && "md:h-[40px] md:border md:border-border md:px-2.5"
            }`}
            title="Edit"
            onClick={handleEditPost}
          >
            <div className={`flex items-center gap-2.5`}>
              <PencilSquareIcon className="w-6 h-6" />
              {buttonNamed && <span className="hidden md:block">Edit</span>}
            </div>
          </ButtonIcon>
        </div>
      )}
    </div>
  );
};

export default PostCardUserInfoBox;
