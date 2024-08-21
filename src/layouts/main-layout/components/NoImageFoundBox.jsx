import { SmileySad } from "@phosphor-icons/react";
import React from "react";

const NoImageFoundBox = ({ children, className = "" }) => {
  return (
    <section className={`w-full flex items-center my-10 ${className}`}>
      <div className="p-5 flex flex-col items-center mx-auto text-copy-lighter">
        <SmileySad size={120} weight="thin" />
        {children}
      </div>
    </section>
  );
};

export default NoImageFoundBox;
