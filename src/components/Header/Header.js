import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useStore } from "../../stored";
import NavUser from "./NavUser";

function Header() {
  const hederRef = useRef(null);
  const user = useStore((state) => state.user);
  const loading = useStore((state) => state.loading);

  useEffect(() => {
    const handleFixedHeader = () => {
      const header = hederRef.current;
      const sticky = header.offsetTop;

      if (header) {
        if (window.pageYOffset > sticky) {
          header.classList.add("sticky");
        } else {
          header.classList.remove("sticky");
        }
      }
    };

    window.addEventListener("scroll", handleFixedHeader);

    return () => window.removeEventListener("scroll", handleFixedHeader);
  }, []);

  return (
    <div ref={hederRef} className="header">
      <div className="header-list">
        <Link to="/" className="header-logo">
          <box-icon color="#e74c3c" size="md" name="movie"></box-icon>
          <span>PHIMMOI</span>
        </Link>
      </div>

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
