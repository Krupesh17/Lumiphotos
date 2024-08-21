import React from "react";
import { ButtonLink } from "../../../../components/shared";

const ProfileInterestList = ({ interests }) => {
  return (
    <div className="text-sm font-normal">
      <p className="mb-2">Interests</p>
      <ul className="list-none flex items-center gap-2.5 flex-wrap">
        {interests?.split(",").map((item, index) => (
          <li key={index} className="flex item-center">
            <ButtonLink
              to={`/search/photos/${item.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {item}
            </ButtonLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileInterestList;
