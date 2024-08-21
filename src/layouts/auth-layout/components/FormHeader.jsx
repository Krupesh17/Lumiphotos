import React from "react";
import { LogoBox } from "../../../components/shared";

const FormHeader = ({ heading = "", subHeading = "" }) => {
  return (
    <section className=" mb-[30px]">
      <div className="mb-2.5">
        <LogoBox size={28} className="text-base" />
      </div>

      <h1 className="font-semibold text-3xl mb-2.5">{heading}</h1>
      <p className="text-base text-copy-lighter">{subHeading}</p>
    </section>
  );
};

export default FormHeader;
