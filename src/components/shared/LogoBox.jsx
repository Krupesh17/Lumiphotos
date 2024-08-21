import React from "react";
import { Link } from "react-router-dom";

const LogoBox = ({ size = 35, className = "max-md:hidden text-xl" }) => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5 shrink-0 rounded-md focus-visible:outline-box"
      title="Lumiphotos"
    >
      <img
        src="/assets/icons/lumiphotos_logo.svg"
        alt="lumiphotos"
        className="shrink-0"
        width={size}
        height={size}
      />
      <h1 className={`font-semibold ${className}`}>Lumiphotos</h1>
    </Link>
  );
};

export default LogoBox;
