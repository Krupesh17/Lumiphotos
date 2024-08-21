import React, { useEffect, useLayoutEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/auth-layout/AuthLayout";
import {
  ForgotPassword,
  ResetPassword,
  SignIn,
  SignUp,
} from "./layouts/auth-layout/forms";
import MainLayout from "./layouts/main-layout/MainLayout";
import {
  Account,
  Explore,
  Featured,
  Following,
  PostDetails,
  Profile,
} from "./layouts/main-layout/pages";
import { useDispatch, useSelector } from "react-redux";
import { useGetCurrentUser } from "./react-query/queries";
import { login, logout } from "./redux/features/authSlice";
import { Container, Loader } from "./components/shared";
import { AccountVerification, Error404 } from "./layouts/pages";
import { updateTheme } from "./redux/features/preferenceSlice";
import { SearchedPosts, SearchedUsers } from "./layouts/main-layout/components";

const App = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state?.preference?.theme);

  const [loading, setLoading] = useState(true);

  const { data: authData, isLoading: isAuthDataLoading } = useGetCurrentUser();

  useEffect(() => {
    if (!theme) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
      const selectedTheme = localStorage.getItem("theme");

      dispatch(updateTheme({ selectedTheme }));
    } else {
      document.body.classList.remove(theme === "dark" ? "light" : "dark");
      document.body.classList.add(theme);
    }
  }, [theme, dispatch]);

  useLayoutEffect(() => {
    if (!isAuthDataLoading) {
      if (authData) {
        dispatch(login({ authData }));
      } else {
        dispatch(logout());
      }
      setLoading(false);
    }
  }, [authData, isAuthDataLoading, dispatch]);

  return loading ? (
    <Container className="flex items-center justify-center gap-2.5">
      <Loader />
    </Container>
  ) : (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route index element={<Explore />} />
        <Route path="/following" element={<Following />} />
        <Route path="/search/photos/:searchTerm" element={<SearchedPosts />} />
        <Route path="/search/users/:searchTerm" element={<SearchedUsers />} />
        <Route path="/featured/:topic" element={<Featured />} />
        <Route path="/photo/:postId" element={<PostDetails />} />
        <Route path="/profile/:username/*" element={<Profile />} />
        <Route path="/account/*" element={<Account />} />
      </Route>
      <Route path="/verification" element={<AccountVerification />} />
      <Route path="*" element={<Error404 />} />
      <Route path="/error" element={<Error404 />} />
    </Routes>
  );
};

export default App;
