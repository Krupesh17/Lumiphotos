import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import UpdateProfilePictureModal from "./UpdateProfilePictureModal";

const ProfilePictureBox = () => {
  const fileInputRef = useRef(null);
  const userData = useSelector((state) => state?.auth?.authData?.userData);

  const [isProfilePictureLoading, setIsProfilePictureLoading] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [isProfilePictureModalOpen, setIsProfilePictureModalOpen] =
    useState(false);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setProfilePictureUrl(URL.createObjectURL(file));
      setIsProfilePictureModalOpen(true);
    }
  };

  const handleLabelKeyDown = (event) => {
    if (event.key === "Enter") {
      fileInputRef.current.click();
    }
  };

  const removeSelectedFile = () => {
    fileInputRef.current.value = "";
  };

  return (
    <>
      <UpdateProfilePictureModal
        isOpen={isProfilePictureModalOpen}
        setIsOpen={setIsProfilePictureModalOpen}
        profilePictureUrl={profilePictureUrl}
        setProfilePictureUrl={setProfilePictureUrl}
        removeSelectedFile={removeSelectedFile}
        setIsProfilePictureLoading={setIsProfilePictureLoading}
      />
      
      <div className="flex items-center flex-col shrink-0 p-2.5 rounded mb-10 bg-pattern">
        <div
          className={`relative bg-foreground w-[150px] h-[150px] shrink-0 rounded-full overflow-hidden border-2 border-border ${
            isProfilePictureLoading &&
            "before:content-[''] before:absolute before:inset-0 before:bg-foreground/40 before:animate-pulse"
          }`}
        >
          <img
            src={userData?.imageUrl}
            alt="Profile picture"
            className="w-full h-full"
            onLoad={() => setIsProfilePictureLoading(false)}
          />
        </div>
        <label
          htmlFor="fileInput"
          className="cursor-pointer text-xs text-copy-lighter underline mt-2.5 rounded-sm hover:text-copy focus-visible:text-copy focus-visible:outline-box"
          tabIndex={0}
          onKeyDown={handleLabelKeyDown}
        >
          Change profile picture
          <input
            type="file"
            accept=".jpeg, .jpg"
            id="fileInput"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileInputChange}
          />
        </label>
      </div>
    </>
  );
};

export default ProfilePictureBox;
