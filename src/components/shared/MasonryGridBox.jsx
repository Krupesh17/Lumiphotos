import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const MasonryGridBox = ({ children, className = "" }) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 640: 2, 900: 3 }}
      className={className}
    >
      <Masonry gutter="20px">{children}</Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonryGridBox;
