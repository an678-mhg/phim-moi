import React, { useEffect, useRef, useState } from "react";
import { BASE_URL, API_KEY } from "../../utils/constans";
import EspItem from "./EspItem";

const SeasonItem = ({ item, seasonCurrent, setSeasonCurrent, id }) => {
  const [espData, setEspData] = useState([]);
  const seasonRef = useRef(null);

  useEffect(() => {
    const getEsp = (season, id) => {
      fetch(`${BASE_URL}/tv/${id}/season/${season}?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          setEspData(data.episodes);
        });
    };

    getEsp(item.season_number, id);
  }, [id, item.season_number]);

  return (
    <div
      onClick={() => {
        if (seasonCurrent === item.season_number) {
          setSeasonCurrent(null);
        } else {
          setSeasonCurrent(item.season_number);
        }
      }}
      ref={seasonRef}
      className="watch-tv-season"
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
          <p className="watch-tv-season-name line-clamp-1">{item.name}</p>
          <p className="watch-tv-esp-count">{item.episode_count} episode</p>
        </div>
      </div>
      <div className="esp">
        {item.season_number === seasonCurrent &&
          espData.map((esp) => (
            <EspItem
              key={esp.id}
              esp={esp}
              seasonCurrent={seasonCurrent}
              id={id}
            />
          ))}
      </div>
    </div>
  );
};

export default SeasonItem;
