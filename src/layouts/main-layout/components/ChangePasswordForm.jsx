import React from "react";
import { useForm } from "react-hook-form";
import {
  ButtonFilled,
  ErrorMessageField,
  InputPassword,
} from "../../../components/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordValidation } from "../../../validations";
import { toast } from "react-toastify";
import { useChangePassword } from "../../../react-query/queries";

const ChangePasswordForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(ChangePasswordValidation),
    defaultValues: {
      oldPassword: "",
      password: "",
    },
  });

  const { mutateAsync: changePassword, isPending: isPasswordUpdating } =
    useChangePassword();

  const handleChangePasswordForm = async (data) => {
    try {
      if (!data?.oldPassword || !data?.password)
        throw new Error("Please fill in all fields before submitting.");

      const response = await changePassword(data);

      if (!response)
        throw new Error(
          "The old password you entered is incorrect. Please try again."
        );

      toast.success("Your password has been changed successfully.");
    } catch (error) {
      toast.error(
        error.message ||
          "There was an error while changing your password. Please try again."
      );
    } finally {
      reset();
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(handleChangePasswordForm)}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
        <div className="w-full">
          <InputPassword
            label="Current Password"
            name="oldPassword"
            control={control}
            placeholder="Current Password"
          />
          {errors?.oldPassword && (
            <ErrorMessageField className="mt-2">
              {errors?.oldPassword?.message}
            </ErrorMessageField>
          )}
        </div>
        <div className="w-full">
          <InputPassword
            label="Password"
            name="password"
            control={control}
            placeholder="Password"
          />
          {errors?.password && (
            <ErrorMessageField className="mt-2">
              {errors?.password?.message}
            </ErrorMessageField>
          )}
        </div>
      </div>

      <ButtonFilled
        type="submit"
        buttonBlock={true}
        className={`${isPasswordUpdating && "btn-primary-loading"}`}
      >
        <div className={`${isPasswordUpdating && "invisible opacity-0"}`}>
          Change Password
        </div>
      </ButtonFilled>
    </form>
  );
};

export default ChangePasswordForm;
