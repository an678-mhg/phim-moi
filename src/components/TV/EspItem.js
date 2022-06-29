import React from "react";
import { NavLink } from "react-router-dom";

const EspItem = ({ esp, id }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <NavLink
      to={`/watch/tv/${id}/season/${esp.season_number}/esp/${esp.episode_number}`}
      className="esp-list"
      activeclassname="active"
      onClick={scrollToTop}
    >
      <div className="esp-item">
        <div className="esp-item-img">
          <img
            src={
              esp.still_path
                ? `https://image.tmdb.org/t/p/w500${esp.still_path}`
                : "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"
            }
            alt={esp.name}
          />
        </div>

        <div style={{ flex: 1 }}>
          <p className="esp-item-name">Episode {esp.episode_number}</p>
          <p className="esp-item-name line-clamp-1">Name: {esp.name}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default EspItem;
