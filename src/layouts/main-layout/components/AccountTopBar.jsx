import React, { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { ButtonText } from "../../../components/shared";
import { toast } from "react-toastify";
import { useCreateEmailVerification } from "../../../react-query/queries";

const ROUTES = {
  EDIT_ACCOUNT: "/account",
  CHANGE_EMAIL: "/account/change-email",
  CHANGE_USERNAME: "/account/change-username",
  CHANGE_PASSWORD: "/account/change-password",
};

const normalizePathname = (pathname) => pathname.replace(/\/$/, "");

const AccountTopBar = () => {
  const { pathname } = useLocation();
  const [title, setTitle] = useState("");

  const accountData = useSelector(
    (state) => state?.auth?.authData?.accountData
  );

  const {
    mutateAsync: createEmailVerification,
    isPending: isCreatingEmailVerification,
  } = useCreateEmailVerification();

  const handleEmailVerification = async () => {
    try {
      // 🔵 Change this URL at a time of deployment of this project
      const verification = await createEmailVerification(
        "http://localhost:5173/verification"
      );

      if (!verification)
        throw new Error("Error occurred while creating email verification.");

      toast.success(
        "Verification Email Sent! Check your inbox to verify your account."
      );
    } catch (error) {
      toast.error(
        error.message ||
          "Something went wrong while creating email verification."
      );
    }
  };

  useLayoutEffect(() => {
    const normalizedPathname = normalizePathname(pathname);
    if (normalizedPathname === ROUTES.CHANGE_PASSWORD) {
      setTitle("Change password");
    } else if (normalizedPathname === ROUTES.CHANGE_EMAIL) {
      setTitle("Change email");
    } else if (normalizedPathname === ROUTES.CHANGE_USERNAME) {
      setTitle("Change username");
    } else {
      setTitle("Edit profile");
    }
  }, [pathname]);

  return (
    <nav className="min-h-[35px] flex items-center gap-2.5 mb-5 max-sm:flex-col max-sm:items-start">
      <div className="w-full h-full flex items-center gap-2.5">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      {title === "Edit profile" &&
        (!accountData?.emailVerification ? (
          <ButtonText
            className={`!bg-foreground shrink-0 !text-error animate-pulse hover:animate-none focus-visible:animate-none ${
              isCreatingEmailVerification && "btn-loading animate-none"
            }`}
            onClick={handleEmailVerification}
          >
            <div
              className={`flex items-center gap-1.5 ${
                isCreatingEmailVerification && "invisible opacity-0"
              }`}
            >
              <ExclamationCircleIcon className="w-5 h-5" strokeWidth={2} />
              <span>Unverified Account</span>
            </div>
          </ButtonText>
        ) : (
          <div className="text-nowrap flex gap-1.5 items-center shrink-0 text-copy text-sm bg-foreground px-2.5 h-[35px] rounded">
            <CheckCircleIcon className="w-5 h-5 text-success" strokeWidth={2} />
            <span>Verified account</span>
          </div>
        ))}
    </nav>
  );
};

export default AccountTopBar;
