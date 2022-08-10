import React from "react";

const EmbedVideoTv = ({ id, seasonTv, espTv }) => {
  return (
    <div className="watch-tv">
      <iframe
        width={"100%"}
        height={"100%"}
        src={`https://www.2embed.to/embed/tmdb/tv?id=${id}&s=${seasonTv}&e=${espTv}`}
        frameBorder="0"
        title="tvShow"
        className="watch-tv-iframe"
        allowFullScreen
      />
    </div>
  );
};

export default EmbedVideoTv;
