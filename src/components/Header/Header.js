import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { useStore } from "../../stored/store";
import NavUser from "./NavUser";
import NavMenu from "./NavMenu";

function Header() {
  const hederRef = useRef(null);
  const user = useStore((state) => state.user);
  const loading = useStore((state) => state.loading);
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  return (
    <div ref={hederRef} className="header">
      <div
        className="header-list"
        style={{
          top: showMenu ? "0%" : "-100%",
        }}
      >
        <Link to="/" className="header-logo">
          <box-icon color="#e74c3c" size="md" name="movie"></box-icon>{" "}
          <span>PHIMMOI</span>
        </Link>

        <NavMenu />
      </div>

      <div className="toggle-menu-icon" onClick={() => setShowMenu(!showMenu)}>
        <div className={`bar menu ${showMenu ? "close" : ""}`}>
          <span></span>
          <span></span>
        </div>
      </div>

      <Link to="/" className="header-logo-mobile">
        <span>PHIMMOI</span>
      </Link>

      <div className="header-info">
        <Link className="header-search" to="/search">
          <box-icon size="md" color="#e74c3c" name="search-alt-2"></box-icon>
        </Link>

        {user ? (
          <NavUser user={user} />
        ) : (
          <Link
            to="/login"
            className={`bnt-login ${loading ? "disabled-link" : ""}`}
          >
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
