import React from "react";
import { Link } from "react-router-dom";

const FormFooter = ({ footerText = "", linkTo = "", linkText = "" }) => {
  return (
    <div className="text-copy-lighter text-center text-sm">
      {footerText}{" "}
      <Link
        to={linkTo}
        className="text-copy font-medium hover:underline focus:underline"
      >
        {linkText}
      </Link>
    </div>
  );
};

export default FormFooter;
