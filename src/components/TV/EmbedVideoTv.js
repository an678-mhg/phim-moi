import React from "react";

const EmbedVideoTv = ({ id, seasonTv, espTv }) => {
  return (
    <div className="watch-tv">
      <iframe
        width={"100%"}
        height={"100%"}
        src={`https://2embed.org/embed/${id}/${seasonTv}/${espTv}`}
        frameBorder="0"
        title="tvShow"
        className="watch-tv-iframe"
        allowFullScreen
      />
    </div>
  );
};

export default EmbedVideoTv;
