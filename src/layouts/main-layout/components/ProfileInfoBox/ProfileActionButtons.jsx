import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ButtonGhost,
  ButtonText,
  Dropdown,
} from "../../../../components/shared";
import { EllipsisHorizontalIcon, PencilIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { useFollowUnfollow } from "../../../../react-query/queries";

const ProfileActionButtons = ({ userData }) => {
  const { username } = useParams();
  const navigate = useNavigate();

  const currentLoggedUserData = useSelector(
    (state) => state?.auth?.authData?.userData
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { mutateAsync: followUnfollow, isPending: isFollowUpdating } =
    useFollowUnfollow();

  const handleShareProfile = () => {
    const fullProfileUrl = `${window.location.origin}/profile/${username}`;
    navigator.clipboard
      .writeText(fullProfileUrl)
      .then(() => {
        toast.success("Profile URL copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy the URL.");
        console.error("Error copying URL: ", err);
      });
  };

  const handleFollowUnfollow = async () => {
    if (isFollowUpdating) return;

    const following = new Set([...currentLoggedUserData?.following]);

    if (following.has(userData?.$id)) {
      following.delete(userData?.$id);
    } else {
      following.add(userData?.$id);
    }

    await followUnfollow({
      userId: currentLoggedUserData?.$id,
      following: Array.from(following),
    });
  };

  return (
    <>
      {currentLoggedUserData?.accountId === userData?.accountId ? (
        <ButtonGhost title="Edit profile" onClick={() => navigate("/account")}>
          <div className="flex items-center gap-1.5">
            <PencilIcon className="h-4 w-4" />
            <span>Edit profile</span>
          </div>
        </ButtonGhost>
      ) : (
        <div className="flex items-center gap-2.5">
          <Dropdown
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            dropdownButton={
              <ButtonGhost title="More Actions">
                <EllipsisHorizontalIcon className="w-4 h-4" />
              </ButtonGhost>
            }
            dropdownPosition="right-0"
          >
            <ul className="list-none min-w-[150px] overflow-hidden">
              <li>
                <ButtonText
                  buttonBlock={true}
                  outline={false}
                  className={`text-left rounded-none ${
                    isFollowUpdating && "btn-loading"
                  }`}
                  title={`Follow ${userData?.firstName}`}
                  onClick={handleFollowUnfollow}
                  disabled={isFollowUpdating}
                >
                  <div
                    className={`${isFollowUpdating && "invisible opacity-0"}`}
                  >
                    <span>
                      {currentLoggedUserData?.following?.includes(userData?.$id)
                        ? "Unfollow"
                        : "Follow"}
                    </span>{" "}
                    <span>{userData?.firstName}</span>
                  </div>
                </ButtonText>
              </li>
              <li>
                <ButtonText
                  buttonBlock={true}
                  outline={false}
                  className="text-left rounded-none"
                  onClick={handleShareProfile}
                  title="Copy to clipboard."
                >
                  Share profile
                </ButtonText>
              </li>
            </ul>
          </Dropdown>
        </div>
      )}
    </>
  );
};

export default ProfileActionButtons;
