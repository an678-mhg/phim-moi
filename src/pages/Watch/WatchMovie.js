import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../../utils/constans";
import SimularColumn from "../../components/Simular/SimularColumn";
import "./Watch.css";
import Title from "../../utils/Title";
import Comment from "../../components/Comments/Comment";

function WatchMovie() {
  const params = useParams();

  const [info, setInfo] = useState({});

  const { id } = params;

  useEffect(() => {
    const getInfo = (id) => {
      fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => setInfo(data));
    };

    getInfo(id);
  }, [id]);

  return (
    <div className="container">
      {/* Change document title */}
      <Title title={`${info?.title} | Watch`} />

      <div className="watch-movie-container">
        <div className="watch-wrap">
          <div className="watch-movie">
            <iframe
              width="100%"
              height={"100%"}
              src={`https://www.2embed.ru/embed/tmdb/movie?id=${id}`}
              title="Movie player"
              frameBorder="0"
              allowFullScreen
            />
          </div>
          <div className="watch-tv-in4">
            <h1 className="movie-name">{info.title}</h1>
            <p className="movie-overview">{info.overview}</p>
            <p className="movie-release_date">
              Release date: {info.release_date}
            </p>
          </div>

          <Comment movieId={id} />
        </div>
        <div className="simularMovie">
          <SimularColumn />
        </div>
      </div>
    </div>
  );
}

export default WatchMovie;
