import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_KEY, BASE_URL } from "../../utils/constans";
import CastItem from "./CastItem";
import "./Cast.css";
import Skeleton from "../Skeleton/Skeleton";

function Cast() {
  const params = useParams();

  const { media_type, id } = params;

  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCast = (media_type, id) => {
      fetch(`${BASE_URL}/${media_type}/${id}/credits?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((cast) => {
          setCast(cast.cast.slice(0, 10));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    setLoading(true);
    getCast(media_type, id);
  }, [media_type, id]);

  return (
    <>
      <h3 className="cast-title">Cast</h3>
      <div className="cast grid-gap-20px-20px grid-layout">
        {loading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          cast.map((item) => <CastItem data={item} key={item.id} />)
        )}
      </div>
    </>
  );
}

export default Cast;
