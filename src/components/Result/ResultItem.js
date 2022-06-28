import React from "react";
import { Link } from "react-router-dom";

const ResultItem = ({ item }) => {
  return (
    <Link to={`/details/${item.media_type}/${item.id}`} className="result-item">
      <div className={`result-item-img`}>
        <img
          src={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : "https://images.unsplash.com/photo-1535704882196-765e5fc62a53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YW5pbWUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          }
          alt={item.title ? item.title : item.name}
        />
      </div>

      <p>{item.name || item.title}</p>
    </Link>
  );
};

export default ResultItem;
