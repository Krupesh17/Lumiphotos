import React, { useState } from "react";
import { FormHeader } from "../components";
import {
  ButtonFilled,
  ErrorMessageField,
  InputPassword,
} from "../../../components/shared";
import { useForm } from "react-hook-form";
import { useResetPassword } from "../../../react-query/queries";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const ResetPassword = () => {
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const secret = urlParams.get("secret");

  const [passwordResetSuccessful, setPasswordResetSuccessful] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      password: "",
    },
  });

  const { mutateAsync: resetPassword, isPending: isResettingPassword } =
    useResetPassword();

  const handlePasswordReset = async (data) => {
    try {
      if (!data?.password) {
        throw new Error("Please fill your new password.");
      }

      const response = await resetPassword({
        userId: userId,
        secret: secret,
        password: data?.password,
        passwordAgain: data?.password,
      });

      if (!response) {
        throw Error("Error occurred while resetting password.");
      }

      setPasswordResetSuccessful(true);
    } catch (error) {
      toast.error(
        error.message || "Something went wrong while resetting password."
      );
      setPasswordResetSuccessful(false);
    } finally {
      reset();
    }
  };

  return (
    <>
      {passwordResetSuccessful ? (
        <div className="px-5 flex flex-col items-center gap-2">
          <CheckCircleIcon className="w-8 h-8 text-success" strokeWidth={2} />
          <h1 className="text-xl font-semibold">
            Password reset successfully.
          </h1>
          <small className="text-center">You may now close this window.</small>
        </div>
      ) : (
        <form
          className="py-10 px-[50px] basis-[500px] border border-border rounded-md max-sm:border-none max-sm:px-5"
          onSubmit={handleSubmit(handlePasswordReset)}
        >
          <FormHeader
            heading="Reset Password"
            subHeading="Please enter your new password."
          />

          <div className="mb-5">
            <InputPassword
              label="Password"
              name="password"
              control={control}
              placeholder="Password"
            />
            {errors.password && (
              <ErrorMessageField className="mt-2">
                {errors.password.message}
              </ErrorMessageField>
            )}
          </div>

          <ButtonFilled
            type="submit"
            buttonBlock={true}
            className={`${isResettingPassword && "btn-loading"}`}
          >
            <div className={`${isResettingPassword && "invisible opacity-0"}`}>
              Submit
            </div>
          </ButtonFilled>
        </form>
      )}
    </>
  );
};

export default ResetPassword;
