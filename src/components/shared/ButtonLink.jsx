import React from "react";
import { Link } from "react-router-dom";

const ButtonLink = ({ children, to = "", props }) => {
  return (
    <Link
      to={to}
      className="bg-foreground h-[30px] px-2 rounded flex items-center text-copy-lighter hover:text-copy hover:bg-border focus-visible:text-copy focus-visible:bg-border focus-visible:outline-box"
      {...props}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
