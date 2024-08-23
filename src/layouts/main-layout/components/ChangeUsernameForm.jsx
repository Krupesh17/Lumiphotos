import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { UpdateUsernameValidation } from "../../../validations";
import { AtSymbolIcon } from "@heroicons/react/24/outline";
import {
  ButtonFilled,
  ErrorMessageField,
  Input,
} from "../../../components/shared";
import {
  useIsUsernameTaken,
  useUpdateName,
  useUpdateUser,
} from "../../../react-query/queries";
import { toast } from "react-toastify";

const ChangeUsernameForm = () => {
  const userData = useSelector((state) => state?.auth?.authData?.userData);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(UpdateUsernameValidation),
    defaultValues: {
      currentUsername: userData?.username || "",
      newUsername: "",
    },
  });

  const { mutateAsync: isUsernameTaken, isPending: isUsernamesScanning } =
    useIsUsernameTaken();

  const { mutateAsync: updateName, isPending: isNameUpdating } =
    useUpdateName();

  const { mutateAsync: updateUser, isPending: isUserUpdating } =
    useUpdateUser();

  const handleUpdateUsernameForm = async (data) => {
    try {
      if (!data?.newUsername) {
        throw new Error("Please fill in all fields before submitting.");
      }

      if (data?.newUsername === userData?.username) {
        throw new Error(
          "The username you've entered is already in use by yourself."
        );
      }

      const isUsernameExist = await isUsernameTaken(data?.newUsername);

      if (isUsernameExist) {
        throw new Error(
          "Username already in use. Please choose a different username."
        );
      }

      const updatedName = await updateName(data?.newUsername);

      if (!updatedName) throw new Error();

      const updatedUserData = await updateUser({
        username: updatedName?.name,
        $id: userData?.$id,
      });

      if (!updatedUserData) {
        throw new Error();
      }

      toast.success("New username updated successfully.");
    } catch (error) {
      toast.error(
        error.message ||
          "There was an error while updating username. Please try again."
      );
    } finally {
      reset();
    }
  };

  useEffect(() => {
    setValue("currentUsername", userData?.username);
  }, [userData]);

  return (
    <form className="w-full" onSubmit={handleSubmit(handleUpdateUsernameForm)}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-5">
        <div className="w-full">
          <Input
            label="Current Username"
            name="currentUsername"
            preFixIcon={<AtSymbolIcon className="w-5 h-5" strokeWidth={2} />}
            control={control}
            usernameInput={true}
            autoComplete="on"
            tabIndex={0}
            placeholder="Current Username"
            disabled={true}
          />
        </div>

        <div className="w-full">
          <Input
            label="New Username"
            subLabel="(only letters, numbers, and underscores)"
            name="newUsername"
            preFixIcon={<AtSymbolIcon className="w-5 h-5" strokeWidth={2} />}
            control={control}
            usernameInput={true}
            autoComplete="off"
            tabIndex={0}
            placeholder="New Username"
          />
          {errors?.newUsername && (
            <ErrorMessageField children="mt-2">
              {errors?.newUsername?.message}
            </ErrorMessageField>
          )}
        </div>
      </div>

      <ButtonFilled
        type="submit"
        className={`mb-5 ${
          (isUsernamesScanning || isNameUpdating || isUserUpdating) &&
          "btn-primary-loading"
        }`}
        buttonBlock={true}
      >
        <div
          className={`${
            (isUsernamesScanning || isNameUpdating || isUserUpdating) &&
            "invisible opacity-0"
          }`}
        >
          Update username
        </div>
      </ButtonFilled>
    </form>
  );
};

export default ChangeUsernameForm;
