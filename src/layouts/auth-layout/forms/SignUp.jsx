import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpValidation } from "../../../validations";
import { FormFooter, FormHeader } from "../components";
import {
  ButtonFilled,
  ErrorMessageField,
  Input,
  InputPassword,
} from "../../../components/shared";
import {
  useCreateAccount,
  useIsUsernameTaken,
  useSignInAccount,
} from "../../../react-query/queries";
import { useNavigate } from "react-router-dom";
import authService from "../../../appwrite/authService";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../../../redux/features/authSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: isUsernameTaken, isPending: isUsernamesScanning } =
    useIsUsernameTaken();
  const { mutateAsync: createAccount, isPending: isCreatingAccount } =
    useCreateAccount();
  const { mutateAsync: signInAccount, isPending: isSignInPending } =
    useSignInAccount();

  const handleSigUpForm = async (data) => {
    try {
      const isUsernameExist = await isUsernameTaken(data?.username);

      if (isUsernameExist)
        throw new Error(
          "Username already in use. Please choose a different username."
        );

      await createAccount(data);

      const session = await signInAccount({
        email: data?.email,
        password: data?.password,
      });

      if (!session) {
        throw new Error(
          "Something went wrong. Please sign in to your new account."
        );
      }

      const authData = await authService.getCurrentUser();

      if (authData) {
        dispatch(login({ authData }));
        reset();
        navigate("/", { replace: true });
      } else {
        throw new Error(
          "Something went wrong. Please sign in to your new account."
        );
      }
    } catch (error) {
      toast.error(
        error.message ||
          "There was an error during the sign up process. Please try again."
      );
      reset();
      navigate("/sign-in", { replace: true });
    }
  };
  return (
    <form
      className="py-10 px-[50px] basis-[500px] border border-border rounded-md max-sm:border-none max-sm:px-5"
      onSubmit={handleSubmit(handleSigUpForm)}
    >
      <FormHeader
        heading="Create a new account"
        subHeading="To use Lumiphotos, Please enter your details."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-5">
        <div>
          <Input
            label="First Name"
            name="firstName"
            control={control}
            toPascalCase={true}
            autoComplete="on"
            placeholder="First Name"
          />
          {errors.firstName && (
            <ErrorMessageField className="mt-2">
              {errors.firstName.message}
            </ErrorMessageField>
          )}
        </div>

        <div>
          <Input
            label="Last Name"
            name="lastName"
            control={control}
            toPascalCase={true}
            autoComplete="on"
            placeholder="Last Name"
          />
          {errors.lastName && (
            <ErrorMessageField className="mt-2">
              {errors.lastName.message}
            </ErrorMessageField>
          )}
        </div>
      </div>

      <div className="mb-5">
        <Input
          label="Username"
          name="username"
          control={control}
          usernameInput={true}
          autoComplete="on"
          placeholder="Username"
        />
        {errors.username && (
          <ErrorMessageField className="mt-2">
            {errors.username.message}
          </ErrorMessageField>
        )}
      </div>

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
        className={`mb-5 ${
          (isUsernamesScanning || isCreatingAccount || isSignInPending) &&
          "btn-primary-loading"
        }`}
      >
        <div
          className={`${
            (isUsernamesScanning || isCreatingAccount || isSignInPending) &&
            "invisible opacity-0"
          }`}
        >
          Sign up
        </div>
      </ButtonFilled>

      <FormFooter
        footerText="Already have an account?"
        linkTo="/sign-in"
        linkText="Sign in"
      />
    </form>
  );
};

export default SignUp;
