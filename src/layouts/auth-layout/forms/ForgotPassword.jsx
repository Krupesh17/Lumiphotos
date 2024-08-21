import React from "react";
import { FormFooter, FormHeader } from "../components";
import { ButtonFilled, Input } from "../../../components/shared";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordValidation } from "../../../validations";
import { useCreatePasswordRecovery } from "../../../react-query/queries";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(ForgotPasswordValidation),
    defaultValues: {
      email: "",
    },
  });

  const {
    mutateAsync: createPasswordRecovery,
    isPending: isCreatingPasswordRecovery,
  } = useCreatePasswordRecovery();

  const handleForgotPassword = async (data) => {
    try {
      if (!data?.email) {
        throw new Error("Please fill in your email address.");
      }

      const response = await createPasswordRecovery({
        email: data?.email,
        url: "http://localhost:5173/reset-password",
      });

      if (!response)
        throw new Error("Error occurred while creating password recovery.");

      toast.success(
        "Password reset link has been sent to your email. Please check your inbox to reset your password."
      );
      navigate("/sign-in");
    } catch (error) {
      toast.error(
        error.message ||
          "Something went wrong while creating password recovery."
      );
    } finally {
      reset();
    }
  };

  return (
    <form
      className="py-10 px-[50px] basis-[500px] border border-border rounded-md max-sm:border-none max-sm:px-5"
      onSubmit={handleSubmit(handleForgotPassword)}
    >
      <FormHeader
        heading="Forgot password"
        subHeading="Please enter your email to reset your password."
      />

      <div className="mb-5">
        <Input
          label="Email"
          name="email"
          type="email"
          control={control}
          autoComplete="on"
          placeholder="Email"
        />
      </div>

      <ButtonFilled
        type="submit"
        buttonBlock={true}
        className={`mb-2.5 ${isCreatingPasswordRecovery && "btn-loading"}`}
      >
        <div
          className={`${isCreatingPasswordRecovery && "invisible opacity-0"}`}
        >
          Submit
        </div>
      </ButtonFilled>

      <FormFooter
        footerText="Go back to"
        linkTo="/sign-in"
        linkText="Sign in"
      />
    </form>
  );
};

export default ForgotPassword;
