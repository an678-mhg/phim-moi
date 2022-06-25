import React from "react";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const NavUser = ({ user }) => {
  const logOut = () => {
    signOut(auth);
  };

  return (
    <div className="header-user">
      <img alt="avatar" src={user.photoURL} />
      <ul className="header-user-list">
        <li className="header-user-item">{user.displayName}</li>
        <li className="header-user-item">{user.email}</li>
        <li className="header-user-item">
          <Link to="/favorite-movie">My Favorite Movie</Link>
        </li>
        <li className="header-user-item" onClick={logOut}>
          Log Out
        </li>
      </ul>
    </div>
  );
};

export default NavUser;
