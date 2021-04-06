import React from "react";
import User from "../components/User";
import { useUserStore } from "../store/userStore";
import { removeSavedUser } from "../services/user-service";

const UserHomePage = () => {
  const { user, setUser, removeUser } = useUserStore((state) => state);
  //   const userDetail. In future, fetch userDetail from protected route,
  //    then add a new state userDetail, then show it on user homepage

  return (
    <div>
      {/* {isloading ? (
        <div>...loading</div>
      ) : (
        <User
          username={user.username}
          firstName={user.firstName}
          lastname={user.lastname}
          email={user.email}
          description={user.description}
          createdAt={user.createdAt}
        />
      )} */}
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button
        onClick={() => {
          removeUser();
          removeSavedUser();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserHomePage;
