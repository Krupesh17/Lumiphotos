import React, { useLayoutEffect, useState } from "react";
import { Container } from "../../components/shared";
import { useNavigate } from "react-router-dom";
import { useUpdateEmailVerification } from "../../react-query/queries";
import { toast } from "react-toastify";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

const AccountVerification = () => {
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const secret = urlParams.get("secret");

  const [isError, setIsError] = useState(false);

  const {
    mutateAsync: updateEmailVerification,
    isPending: isEmailVerificationUpdating,
  } = useUpdateEmailVerification();

  const verifyEmailAddress = async () => {
    try {
      if (!userId || !secret) {
        navigate("/");
        return;
      }

      const updatedVerification = await updateEmailVerification({
        userId: userId,
        secret: secret,
      });

      if (!updatedVerification)
        throw Error("Error occurred while updating email verification.");

      setIsError(false);
    } catch (error) {
      toast.error(
        error.message ||
          "Something went wrong while updating email verification."
      );

      setIsError(true);
    }
  };

  useLayoutEffect(() => {
    verifyEmailAddress();
  }, [userId, secret, navigate]);

  return (
    <Container className="flex flex-col items-center justify-center">
      {isEmailVerificationUpdating ? (
        <div className="px-5 flex flex-col items-center gap-2">
          <div className="w-7 h-7 mb-2.5 border-2 border-border/40 border-t-copy rounded-full animate-spin"></div>
          <p className="text-center">
            Account verification is currently in progress.
          </p>
        </div>
      ) : (
        <div className="px-5 flex flex-col items-center gap-2">
          {isError ? (
            <>
              <ExclamationCircleIcon
                className="w-8 h-8 text-error"
                strokeWidth={2}
              />
              <h3 className="text-xl font-semibold">
                Verification of the account failed!
              </h3>
              <p className="text-center">
                Your account verification has failed.
                <br />
                Please close this window and try again.
              </p>
            </>
          ) : (
            <>
              <CheckCircleIcon className="w-8 h-8 text-success" strokeWidth={2} />
              <h3 className="text-xl font-semibold">
                Account verified successfully!
              </h3>
              <p className="text-center">
                Congratulations! Your account has been successfully verified.
                <br />
                You may now close this window.
              </p>
            </>
          )}
        </div>
      )}
    </Container>
  );
};

export default AccountVerification;
