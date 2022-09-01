import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../../utils/constans";
import SimularColumn from "../../components/Simular/SimularColumn";
import Title from "../../components/Shared/Title";
import Comment from "../../components/Comments/Comment";
import EmbedVideoMovie from "../../components/Movie/EmbedVideoMovie";
import MovieInfo from "../../components/Movie/MovieInfo";
import "./Watch.css";

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
      <Title title={`${info?.title} | Watch | Phim Moi`} />

      <div className="watch-movie-container">
        <div className="watch-wrap">
          <EmbedVideoMovie id={id} />
          <MovieInfo info={info} />
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
