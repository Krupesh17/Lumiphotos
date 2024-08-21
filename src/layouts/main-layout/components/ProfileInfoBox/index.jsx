import React from "react";
import { ProfileInfoBoxSkeleton } from "../../../../skeleton-components/components";
import ProfileActionButtons from "./ProfileActionButtons";
import ProfileActionLink from "./ProfileActionLink";
import ProfileSocialLinks from "./ProfileSocialLinks";
import ProfileInterestList from "./ProfileInterestList";
import { MapPin } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

const ProfileInfoBox = ({ userData, isUserDataLoading }) => {
  const navigate = useNavigate();

  return (
    <section className="bg-inherit py-5 px-5 flex items-center">
      <div className="basis-[800px] min-h-[200px] mx-auto flex gap-5 max-sm:gap-5 max-sm:flex-col">
        {isUserDataLoading ? (
          <ProfileInfoBoxSkeleton />
        ) : (
          <>
            <div className="relative shrink-0">
              <img
                src={userData?.imageUrl}
                alt="profile image"
                className="w-[150px] h-[150px] max-md:w-[120px] max-sm:w-[100px] max-md:h-[120px] max-sm:h-[100px] border-2 border-border rounded-full"
              />
              <div className="hidden max-sm:flex items-center gap-2.5 absolute top-0 right-0">
                <ProfileActionButtons userData={userData} />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <h1 className="text-4xl max-md:text-3xl max-sm:text-2xl font-semibold text-copy">
                  {userData?.firstName} {userData?.lastName}
                </h1>

                <div className="flex items-center gap-2.5 max-sm:hidden">
                  <ProfileActionButtons userData={userData} />
                </div>
              </div>

              <p className="text-sm max-w-[600px] inline-block mb-5">
                {userData?.bio}
              </p>

              {userData?.location && (
                <div
                  className="block"
                  onClick={() =>
                    navigate(
                      `/search/photos/${userData?.location
                        .replace(/,\s*/g, "-")
                        .toLowerCase()}`
                    )
                  }
                >
                  <ProfileActionLink className="inline-flex mb-2.5 focus-visible:underline focus-visible:text-copy">
                    <MapPin size={20} />
                    <span>{userData?.location}</span>
                  </ProfileActionLink>
                </div>
              )}

              <ProfileSocialLinks
                instagramId={userData?.instagramId}
                twitterId={userData?.twitterId}
                personalWebsiteUrl={userData?.personalWebsiteUrl}
                firstName={userData?.firstName}
              />

              {userData?.interests?.length > 0 && (
                <ProfileInterestList interests={userData?.interests} />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProfileInfoBox;
