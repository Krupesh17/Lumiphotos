import React, { useLayoutEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useGetUserByUsername } from "../../../react-query/queries";
import {
  ProfileInfoBox,
  ProfileOptionBar,
  UserPhotos,
  UserSavedPhotos,
} from "../components";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const { data: userData, isLoading: isUserDataLoading } = useGetUserByUsername(
    username.replace(/.*@([^~]+)-.*/, "$1") || ""
  );

  useLayoutEffect(() => {
    if (!isUserDataLoading && !userData) {
      navigate("/error");
    }
  }, [userData, isUserDataLoading]);

  return (
    <section className="relative">
      <ProfileInfoBox
        userData={userData}
        isUserDataLoading={isUserDataLoading}
      />

      <ProfileOptionBar userData={userData} />

      <Routes>
        <Route
          index
          element={<UserPhotos userId={username.replace(/.*-/, "")} />}
        />
        <Route
          path="/saved"
          element={<UserSavedPhotos userId={username.replace(/.*-/, "")} />}
        />
      </Routes>

      <div className="flex flex-col gap-1 justify-center items-center py-10 px-2.5">
        <img
          src="/assets/icons/lumiphotos_logo.svg"
          alt="lumiphotos"
          className="shrink-0"
          width={35}
          height={35}
        />
        <p className="text-copy-lighter">Craft greatness from the ordinary.</p>
      </div>
    </section>
  );
};

export default Profile;
