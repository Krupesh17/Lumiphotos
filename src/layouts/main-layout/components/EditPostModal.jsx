import React, { useEffect, useState } from "react";
import {
  ButtonFilled,
  ButtonGhost,
  ButtonText,
  ErrorMessageField,
  Input,
  Modal,
  TagsInput,
  Textarea,
} from "../../../components/shared";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePostValidation } from "../../../validations";
import { useDispatch } from "react-redux";
import { removePostToBeEdited } from "../../../redux/features/editPostSlice";
import { Trash } from "@phosphor-icons/react";
import {
  useDeleteFile,
  useDeletePost,
  useUpdatePost,
} from "../../../react-query/queries";
import { toast } from "react-toastify";
import appConfig from "../../../appwrite/config";

const EditPostModal = ({ isOpen, setIsOpen, post }) => {
  const dispatch = useDispatch();

  const [modalCloseActionBlock, setModalCloseActionBlock] = useState(false);
  const [closeModalTrigger, setCloseModalTrigger] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(UpdatePostValidation),
    defaultValues: {
      description: post?.description || "",
      location: post?.location || "",
      tags: post?.tags.join(",") || "",
    },
  });

  const { mutateAsync: updatePost, isPending: isPostInfoUpdating } =
    useUpdatePost();
  const { mutateAsync: deletePost, isPending: isPostDeleting } =
    useDeletePost();
  const { mutateAsync: deleteFile, isPending: isFileDeleting } =
    useDeleteFile();

  const handleUpdatePost = async (data) => {
    if (isPostInfoUpdating) return;

    try {
      const response = await updatePost({
        $id: post?.$id,
        description: data?.description.trim(),
        location: data?.location.trim(),
        tags:
          data?.tags?.trim().length === 0
            ? []
            : data?.tags
                .split(",")
                .map((item) => item.trim().toLowerCase())
                .filter((item) => item.length > 0),
      });

      if (!response)
        throw Error(
          "An error occurred while updating the post's info. Please try again."
        );

      toast.success("The post's info updated successfully.");
    } catch (error) {
      console.error(
        error.message ||
          "An error occurred while updating the post's info. Please try again."
      );
    } finally {
      handleCloseModal();
    }
  };

  const handleDeletePost = async (e) => {
    e.stopPropagation();

    if (isPostDeleting || isFileDeleting) return;

    try {
      const response = await deletePost({
        postId: post?.$id,
        username: post?.creator?.username,
        userId: post?.creator?.$id,
      });

      if (!response)
        throw Error("An error occurred while attempting to delete your post.");

      if (post?.imageId) {
        await deleteFile({
          bucketId: appConfig.postsStorageId,
          fileId: post?.imageId,
        });
      }

      if (post?.blurImageId) {
        await deleteFile({
          bucketId: appConfig.postsStorageId,
          fileId: post?.blurImageId,
        });
      }

      toast.success("The photo has been deleted successfully.");
    } catch (error) {
      console.error(
        error.message ||
          "An error occurred while attempting to delete your post."
      );
    } finally {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    reset();
    dispatch(removePostToBeEdited());
    setIsOpen(false);
    setModalCloseActionBlock(false);
    setCloseModalTrigger(true);
  };

  useEffect(() => {
    reset({
      description: post?.description || "",
      location: post?.location || "",
      tags: post?.tags.join(",") || "",
    });
  }, [post, reset]);

  return (
    <Modal
      title="Edit Post"
      isOpen={isOpen}
      setIsOpen={handleCloseModal}
      modalCloseActionBlock={modalCloseActionBlock}
      closeModalTrigger={closeModalTrigger}
      setCloseModalTrigger={setCloseModalTrigger}
    >
      <form onSubmit={handleSubmit(handleUpdatePost)}>
        <div className="w-full mb-5">
          <Input
            label="Location"
            name="location"
            control={control}
            placeholder="Add a location"
          />
          {errors?.location && (
            <ErrorMessageField className="mt-2">
              {errors?.location?.message}
            </ErrorMessageField>
          )}
        </div>

        <div className="w-full mb-5">
          <TagsInput
            label="Tags"
            control={control}
            name="tags"
            required={true}
          />
          {errors?.tags && (
            <ErrorMessageField className="mt-2">
              {errors?.tags?.message}
            </ErrorMessageField>
          )}
        </div>

        <div className="w-full mb-5">
          <Textarea
            label="Description"
            name="description"
            control={control}
            maxLength={600}
            placeholder="Add a description (Optional)"
          />
          {errors?.description && (
            <ErrorMessageField className="mt-2">
              {errors?.description?.message}
            </ErrorMessageField>
          )}
        </div>

        <div className="mb-2.5 flex items-center justify-between gap-2.5">
          <ButtonText
            className={`flex items-center hover:text-error focus-visible:text-error ${
              (isPostDeleting || isFileDeleting) && "btn-loading"
            }`}
            onClick={handleDeletePost}
            title="Delete Post"
            disabled={isPostDeleting || isFileDeleting}
          >
            <Trash
              size={24}
              className={`${
                (isPostDeleting || isFileDeleting) && "invisible opacity-0"
              }`}
            />
          </ButtonText>
          <div className="mb-2.5 flex items-center gap-2.5">
            <ButtonGhost onClick={handleCloseModal} title="Cancel">
              Cancel
            </ButtonGhost>
            <ButtonFilled
              type="submit"
              title="Update info"
              className={`${isPostInfoUpdating && "btn-loading"}`}
              disabled={isPostInfoUpdating}
            >
              <span
                className={`${isPostInfoUpdating && "invisible opacity-0"}`}
              >
                Update info
              </span>
            </ButtonFilled>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditPostModal;
