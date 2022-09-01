import React from "react";
import ImageFade from "../Shared/ImgFade";
import "./MovieItem.css";

function MovieItem({ data }) {
  const { poster_path } = data;

  return (
    <div>
      <div className="movie-item" style={{ background: "#222" }}>
        <ImageFade
          lazy_src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://images.unsplash.com/photo-1535704882196-765e5fc62a53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YW5pbWUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          }
          alt={data.title ? data.title : data.name}
        />
      </div>
      <p className="line-clamp-1 movie-item-title">
        {data?.title || data?.name}
      </p>
    </div>
  );
}

export default MovieItem;
