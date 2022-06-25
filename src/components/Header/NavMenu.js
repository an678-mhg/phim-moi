import React from "react";
import { NavLink } from "react-router-dom";

const NavMenu = () => {
  return (
    <ul className="nav-menu">
      <li>
        <NavLink activeclassname="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeclassname="active" to="/movies">
          Movies
        </NavLink>
      </li>
      <li>
        <NavLink activeclassname="active" to="/tv_shows">
          TV Shows
        </NavLink>
      </li>
    </ul>
  );
};

export default NavMenu;
