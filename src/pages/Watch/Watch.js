import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { BASE_URL, API_KEY } from "../../utils/constans";
import Simular from "../../components/Simular/Simular";
import Title from "../../utils/Title";
import Comment from "../../components/Comments/Comment";

function Watch() {
  const { esp, season, id } = useParams();

  const [seasonTv, setSeasonTv] = useState(1);
  const [espTv, setEspTv] = useState(1);
  const [seasonData, setSeasonData] = useState([]);
  const [espData, setEspData] = useState([]);
  const [seasonCurrent, setSeasonCurrent] = useState();
  const [espCurrent, setEspCurrent] = useState();
  const [nameTv, setNameTv] = useState();

  useEffect(() => {
    setEspTv(esp);
    setSeasonTv(season);
  }, [esp, season]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const getInfoTv = (id) => {
      fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          setSeasonData(data.seasons);
          setNameTv(data.name);
        });
    };

    getInfoTv(id);
  }, [id]);

  useEffect(() => {
    const getEspCurrent = (id, season, esp) => {
      fetch(
        `${BASE_URL}/tv/${id}/season/${season}/episode/${esp}?api_key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          setEspCurrent(data);
        })
        .catch((err) => console.log(err));
    };

    getEspCurrent(id, season, esp);
  }, [esp, season, id]);

  const getEsp = (season, id) => {
    setEspData([]);

    fetch(`${BASE_URL}/tv/${id}/season/${season}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setEspData(data.episodes);
        setSeasonCurrent(data.season_number);
      });
  };

  return (
    <div className="container">
      {/* Change document title */}
      <Title title={`${nameTv} | season ${season} | episode ${esp}`} />

      <div className="watch-tv-container">
        <div className="watch-wrap">
          <div className="watch-tv">
            <iframe
              width={"100%"}
              height={"100%"}
              src={`https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=${seasonTv}&e=${espTv}`}
              frameBorder="0"
              title="tvShow"
              className="watch-tv-iframe"
              allowFullScreen
            />
          </div>
          <div className="watch-tv-in4">
            <h1 className="watch-tv-title">{nameTv}</h1>
            <p className="watch-tv-season-number">
              Season {espCurrent && espCurrent?.season_number}
            </p>
            <p className="watch-tv-number">
              Episode {espCurrent?.episode_number}
            </p>
            <p className="watch-tv-name-esp">Name: {espCurrent?.name}</p>
            <p className="watch-tv-overview">
              Overview: {espCurrent?.overview}
            </p>
            <p className="watch-tv-air_date">
              Air Date: {espCurrent?.air_date}
            </p>
          </div>

          <Comment movieId={id} />
        </div>
        <div className="watch-tv-other-season">
          {seasonData.map((item) => (
            <div
              onClick={() => getEsp(item.season_number, id)}
              className="watch-tv-season"
              key={item.id}
            >
              <div className="watch-tv-link">
                <img
                  className="watch-tv-season-img"
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"
                  }
                  alt={item.name}
                />
                <div className="info-esp-season">
                  <p className="watch-tv-season-name">{item.name}</p>
                  <p className="watch-tv-esp-count">
                    {item.episode_count} episode
                  </p>
                </div>
              </div>
              <div className="esp">
                {item.season_number === seasonCurrent
                  ? espData.map((esp) => (
                      <NavLink
                        to={`/watch/tv/${id}/season/${seasonCurrent}/esp/${esp.episode_number}`}
                        className="esp-list"
                        activeclassname="active"
                        key={esp.id}
                        onClick={scrollToTop}
                      >
                        <div className="esp-item">
                          <img
                            src={
                              esp.still_path
                                ? `https://image.tmdb.org/t/p/w500${esp.still_path}`
                                : "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"
                            }
                            alt={esp.name}
                            className="esp-item-img"
                          />
                          <p className="esp-item-name">
                            Episode {esp.episode_number}
                          </p>
                        </div>
                      </NavLink>
                    ))
                  : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Simular />
    </div>
  );
}

export default Watch;
