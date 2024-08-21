import React from "react";
import { MasonryGridBox } from "../../../components/shared";
import UserCard from "./UserCard";

const UsersMasonryGrid = ({ users }) => {
  return (
    <MasonryGridBox className="py-2.5">
      {users?.map((user) => (
        <UserCard key={user?.$id} user={user} />
      ))}
    </MasonryGridBox>
  );
};

export default UsersMasonryGrid;
