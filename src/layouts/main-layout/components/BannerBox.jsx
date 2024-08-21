import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogoBox } from "../../../components/shared";
import { BannerBoxSkeleton } from "../../../skeleton-components/components";

const BannerBox = ({
  heading = "Heading",
  subHeading = "Sub Heading",
  post,
  isLoading,
  children,
}) => {
  const [isImageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return isLoading ? (
    <BannerBoxSkeleton />
  ) : (
    <section className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 max-w-[1300px] mx-auto mt-5 mb-5 px-2.5">
      <div className="relative max-sm:hidden bg-pattern border border-border rounded p-2.5">
        <LogoBox size={26} className="text-base" />
        <h1 className="text-3xl max-md:text-2xl font-medium mt-4 mb-1.5 text-copy">
          {heading}
        </h1>
        <p className="text-xl max-md:text-lg text-copy-light">{subHeading}</p>
        {children}
      </div>

      <div className="relative w-full h-[300px] rounded overflow-hidden bg-foreground">
        <div
          className={`${
            isImageLoaded
              ? "hidden"
              : "relative after:content-[''] after:absolute after:inset-0 after:bg-black/20 after:backdrop-blur-md"
          }`}
        >
          <img
            src={post?.blurImageUrl}
            alt={post?.description}
            title={post?.description}
            className="object-cover w-full h-full"
          />
        </div>
        <img
          src={post?.imageUrl}
          alt={post?.description}
          title={post?.description}
          className={`object-cover w-full h-full ${
            isImageLoaded ? "block" : "hidden"
          }`}
          onLoad={handleImageLoad}
        />

        <div className="absolute inset-0 backdrop-brightness-75">
          <div className="absolute bottom-0 left-0 right-0 p-2.5">
            <h4 className="font-medium text-xs text-white">Featured</h4>
            <Link
              to={`/profile/@${post?.creator?.username}-${post?.creator?.$id}`}
              className="text-sm text-white hover:text-slate-300 hover:underline focus-visible:text-slate-300 focus-visible:underline"
            >{`${post?.creator?.firstName} ${post?.creator?.lastName}`}</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerBox;
