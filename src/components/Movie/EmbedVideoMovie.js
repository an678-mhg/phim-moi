import React from "react";

const EmbedVideoMovie = ({ id }) => {
  return (
    <div className="watch-movie">
      <iframe
        width="100%"
        height={"100%"}
        src={`https://2embed.org/embed/${id}`}
        title="Movie player"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default EmbedVideoMovie;
