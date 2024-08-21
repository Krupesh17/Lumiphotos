import React from "react";
import {
  AccountOptionBox,
  AccountTopBar,
  ChangeEmailForm,
  ChangePasswordForm,
  ChangeUsernameForm,
  EditProfileForm,
} from "../components";
import { Route, Routes } from "react-router-dom";

const Account = () => {
  return (
    <section className="w-full pt-5 max-sm:pt-2.5">
      <div className="relative max-w-[1200px] mx-auto flex items-start gap-5 px-2.5 max-md:flex-col">
        <div className="bg-background md:sticky md:top-20 w-[250px]">
          <AccountOptionBox />
        </div>
        <div className="w-full">
          <AccountTopBar />
          <Routes>
            <Route index element={<EditProfileForm />} />
            <Route path="/change-email" element={<ChangeEmailForm />} />
            <Route path="/change-username" element={<ChangeUsernameForm />} />
            <Route path="/change-password" element={<ChangePasswordForm />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default Account;
