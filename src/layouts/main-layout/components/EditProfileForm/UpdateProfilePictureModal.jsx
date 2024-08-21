import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import {
  ButtonFilled,
  ButtonGhost,
  Modal,
} from "../../../../components/shared";
import { CropEasy } from "../../../../components";
import {
  useDeleteFile,
  useGetFilePreview,
  useUpdateUser,
  useUploadFile,
} from "../../../../react-query/queries";
import { toast } from "react-toastify";
import getCroppedImg from "../../../../helpers/cropImage";
import { base64ToFile } from "file64";
import appConfig from "../../../../appwrite/config";
import { getCompressedImageFile } from "../../../../lib/utils";

const UpdateProfilePictureModal = ({
  isOpen,
  setIsOpen,
  profilePictureUrl,
  setProfilePictureUrl,
  removeSelectedFile,
  setIsProfilePictureLoading,
}) => {
  const userData = useSelector((state) => state?.auth?.authData?.userData);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [modalCloseActionBlock, setModalCloseActionBlock] = useState(false);
  const [closeModalTrigger, setCloseModalTrigger] = useState(false);

  const cropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const { mutateAsync: deleteFile, isPending: isFileDeleting } =
    useDeleteFile();
  const { mutateAsync: uploadFile, isPending: isFileUploading } =
    useUploadFile();
  const { mutateAsync: getFilePreview, isPending: isFilePreviewLoading } =
    useGetFilePreview();
  const { mutateAsync: updateUser, isPending: isProfilePictureUploading } =
    useUpdateUser();

  const updateProfilePicture = useCallback(async () => {
    if (
      isFileDeleting ||
      isFileUploading ||
      isFilePreviewLoading ||
      isProfilePictureUploading
    ) {
      return;
    }

    try {
      setModalCloseActionBlock(true);

      const croppedImage = await getCroppedImg(
        profilePictureUrl,
        croppedAreaPixels,
        rotation
      );

      if (!croppedImage)
        throw new Error("An error occurred while cropping the image.");

      const imageFile = await base64ToFile(
        croppedImage,
        `${userData?.username}-${userData?.accountId}.jpg`,
        {
          type: "image/jpg",
        }
      );

      const compressedImage = await getCompressedImageFile(imageFile, 30);

      if (userData?.imageId) {
        await deleteFile({
          bucketId: appConfig.usersStorageId,
          fileId: userData?.imageId,
        });
      }

      const uploadedFileData = await uploadFile({
        bucketId: appConfig.usersStorageId,
        file: compressedImage,
      });

      if (!uploadedFileData)
        throw new Error(
          "An error occurred while updating the new profile picture."
        );

      const imageUrl = await getFilePreview({
        bucketId: appConfig.usersStorageId,
        fileId: uploadedFileData.$id,
      });

      if (!imageUrl)
        throw new Error(
          "An error occurred while attempting to retrieve the profile picture's URL."
        );

      const updatedUserData = updateUser({
        imageUrl: imageUrl,
        imageId: uploadedFileData.$id,
        $id: userData?.$id,
      });

      if (!updatedUserData)
        throw Error(
          "An error occurred while updating the profile picture's URL & ID."
        );

      setIsProfilePictureLoading(true);
    } catch (error) {
      toast.error(
        error.message ||
          "Something went wrong while updating the profile picture."
      );
    } finally {
      handleCloseModal();
    }
  }, [
    croppedAreaPixels,
    rotation,
    zoom,
    isFileDeleting,
    isFileUploading,
    isFilePreviewLoading,
    isProfilePictureUploading,
  ]);

  const handleCloseModal = () => {
    setRotation(0);
    setZoom(1);
    setIsOpen(false);
    setProfilePictureUrl("");
    setModalCloseActionBlock(false);
    setCloseModalTrigger(true);
    removeSelectedFile();
  };

  return (
    <Modal
      title="Change profile picture"
      basis="basis-[800px]"
      isOpen={isOpen}
      setIsOpen={handleCloseModal}
      modalCloseActionBlock={modalCloseActionBlock}
      closeModalTrigger={closeModalTrigger}
      setCloseModalTrigger={setCloseModalTrigger}
    >
      <CropEasy
        image={profilePictureUrl}
        aspect={1 / 1}
        crop={crop}
        zoom={zoom}
        rotation={rotation}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onRotationChange={setRotation}
        onCropComplete={cropComplete}
      />

      <div className="flex items-center justify-end gap-2.5 mb-2.5">
        <ButtonGhost tabIndex={0} onClick={() => handleCloseModal()}>
          Cancel
        </ButtonGhost>
        <ButtonFilled
          tabIndex={0}
          onClick={updateProfilePicture}
          disabled={
            isFileDeleting ||
            isFileUploading ||
            isFilePreviewLoading ||
            isProfilePictureUploading
          }
          className={`${
            (isFileDeleting ||
              isFileUploading ||
              isFilePreviewLoading ||
              isProfilePictureUploading) &&
            "btn-loading"
          }`}
        >
          <div
            className={`${
              (isFileDeleting ||
                isFileUploading ||
                isFilePreviewLoading ||
                isProfilePictureUploading) &&
              "invisible opacity-0"
            }`}
          >
            Change profile picture
          </div>
        </ButtonFilled>
      </div>
    </Modal>
  );
};

export default UpdateProfilePictureModal;
