import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const LINKS = [
  { title: "Edit profile", path: "/account" },
  { title: "Change email", path: "/account/change-email" },
  { title: "Change username", path: "/account/change-username" },
  { title: "Change password", path: "/account/change-password" },
];

const AccountOptionBox = () => {
  const { pathname } = useLocation();
  
  return (
    <>
      <h1 className="h-[35px] flex items-center text-lg font-semibold mb-2.5">
        Account settings
      </h1>

      <ul className="list-none flex flex-col gap-2">
        {LINKS.map((link, index) => {
          const isActive = pathname.replace(/\/$/, "") === link.path;
          return (
            <li key={index}>
              <NavLink
                className={`flex items-center h-[35px] px-2.5 text-sm rounded-md text-nowrap hover:underline hover:text-copy focus-visible:underline focus-visible:text-copy focus-visible:outline-box ${
                  isActive ? "text-copy underline" : "text-copy-lighter"
                }`}
                to={link.path}
              >
                {link.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default AccountOptionBox;
