import { useEffect, useRef, useState } from "react";
import PostCardActionButtonBox from "./PostCardActionButtonBox";
import PostCardPositionedContentBox from "./PostCardPositionedContentBox";
import PostCardUserInfoBox from "./PostCardUserInfoBox";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      tabIndex={0}
      className="relative group focus-visible:outline-box bg-background cursor-zoom-in"
      title={post?.description}
      onClick={() => navigate(`/photo/${post?.$id}`)}
      ref={imgRef}
    >
      <div className="sm:hidden">
        <PostCardUserInfoBox post={post} />
      </div>

      <div
        className={`${
          isImageLoaded
            ? "hidden"
            : "relative after:content-[''] after:absolute after:inset-0 after:bg-black/20 after:backdrop-blur-md"
        }`}
      >
        {isInView && (
          <img
            src={post?.blurImageUrl}
            alt={post?.description}
            title={post?.description}
            className="w-full"
          />
        )}
      </div>
      {isInView && (
        <img
          src={post?.imageUrl}
          alt={post?.description}
          title={post?.description}
          className={`w-full ${isImageLoaded ? "block" : "hidden"}`}
          onLoad={handleImageLoad}
        />
      )}

      <PostCardPositionedContentBox post={post} />

      <div className="sm:hidden">
        <PostCardActionButtonBox post={post} />
      </div>
    </div>
  );
};

export default PostCard;
