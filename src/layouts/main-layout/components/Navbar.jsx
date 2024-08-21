import React from "react";
import { ButtonFilled, LogoBox } from "../../../components/shared";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import ProfileDropdown from "./ProfileDropdown";
import { useDispatch, useSelector } from "react-redux";
import CreatePostModal from "./CreatePostModal";
import { toast } from "react-toastify";
import SearchBar from "./SearchBar";
import { updateIsCreatePostModalOpen } from "../../../redux/features/preferenceSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const accountData = useSelector(
    (state) => state?.auth?.authData?.accountData
  );

  const isCreatePostModalOpen = useSelector(
    (state) => state?.preference?.isCreatePostModalOpen
  );

  const setIsCreatePostModalOpen = (isOpen) => {
    dispatch(updateIsCreatePostModalOpen({ isCreatePostModalOpen: isOpen }));
  };

  return (
    <>
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        setIsOpen={setIsCreatePostModalOpen}
      />

      <nav className="h-[60px] max-w-[1800px] mx-auto flex items-center gap-2.5 bg-inherit text-copy px-2.5">
        <div className="h-full w-full flex items-center gap-2.5">
          <LogoBox />
          <SearchBar />
        </div>
        <div className="h-full flex items-center gap-2.5">
          <ProfileDropdown
            setIsCreatePostModalOpen={setIsCreatePostModalOpen}
          />

          <ButtonFilled
            className="max-md:hidden"
            onClick={() => {
              if (accountData?.emailVerification) {
                setIsCreatePostModalOpen(true);
              } else {
                toast.error(
                  "Verify your account to upload your photos to Lumiphotos."
                );
              }
            }}
          >
            <div className="flex items-center gap-1.5">
              <ArrowUpTrayIcon
                strokeWidth={2.5}
                className="w-4 h-4 text-inherit"
              />
              Upload
            </div>
          </ButtonFilled>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
