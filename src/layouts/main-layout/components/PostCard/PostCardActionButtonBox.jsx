import React, { useEffect, useState } from "react";
import { BookmarkSimple, DownloadSimple, Heart } from "@phosphor-icons/react";
import {
  useDeleteSavedPost,
  useGetFileDownload,
  useLikeUnlikePost,
  useSavePost,
} from "../../../../react-query/queries";
import { toast } from "react-toastify";
import appConfig from "../../../../appwrite/config";
import { ButtonIcon, Loader } from "../../../../components/shared";
import { useSelector } from "react-redux";

const PostCardActionButtonBox = ({
  post,
  buttonNamed = false,
  className = "",
}) => {
  const [likes, setLikes] = useState(post?.likes?.map((user) => user?.$id));
  const [likeCount, setLikeCount] = useState("");
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [isPostSaved, setIsPostSaved] = useState(false);

  const userData = useSelector((state) => state?.auth?.authData?.userData);

  const { mutateAsync: getFileDownload, isPending: isFileDownloadRetrieving } =
    useGetFileDownload();

  const { mutateAsync: likeUnlikePost, isPending: isPostsLikesUpdating } =
    useLikeUnlikePost();

  const { mutateAsync: savePost, isPending: isPostSaving } = useSavePost();

  const { mutateAsync: deleteSavedPost, isPending: isDeletingSavedPost } =
    useDeleteSavedPost();

  const savedPostRecord = userData?.save.find(
    (record) => record?.post?.$id === post?.$id
  );

  const formatLikes = (likes) => {
    if (likes < 1000) {
      return likes.toString();
    } else if (likes < 1000000) {
      return (likes / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    } else {
      return (likes / 1000000).toFixed(2).replace(/\.0+$/, "") + "M";
    }
  };

  const handleImageDownload = async (e) => {
    e.stopPropagation();

    if (isFileDownloadRetrieving) return;

    try {
      if (!post?.imageId) {
        throw new Error("Unable to retrieve image ID. Please try again later.");
      }

      const response = await getFileDownload({
        bucketId: appConfig.postsStorageId,
        fileId: post?.imageId,
      });

      if (!response) {
        throw new Error(
          "Unable to retrieve download link. Please try again later."
        );
      }

      const anchor = document.createElement("a");
      anchor.href = response;
      anchor.click();
    } catch (error) {
      toast.error("Error downloading image: ", error.message);
      console.error("Error downloading image: ", error.message);
    }
  };

  const handleLikeUnlikePost = async (e) => {
    e.stopPropagation();

    if (isPostsLikesUpdating) return;

    let likesArray = [...likes];

    if (likesArray.includes(userData?.$id)) {
      likesArray = likesArray.filter((id) => id !== userData.$id);
    } else {
      likesArray.push(userData.$id);
    }

    setLikes(likesArray);

    await likeUnlikePost({
      postId: post?.$id,
      likesArray: likesArray,
    });
  };

  const handleSavePost = async (e) => {
    e.stopPropagation();

    if (isPostSaving || isDeletingSavedPost) return;

    if (savedPostRecord) {
      setIsPostSaved(false);
      await deleteSavedPost({
        savedPostId: savedPostRecord.$id,
        username: userData?.username,
        userId: userData?.$id,
      });
      toast.success("Saved post deleted successfully.");
    } else {
      await savePost({ userId: userData.$id, postId: post.$id });
      setIsPostSaved(true);
      toast.success("Post saved successfully.");
    }
  };

  useEffect(() => {
    if (likes.includes(userData.$id)) {
      setIsPostLiked(true);
    } else {
      setIsPostLiked(false);
    }
    setLikeCount(formatLikes(likes?.length));
  }, [likes]);

  useEffect(() => {
    setIsPostSaved(!!savedPostRecord);
  }, [userData]);

  return (
    <div
      className={`px-2.5 h-[50px] flex items-center justify-around gap-2.5 ${className}`}
    >
      <ButtonIcon
        className={`${
          buttonNamed && "md:h-[40px] md:border md:border-border md:px-2.5"
        } ${isPostsLikesUpdating && "btn-loading"}`}
        onClick={handleLikeUnlikePost}
        title="Like"
        disabled={isPostsLikesUpdating}
      >
        <div
          className={`flex items-center gap-2.5 ${
            isPostsLikesUpdating && "invisible opacity-0"
          }`}
        >
          <Heart
            size={24}
            weight={isPostLiked ? "fill" : "regular"}
            className={`${
              isPostLiked &&
              "!text-error !hover:text-error/80 !focus-visible:text-error/80"
            }`}
          />
          {buttonNamed && (
            <>
              <span className="hidden md:block">Like</span>
              <span>{likeCount > 0 && likeCount}</span>
            </>
          )}
        </div>
      </ButtonIcon>
      <ButtonIcon
        className={`${
          buttonNamed && "md:h-[40px] md:border md:border-border md:px-2.5"
        } ${(isPostSaving || isDeletingSavedPost) && "btn-loading"}`}
        onClick={handleSavePost}
        title="Save"
        disabled={isPostSaving || isDeletingSavedPost}
      >
        <div
          className={`flex items-center gap-2.5 ${
            (isPostSaving || isDeletingSavedPost) && "invisible opacity-0"
          }`}
        >
          <BookmarkSimple size={24} weight={isPostSaved ? "fill" : "regular"} />
          {buttonNamed && <span className="hidden md:block">Save</span>}
        </div>
      </ButtonIcon>
      <ButtonIcon
        className={`${
          buttonNamed && "md:h-[40px] md:border md:border-border md:px-2.5"
        } ${isFileDownloadRetrieving && "btn-loading"}`}
        onClick={handleImageDownload}
        title="Download"
        disabled={isFileDownloadRetrieving}
      >
        <div
          className={`flex items-center gap-2.5 ${
            isFileDownloadRetrieving && "invisible opacity-0"
          }`}
        >
          <DownloadSimple size={24} />
          {buttonNamed && <span className="hidden md:block">Download</span>}
        </div>
      </ButtonIcon>
    </div>
  );
};

export default PostCardActionButtonBox;
