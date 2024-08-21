import React from "react";
import { Link } from "react-router-dom";

const ProfileActionLink = ({ children, className = "", ...props }) => {
  return (
    <Link
      className={`flex items-center gap-1.5 text-sm text-copy-lighter hover:text-copy ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ProfileActionLink;
