import React from "react";

const MovieInfo = ({ info }) => {
  return (
    <div className="watch-tv-in4">
      <h1 className="movie-name">{info.title}</h1>
      <p className="movie-overview">Overview: {info.overview}</p>
      <p className="movie-release_date">Release date: {info.release_date}</p>
    </div>
  );
};

export default MovieInfo;
