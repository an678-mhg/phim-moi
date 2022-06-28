import React, { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../../utils/constans";
import { Link } from "react-router-dom";
import "./Banner.css";

const Banner = () => {
  const [banner, setBanner] = useState();

  useEffect(() => {
    function getBanner() {
      fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          const random = Math.floor(Math.random() * (19 - 0 + 1) + 0);

          setBanner(data.results[random]);
        })
        .catch((err) => console.log(err));
    }

    getBanner();
  }, []);

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${banner?.backdrop_path})`,
      }}
    >
      <div className="banner-content">
        <div className="banner-info">
          <h1 className="banner-info-title">{banner?.title}</h1>
          <p className="banner-info-overview">{banner?.overview}</p>
          <div className="banner-button">
            <Link
              to={`watch/movie/${banner?.id}`}
              className="banner-button-link"
            >
              Watch Now
            </Link>
            <Link
              to={`/details/movie/${banner?.id}`}
              className="banner-button-link"
            >
              View Info
            </Link>
          </div>
        </div>
        <div className="banner-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${banner?.poster_path}`}
            alt={banner?.title}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
