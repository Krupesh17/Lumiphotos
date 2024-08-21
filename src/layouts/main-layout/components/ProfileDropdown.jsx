import React, { useLayoutEffect, useState } from "react";
import {
  ButtonFilled,
  ButtonRounded,
  ButtonText,
  Dropdown,
  ToggleSwitch,
} from "../../../components/shared";
import {
  ArrowUpTrayIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useSignOutAccount } from "../../../react-query/queries";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/features/authSlice";
import { updateTheme } from "../../../redux/features/preferenceSlice";

const ProfileDropdown = ({ setIsCreatePostModalOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authData = useSelector((state) => state.auth.authData);
  const theme = useSelector((state) => state?.preference?.theme);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOn, setIsOn] = useState(false);

  const { mutateAsync: signOutAccount, isPending: isSignOutPending } =
    useSignOutAccount();

  const handleSignOut = async () => {
    await signOutAccount();
    dispatch(logout());
  };

  const handleThemeToggleSwitch = () => {
    if (isOn) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
    const selectedTheme = localStorage.getItem("theme");
    dispatch(updateTheme({ selectedTheme }));
  };

  useLayoutEffect(() => {
    setIsOn(theme === "dark" ? true : false);
  }, [theme]);

  return (
    <Dropdown
      isDropdownOpen={isDropdownOpen}
      setIsDropdownOpen={setIsDropdownOpen}
      dropdownButton={
        <ButtonRounded
          title="Your personal menu button"
          className={`${
            !authData?.accountData?.emailVerification && "notification-dot"
          }`}
        >
          <img
            src={authData?.userData?.imageUrl}
            alt="Profile"
            className="w-full h-full rounded-full"
          />
        </ButtonRounded>
      }
      dropdownPosition="right-0"
      className="z-10"
    >
      <ul className="list-none min-w-[250px] mb-2 overflow-hidden">
        <li>
          <ButtonText
            buttonBlock={true}
            outline={false}
            className="text-left rounded-none"
            onClick={() => {
              navigate(
                `/profile/@${authData?.userData?.username}-${authData?.userData?.$id}`
              );
              setIsDropdownOpen(false);
            }}
          >
            View profile
          </ButtonText>
        </li>
        <li>
          <ButtonText
            buttonBlock={true}
            outline={false}
            className="text-left rounded-none flex items-center justify-between"
            onClick={() => {
              navigate("/account");
              setIsDropdownOpen(false);
            }}
          >
            <div>Account settings</div>
            {!authData?.accountData?.emailVerification && (
              <div title="Unverified Account">
                <ExclamationCircleIcon
                  className="w-5 h-5 text-error"
                  strokeWidth={2.5}
                />
              </div>
            )}
          </ButtonText>
        </li>
        <li>
          <div className="h-[35px] text-sm text-copy-lighter px-2.5 flex items-center justify-between">
            <span>Dark mode</span>
            <ToggleSwitch
              isOn={isOn}
              setIsOn={setIsOn}
              onClick={handleThemeToggleSwitch}
            />
          </div>
        </li>
      </ul>

      <div className="p-2.5 pt-0 hidden max-md:block">
        <ButtonFilled
          buttonBlock={true}
          className="text-left"
          onClick={() => setIsCreatePostModalOpen(true)}
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

      <div className="border-t border-border pt-2.5">
        <ButtonText
          buttonBlock={true}
          outline={false}
          className={`text-left rounded-none ${
            isSignOutPending && "btn-loading"
          }`}
          onClick={handleSignOut}
        >
          <div
            className={`flex items-center gap-1.5 ${
              isSignOutPending && "invisible opacity-0"
            }`}
          >
            <span>{`Sign out @${authData?.userData?.username}`}</span>
          </div>
        </ButtonText>
      </div>
    </Dropdown>
  );
};

export default ProfileDropdown;
