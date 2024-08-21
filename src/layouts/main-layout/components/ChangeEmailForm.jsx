import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateEmailValidation } from "../../../validations";
import {
  ButtonFilled,
  ErrorMessageField,
  Input,
  InputPassword,
} from "../../../components/shared";
import { useUpdateEmail, useUpdateUser } from "../../../react-query/queries";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ChangeEmailForm = () => {
  const userData = useSelector((state) => state?.auth?.authData?.userData);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(UpdateEmailValidation),
    defaultValues: {
      currentEmail: userData?.email || "",
      newEmail: "",
      password: "",
    },
  });

  const { mutateAsync: updateEmail, isPending: isEmailUpdating } =
    useUpdateEmail();
  const { mutateAsync: updateUser, isPending: isUserUpdating } =
    useUpdateUser();

  const handleUpdateEmailForm = async (data) => {
    try {
      if (!data.newEmail || !data.password) {
        throw new Error("Please fill in all fields before submitting.");
      }

      const updatedEmail = await updateEmail({
        email: data?.newEmail,
        password: data?.password,
      });

      if (!updatedEmail) {
        throw new Error("Error occurred while updating new email address.");
      }

      const updatedUserData = await updateUser({
        email: updatedEmail?.email,
        $id: userData?.$id,
      });
      
      if (!updatedUserData) {
        throw Error("Error occurred while updating user's new email address.");
      }

      toast.success("New email address updated successfully.");
    } catch (error) {
      toast.error(
        error.message ||
          "There was an error while updating email. Please try again."
      );
    } finally {
      reset();
    }
  };

  useEffect(() => {
    setValue("currentEmail", userData?.email);
  }, [userData]);

  return (
    <form className="w-full" onSubmit={handleSubmit(handleUpdateEmailForm)}>
      <div className="mb-5">
        <Input
          label="Current Email"
          name="currentEmail"
          type="email"
          control={control}
          autoComplete="on"
          tabIndex={0}
          placeholder="Email"
          disabled={true}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-5">
        <div className="w-full">
          <Input
            label="New Email"
            name="newEmail"
            type="email"
            control={control}
            autoComplete="on"
            tabIndex={0}
            placeholder="Email"
          />
          {errors?.newEmail && (
            <ErrorMessageField className="mt-2">
              {errors?.newEmail?.message}
            </ErrorMessageField>
          )}
        </div>
        <div className="w-full">
          <InputPassword
            label="Password"
            name="password"
            control={control}
            placeholder="Password"
            tabIndex={0}
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
        className={`mb-5 ${
          (isEmailUpdating || isUserUpdating) && "btn-loading"
        }`}
        buttonBlock={true}
      >
        <div
          className={`${
            (isEmailUpdating || isUserUpdating) && "invisible opacity-0"
          }`}
        >
          Update email
        </div>
      </ButtonFilled>
    </form>
  );
};

export default ChangeEmailForm;
