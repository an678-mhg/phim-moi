import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_KEY, BASE_URL } from "../../utils/constans";
import ImageFade from "../Shared/ImgFade";

function SimularColumn() {
  const params = useParams();

  const { id } = params;

  const [data, setData] = useState([]);

  useEffect(() => {
    const getSiular = (id) => {
      fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => setData(data.results))
        .catch((err) => {
          console.log(err);
        });
    };

    getSiular(id);
  }, [id]);

  return (
    <div className="simularColumn">
      <h1 className="simularColumn-title">Similar</h1>
      <div className="simularColumn-content">
        {data.map((item) => (
          <Link key={item.id} to={`/details/movie/${item.id}`}>
            <div className="simularColumn-item">
              <ImageFade
                lazy_src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"
                }
                alt={item.title}
                className="simularColumn-img"
              />

              <p className="simularColumn-name">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SimularColumn;
