import React from "react";
import { ButtonGhost } from "../../../components/shared";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div
      className="p-2.5 sm:border max-sm:border-y border-border sm:rounded focus-visible:outline-box"
      tabIndex={0}
      onClick={() => {
        navigate(`/profile/@${user?.username}-${user?.$id}`);
      }}
    >
      <div className="flex items-center gap-2.5 mb-2.5">
        <img
          className="w-20 h-20 rounded-full border border-border"
          src={user?.imageUrl}
        />
        <div>
          <h3 className="font-medium text-xl">
            {user?.firstName} {user?.lastName}
          </h3>
          <span className="text-sm font-normal text-copy-lighter">
            @{user?.username}
          </span>
        </div>
      </div>

      <div className="mb-2.5 flex items-center gap-2.5">
        {user?.posts?.length < 1 ? (
          <>
            <div className="bg-foreground w-full min-h-[120px] max-sm:min-h-[150px]"></div>
            <div className="bg-foreground w-full min-h-[120px] max-sm:min-h-[150px]"></div>
          </>
        ) : (
          <>
            {user?.posts?.slice(0, 2).map((post, index) => (
              <img
                key={index}
                src={post?.imageUrl}
                alt={post?.description}
                title={post?.description}
                className="bg-foreground w-full max-h-[120px] max-sm:max-h-[150px] overflow-hidden object-cover"
              />
            ))}
          </>
        )}
      </div>

      <ButtonGhost type="button" buttonBlock={true}>
        View profile
      </ButtonGhost>
    </div>
  );
};

export default UserCard;
