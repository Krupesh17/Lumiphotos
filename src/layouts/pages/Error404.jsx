import React from "react";
import { ButtonFilled, Container, LogoBox } from "../../components/shared";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <Container className="relative flex items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[.3]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1709929170176-bc35e8bd57b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      ></div>
      <div className="absolute top-5 left-5 flex items-center gap-2.5 z-[1]">
        <LogoBox />
      </div>
      <div className="mx-5 flex items-center justify-center flex-col text-center z-[1]">
        <div
          className="relative text-6xl font-bold mb-4 animate-noise-shift font-mono z-[5] glitch-before glitch-after"
          data-glitch="Page not found"
        >
          Page not found
        </div>
        <p className="mb-4">
          The page you were looking for might have been removed <br />
          had its name changed or is temporarily unavailable.
        </p>
        <ButtonFilled onClick={() => navigate("/")}>
          Back to Lumiphotos
        </ButtonFilled>
      </div>
    </Container>
  );
};

export default Error404;
