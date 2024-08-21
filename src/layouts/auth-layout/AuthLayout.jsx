import React, { useLayoutEffect } from "react";
import { Container } from "../../components/shared";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state?.auth?.authStatus);

  useLayoutEffect(() => {
    if (authStatus) navigate("/", { replace: true });
  }, [authStatus, navigate]);

  return (
    <Container className="flex items-center justify-center max-sm:items-start">
      <Outlet />
    </Container>
  );
};

export default AuthLayout;
