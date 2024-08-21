import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import ButtonRounded from "./ButtonRounded";

const ScrollBox = ({ children }) => {
  const wrapperRef = useRef();
  const tabListRef = useRef();
  const [isArrowsActive, setIsArrowsActive] = useState(false);
  const [isLeftArrowVisible, setLeftArrowVisible] = useState(false);
  const [isRightArrowVisible, setRightArrowVisible] = useState(true);

  const handleArrowButtonVisibility = useCallback((scrollValue) => {
    let maxScrollableWidth =
      tabListRef.current.scrollWidth - tabListRef.current.clientWidth;
    setLeftArrowVisible(scrollValue > 0);
    setRightArrowVisible(maxScrollableWidth - scrollValue > 1);
  }, []);

  const handleArrowButtonClick = useCallback(
    (buttonName) => {
      let scrollWidth = (tabListRef.current.scrollLeft +=
        buttonName === "left" ? -240 : 240);
      handleArrowButtonVisibility(scrollWidth);
    },
    [handleArrowButtonVisibility]
  );

  const handleTagsBarArrowButton = useCallback(() => {
    if (tabListRef.current.clientWidth >= wrapperRef.current.clientWidth) {
      setIsArrowsActive(true);
      return;
    }
    setIsArrowsActive(false);
  }, []);

  useEffect(() => {
    handleTagsBarArrowButton();
    window.addEventListener("resize", handleTagsBarArrowButton);
    return () => {
      window.removeEventListener("resize", handleTagsBarArrowButton);
    };
  }, [handleTagsBarArrowButton]);

  return (
    <div
      className="relative w-full h-[60px] flex items-center overflow-hidden"
      ref={wrapperRef}
    >
      {isArrowsActive && (
        <div
          className={`scrollBar-arrow-button-box-left ${
            isLeftArrowVisible ? "flex" : "hidden"
          } `}
        >
          <ButtonRounded
            border={false}
            className="!h-[30px] !w-[30px] flex items-center justify-center !bg-background ml-5"
            onClick={() => handleArrowButtonClick("left")}
          >
            <ChevronLeftIcon
              strokeWidth={2.5}
              className="w-4 h-4 text-inherit"
            />
          </ButtonRounded>
        </div>
      )}
      <ul
        className="h-full flex items-center gap-1 px-2.5 list-none overflow-y-hidden overflow-x-auto scroll-smooth scrollbar-hide"
        ref={tabListRef}
      >
        {children}
      </ul>
      {isArrowsActive && (
        <div
          className={`scrollBar-arrow-button-box-right ${
            !isRightArrowVisible && "!hidden"
          }`}
        >
          <ButtonRounded
            border={false}
            className="!h-[30px] !w-[30px] flex items-center justify-center !bg-background mr-5"
            onClick={() => handleArrowButtonClick("right")}
          >
            <ChevronRightIcon
              strokeWidth={2.5}
              className="w-4 h-4 text-inherit"
            />
          </ButtonRounded>
        </div>
      )}
    </div>
  );
};

export default ScrollBox;
