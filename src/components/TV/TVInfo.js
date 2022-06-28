import React from "react";

const TVInfo = ({ nameTv, espCurrent }) => {
  return (
    <div className="watch-tv-in4">
      <h1 className="watch-tv-title">{nameTv}</h1>
      <p className="watch-tv-season-number">
        Season {espCurrent && espCurrent?.season_number} | Episode{" "}
        {espCurrent?.episode_number}
      </p>
      <p className="watch-tv-name-esp">Name: {espCurrent?.name}</p>
      <p className="watch-tv-overview">Overview: {espCurrent?.overview}</p>
      <p className="watch-tv-air_date">Air Date: {espCurrent?.air_date}</p>
    </div>
  );
};

export default TVInfo;
