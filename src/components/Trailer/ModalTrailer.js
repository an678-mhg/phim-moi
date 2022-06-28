import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../../utils/constans";
import "./Trailer.css";

function ModalTrailer({ show, setShow }) {
  const params = useParams();

  const { media_type, id } = params;

  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    const getTrailer = (media_type, id) => {
      fetch(`${BASE_URL}/${media_type}/${id}/videos?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          setTrailers(data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getTrailer(media_type, id);
  }, [id, media_type]);

  return (
    <div
      className="overlay"
      style={{ display: show ? "flex" : "none" }}
      onClick={() => setShow(false)}
    >
      <div className="trailer-container" onClick={(e) => e.stopPropagation()}>
        <div className="trailer-title-close">
          <h1 className="trailer-title">{media_type} trailers</h1>
          <box-icon
            onClick={() => setShow(false)}
            color="white"
            size="md"
            name="x-circle"
          ></box-icon>
        </div>

        <div className="trailer-content">
          {!trailers.lenth === 0 ? (
            <h1>Ko tìm thấy trailer</h1>
          ) : (
            trailers.map((trailer) => (
              <div key={trailer.id}>
                <h1 className="trailer-name">{trailer.name}</h1>
                <iframe
                  style={{
                    height: "315px",
                  }}
                  width="100%"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allowFullscreen
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ModalTrailer;
