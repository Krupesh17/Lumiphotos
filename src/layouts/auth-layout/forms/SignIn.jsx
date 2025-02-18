import React from "react";
import { FormHeader, FormFooter } from "../components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInValidation } from "../../../validations";
import {
  ButtonFilled,
  ErrorMessageField,
  Input,
  InputPassword,
} from "../../../components/shared";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSignInAccount } from "../../../react-query/queries";
import authService from "../../../appwrite/authService";
import { login } from "../../../redux/features/authSlice";
import { toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: signInAccount, isPending: isSignInPending } =
    useSignInAccount();

  const handleSigInForm = async (data) => {
    try {
      await signInAccount(data);
      const authData = await authService.getCurrentUser();
      dispatch(login({ authData }));
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(`Sign in failed: ${error?.message}`);
    } finally {
      reset();
    }
  };

  return (
    <form
      className="py-10 px-[50px] basis-[500px] border border-border rounded-md max-sm:border-none max-sm:px-5"
      onSubmit={handleSubmit(handleSigInForm)}
    >
      <FormHeader
        heading="Sign In to your account"
        subHeading="Welcome back! Please enter your details."
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
        {errors.email && (
          <ErrorMessageField className="mt-2">
            {errors.email.message}
          </ErrorMessageField>
        )}
      </div>

      <div className="mb-2.5">
        <InputPassword
          label="Password"
          name="password"
          control={control}
          placeholder="Password"
          autoComplete="on"
        />
        {errors.password && (
          <ErrorMessageField className="mt-2">
            {errors.password.message}
          </ErrorMessageField>
        )}
      </div>

      <div className="mb-5 text-right">
        <Link
          to="/forgot-password"
          className="text-sm text-copy-lighter hover:text-copy hover:underline focus-visible:text-copy focus-visible:underline"
        >
          Forgot password?
        </Link>
      </div>

      <ButtonFilled
        type="submit"
        buttonBlock={true}
        className={`mb-2.5 ${isSignInPending && "btn-primary-loading"}`}
      >
        <div className={`${isSignInPending && "invisible opacity-0"}`}>
          Sign in
        </div>
      </ButtonFilled>

      <FormFooter
        footerText="Don’t have an account?"
        linkTo="/sign-up"
        linkText="Sign up"
      />
    </form>
  );
};

export default SignIn;
