import React, { useEffect, useLayoutEffect } from "react";
import { Container } from "../../components/shared";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";

const MainLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const authStatus = useSelector((state) => state?.auth?.authStatus);

  useLayoutEffect(() => {
    if (!authStatus) navigate("/sign-in", { replace: true });
  }, [authStatus, navigate]);

  useEffect(() => {
    window.scrollTo(0,0);
  }, [pathname]);

  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
};

export default MainLayout;
