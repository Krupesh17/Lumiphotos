import React, { useState } from "react";
import { InstagramLogo, XLogo } from "@phosphor-icons/react";
import { GlobeAsiaAustraliaIcon } from "@heroicons/react/24/solid";
import { Dropdown } from "../../../../components/shared";
import ProfileActionLink from "./ProfileActionLink";
import { LinkIcon } from "@heroicons/react/24/outline";

const ProfileSocialLinks = ({
  instagramId = "",
  twitterId = "",
  personalWebsiteUrl = "",
  firstName = "",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const nonNullProperties = [
    instagramId
      ? {
          icon: <InstagramLogo size={20} />,
          url: `https://www.instagram.com/${instagramId}`,
          label: "Instagram",
        }
      : null,
    twitterId
      ? {
          icon: <XLogo size={20} />,
          url: `https://twitter.com/${twitterId}`,
          label: "Twitter",
        }
      : null,
    personalWebsiteUrl
      ? {
          icon: <GlobeAsiaAustraliaIcon className="w-5 h-5" />,
          url: personalWebsiteUrl,
          label: personalWebsiteUrl,
        }
      : null,
  ].filter(Boolean); // Filter out null values
  return (
    <div>
      {nonNullProperties.length >= 2 ? (
        <div className="md-2.5">
          <Dropdown
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            dropdownButton={
              <ProfileActionLink className="inline-flex gap-2 mb-2.5 focus-visible:underline focus-visible:text-copy">
                <LinkIcon className="w-5 h-5" />
                <span>Connect with {firstName}</span>
              </ProfileActionLink>
            }
            dropdownPosition="left-0"
            className="!top-8"
          >
            <ul className="list-none min-w-[150px]">
              {nonNullProperties.map((item, index) => (
                <li key={index} className="flex items-center">
                  <ProfileActionLink
                    className="px-2.5 w-full h-[35px] hover:bg-foreground focus-visible:bg-foreground focus-visible:text-copy"
                    to={item?.url}
                    target="_blank"
                  >
                    {item?.icon} <span>{item?.label}</span>
                  </ProfileActionLink>
                </li>
              ))}
            </ul>
          </Dropdown>
        </div>
      ) : nonNullProperties.length === 1 ? (
        <ProfileActionLink
          className="inline-flex mb-4 focus-visible:underline focus-visible:text-copy"
          to={nonNullProperties[0]?.url}
          target="_blank"
        >
          {nonNullProperties[0]?.icon}{" "}
          <span>{nonNullProperties[0]?.label}</span>
        </ProfileActionLink>
      ) : null}
    </div>
  );
};

export default ProfileSocialLinks;
