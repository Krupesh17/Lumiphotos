import React from "react";
import {
  ButtonFilled,
  Container,
  Loader,
  LogoBox,
} from "../../components/shared";
import { useNavigate } from "react-router-dom";
import { useGetWebsitePropertyByPropertyName } from "../../react-query/queries";

const Error404 = () => {
  const navigate = useNavigate();

  const { data: errorImageData, isPending: isErrorImageDataPending } =
    useGetWebsitePropertyByPropertyName("ErrorPageImage");

  return isErrorImageDataPending ? (
    <Container className="flex items-center justify-center gap-2.5">
      <Loader />
    </Container>
  ) : (
    <Container className="relative flex items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[.3]"
        style={{
          backgroundImage: `url('${errorImageData?.post?.imageUrl}')`,
        }}
      ></div>
      <div className="absolute top-5 left-5 flex items-center gap-2.5 z-[1]">
        <LogoBox />
      </div>
      <div className="mx-5 flex items-center justify-center flex-col text-center z-[1]">
        <div
          className="relative text-9xl font-bold animate-noise-shift font-mono z-[5] glitch-before glitch-after"
          data-glitch="404"
        >
          404
        </div>
        <h1 className="mb-4 text-2xl font-semibold">Page not found.</h1>
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
