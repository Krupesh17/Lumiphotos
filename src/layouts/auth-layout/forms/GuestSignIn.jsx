import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSignInAccount } from "../../../react-query/queries";
import authService from "../../../appwrite/authService";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/features/authSlice";
import { Container } from "../../../components/shared";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

const GuestSignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const password = searchParams.get("password");

  const [isError, setIsError] = useState(false);

  const { mutateAsync: signInAccount, isPending: isSignInPending } =
    useSignInAccount();

  const handleGuestSignIn = async (email, password) => {
    try {
      await signInAccount({ email, password });
      const authData = await authService.getCurrentUser();
      dispatch(login({ authData }));
      navigate("/", { replace: true });
    } catch (error) {
      console.error(`Sign in failed: ${error?.message}`);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (email && password) {
      handleGuestSignIn(email, password);
    } else {
      setIsError(true);
      navigate("/sign-in", { replace: true });
    }
  }, [email, password, navigate]);

  return (
    <Container className="flex flex-col items-center justify-center">
      <div className="px-5 flex flex-col items-center gap-2">
        {isSignInPending ? (
          <>
            <div className="w-7 h-7 mb-2.5 border-2 border-border/40 border-t-copy rounded-full animate-spin"></div>
            <p className="text-center">Sign in is currently in progress.</p>
          </>
        ) : isError ? (
          <>
            <ExclamationCircleIcon
              className="w-8 h-8 text-error"
              strokeWidth={2}
            />
            <h3 className="text-xl font-semibold">Sign in failed.</h3>
            <p className="text-center">Guest sign in failed.</p>
          </>
        ) : (
          <>
            <CheckCircleIcon className="w-8 h-8 text-success" strokeWidth={2} />
            <h3 className="text-xl font-semibold">Sign in successfully!</h3>
            <p className="text-center">Guest sign in successful.</p>
          </>
        )}
      </div>
    </Container>
  );
};

export default GuestSignIn;
