import React from "react";

const Container = ({ children, className = "", ...props }) => {
  return (
    <section
      className={`relative w-full min-h-[100dvh] bg-background text-copy ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

export default Container;
