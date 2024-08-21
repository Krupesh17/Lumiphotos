import React, { useLayoutEffect, useState } from "react";
import { Navbar, FeaturedTagListScrollBar, SearchOptionBar } from "./index";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const [isFeaturedTagListActive, setFeaturedTagListActive] = useState(false);
  const [isSearchOptionBarActive, setIsSearchOptionBarActive] = useState(false);

  useLayoutEffect(() => {
    if (
      pathname === "/" ||
      pathname.startsWith("/featured/") ||
      pathname.startsWith("/following")
    ) {
      setFeaturedTagListActive(true);
      setIsSearchOptionBarActive(false);
    } else if (pathname.startsWith("/search/")) {
      setIsSearchOptionBarActive(true);
      setFeaturedTagListActive(false);
    } else {
      setFeaturedTagListActive(false);
      setIsSearchOptionBarActive(false);
    }
  }, [pathname]);

  return (
    <header className="w-full min-h-[60px] bg-background sticky top-0 left-0 right-0 border-b border-border z-30">
      <Navbar />
      {isFeaturedTagListActive && <FeaturedTagListScrollBar />}
      {isSearchOptionBarActive && <SearchOptionBar />}
    </header>
  );
};

export default Header;
