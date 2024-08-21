import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostValidation } from "../../../validations";
import { useForm } from "react-hook-form";
import { ImageFileDropBox } from "../components";
import {
  ButtonFilled,
  ButtonGhost,
  ErrorMessageField,
  Input,
  Textarea,
  Modal,
  TagsInput,
} from "../../../components/shared";
import {
  useCreatePost,
  useDeleteFile,
  useGetFilePreview,
  useUploadFile,
} from "../../../react-query/queries";
import { toast } from "react-toastify";
import {
  getBlurredCompressedImageFile,
  getCompressedImageFile,
  getImageDimensions,
} from "../../../lib/utils";
import appConfig from "../../../appwrite/config";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidV4 } from "uuid";
import { updateFeaturedTopic } from "../../../redux/features/preferenceSlice";

const CreatePostModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.authData.userData);
  const featuredTopic = useSelector((state) => state.preference.featuredTopic);

  const [imageFile, setImageFile] = useState({});
  const [fileUrl, setFileUrl] = useState("");
  const [modalCloseActionBlock, setModalCloseActionBlock] = useState(false);
  const [closeModalTrigger, setCloseModalTrigger] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(CreatePostValidation),
    defaultValues: {
      description: "",
      location: "",
      tags: "",
    },
  });

  const { mutateAsync: uploadFile, isPending: isFileUploading } =
    useUploadFile();
  const { mutateAsync: getFilePreview, isPending: isFilePreviewLoading } =
    useGetFilePreview();
  const { mutateAsync: deleteFile, isPending: isFileDeleting } =
    useDeleteFile();
  const { mutateAsync: createPost, isPending: isPostCreating } =
    useCreatePost();

  const handleCreateNewPostForm = async (data) => {
    try {
      setModalCloseActionBlock(true);

      if (!imageFile) {
        throw new Error(
          "Please select an image you would like to upload to Lumiphotos."
        );
      }

      const newImageFileName = `${userData?.firstName}_${
        userData?.lastName
      }_${uuidV4()}`;

      const renamedImageFile = new File(
        [imageFile],
        `${newImageFileName}.jpg`,
        {
          type: imageFile.type,
        }
      );

      const mainCompressedImageFile = await getCompressedImageFile(
        renamedImageFile,
        50
      );

      const imageDimensions = await getImageDimensions(mainCompressedImageFile);

      const compressedImage = await getBlurredCompressedImageFile(
        mainCompressedImageFile,
        newImageFileName
      );

      const uploadedCompressedImageFile = await uploadFile({
        bucketId: appConfig.postsStorageId,
        file: compressedImage,
      });

      if (!uploadedCompressedImageFile)
        throw new Error(
          "An error occurred while uploading your photo. Please try again later."
        );

      const compressedImageFileUrl = await getFilePreview({
        bucketId: appConfig.postsStorageId,
        fileId: uploadedCompressedImageFile.$id,
      });

      if (!compressedImageFileUrl) {
        await deleteFile({
          bucketId: appConfig.postsStorageId,
          fileId: uploadedCompressedImageFile.$id,
        });
        throw new Error(
          "An error occurred while uploading your photo. Please try again later."
        );
      }

      const uploadedImageFile = await uploadFile({
        bucketId: appConfig.postsStorageId,
        file: mainCompressedImageFile,
      });

      if (!uploadedImageFile)
        throw new Error(
          "An error occurred while uploading your photo. Please try again later."
        );

      const imageFileUrl = await getFilePreview({
        bucketId: appConfig.postsStorageId,
        fileId: uploadedImageFile.$id,
      });

      if (!imageFileUrl) {
        await deleteFile({
          bucketId: appConfig.postsStorageId,
          fileId: uploadedImageFile.$id,
        });
        throw new Error(
          "An error occurred while uploading your photo. Please try again later."
        );
      }

      const newPost = await createPost({
        userId: userData?.$id,
        description: data?.description.trim(),
        imageUrl: imageFileUrl,
        imageId: uploadedImageFile?.$id,
        blurImageUrl: compressedImageFileUrl,
        blurImageId: uploadedCompressedImageFile?.$id,
        imageWidth: imageDimensions?.width,
        imageHeight: imageDimensions?.height,
        location: data?.location.trim(),
        tags:
          data?.tags?.trim().length === 0
            ? []
            : data?.tags
                .split(",")
                .map((item) => item.trim().toLowerCase())
                .filter((item) => item.length > 0),
      });

      if (!newPost) {
        await deleteFile({
          bucketId: appConfig.postsStorageId,
          fileId: uploadedCompressedImageFile.$id,
        });
        await deleteFile({
          bucketId: appConfig.postsStorageId,
          fileId: uploadedImageFile.$id,
        });
        throw new Error(
          "An error occurred while uploading your photo. Please try again later."
        );
      }

      toast.success("Your photo has been successfully uploaded!");
    } catch (error) {
      toast.error(
        error.message || "Oops! Something went wrong. Please try again later."
      );
    } finally {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setImageFile({});
    setFileUrl("");
    setModalCloseActionBlock(false);
    setCloseModalTrigger(true);
    dispatch(updateFeaturedTopic({ featuredTopic: "" }));
    reset();
  };

  useEffect(() => {
    if (featuredTopic.length > 0) {
      setValue("tags", featuredTopic.replace(/\-/g, ", "));
    }
  }, [featuredTopic]);

  return (
    <Modal
      title="Upload to Lumiphotos"
      isOpen={isOpen}
      setIsOpen={handleCloseModal}
      modalCloseActionBlock={modalCloseActionBlock}
      closeModalTrigger={closeModalTrigger}
      setCloseModalTrigger={setCloseModalTrigger}
    >
      <form onSubmit={handleSubmit(handleCreateNewPostForm)}>
        <ImageFileDropBox
          file={imageFile}
          setFile={setImageFile}
          fileUrl={fileUrl}
          setFileUrl={setFileUrl}
        />

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

        <div className="mb-2.5 flex items-center justify-end gap-2.5">
          <ButtonGhost onClick={handleCloseModal}>Cancel</ButtonGhost>
          <ButtonFilled
            type={
              isFileUploading ||
              isFilePreviewLoading ||
              isPostCreating ||
              isFileDeleting
                ? "button"
                : "submit"
            }
            className={`${
              (isFileUploading ||
                isFilePreviewLoading ||
                isPostCreating ||
                isFileDeleting) &&
              "btn-loading"
            }`}
            disabled={
              isFileUploading ||
              isFilePreviewLoading ||
              isPostCreating ||
              isFileDeleting
            }
          >
            <div
              className={`${
                (isFileUploading ||
                  isFilePreviewLoading ||
                  isPostCreating ||
                  isFileDeleting) &&
                "invisible opacity-0"
              }`}
            >
              Upload
            </div>
          </ButtonFilled>
        </div>
      </form>
    </Modal>
  );
};

export default CreatePostModal;
