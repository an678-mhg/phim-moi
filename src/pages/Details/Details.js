import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_KEY, BASE_URL } from "../../utils/constans";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import Cast from "../../components/Cast/Cast";
import Simular from "../../components/Simular/Simular";
import ModalTrailer from "../../components/Trailer/ModalTrailer";
import Title from "../../components/Shared/Title";
import { toast } from "react-toastify";
import { addMovieFromPlaylist } from "../../actions/fireStoreActions";
import Loading from "../../components/Loading/Loading";
import { addMovieLocal } from "../../utils/localStro";
import { useStore } from "../../stored";
import StarRatings from "react-star-ratings";
import "./Details.css";

function DetailsMovie() {
  const param = useParams();
  const { media_type, id } = param;
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { user, favoriteList, setFavoriteList } = useStore((state) => state);
  const [loadingAddMovie, setLoadingAddMovie] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDetailsMovie = (media_type, id) => {
      fetch(`${BASE_URL}/${media_type}/${id}?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((details) => {
          setData(details);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    setLoading(true);
    getDetailsMovie(media_type, id);
  }, [id, media_type]);

  useEffect(() => {
    if (data.id) {
      addMovieLocal({
        id: data?.id,
        poster_path: data?.poster_path,
        media_type: media_type,
        title: data?.name || data?.title,
        viewAt: Date.now(),
      });
    }
  }, [data, media_type]);

  const handleAddToFavorites = async () => {
    if (!user) return toast.error("You are not logged in");

    if (favoriteList) {
      const movieExist = favoriteList.some((item) => item.movie.id === data.id);

      if (movieExist) {
        return toast.error("Movies already exist");
      }
    }

    setLoadingAddMovie(true);
    const newFavorite = await addMovieFromPlaylist(user.uid, data, media_type);
    setFavoriteList([...favoriteList, newFavorite]);
    setLoadingAddMovie(false);
    toast.success("Add new favorite success !");
  };

  return (
    <div>
      <Title title={`${data.name || data.title}`} />
      <div
        className={`details ${loading ? "skeleton" : ""}`}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${data?.backdrop_path})`,
        }}
      >
        <div className="container">
          <div className="details-container">
            <div className={`details-poster ${loading ? "skeleton" : ""}`}>
              {!loading && (
                <img
                  className={`details-poster-img`}
                  src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                  alt="poster"
                />
              )}
            </div>
            <div className="details-info">
              {loading ? (
                <h1 className="mr-bottom-20px skeleton skeleton-text h-36px">
                  {""}
                </h1>
              ) : (
                <h1 className={`details-info-title`}>
                  {data.name || data.title}
                </h1>
              )}
              {loading ? (
                <>
                  <p className="skeleton skeleton-text h-20px"></p>
                  <p className="skeleton skeleton-text h-20px"></p>
                  <p className="skeleton skeleton-text h-20px"></p>
                  <p className="skeleton skeleton-text h-20px last-child"></p>
                </>
              ) : (
                <p className="details-info-overview">{data.overview}</p>
              )}
              {loading ? (
                <>
                  <p className="mr-top-20px skeleton skeleton-text h-20px"></p>
                </>
              ) : (
                <p className="release_date">
                  {data.release_date
                    ? `Release date: ${data.release_date}`
                    : `Last episode: ${data.last_air_date}`}
                </p>
              )}
              <div className="genres">
                {data.genres &&
                  data.genres.map((item) => (
                    <Button key={item.id} content={item.name} />
                  ))}
              </div>
              <div className="ratings">
                <StarRatings
                  rating={data.vote_average}
                  starRatedColor="#e74c3c"
                  numberOfStars={10}
                  name="rating"
                  starDimension="15px"
                  starSpacing="2px"
                />
                <div className="ratings-count">{`(${
                  data.vote_count || 0
                } vote)`}</div>
              </div>

              <div className="watch">
                <Link
                  className="watch-link"
                  to={
                    media_type === "tv"
                      ? `/watch/tv/${id}/season/1/esp/1`
                      : `/watch/movie/${id}`
                  }
                >
                  Watch Now
                </Link>
                <span className="watch-link" onClick={() => setShowModal(true)}>
                  Watch Trailer
                </span>
                <span className="watch-link" onClick={handleAddToFavorites}>
                  Add to favorites
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <p className="homepage">
          Homepage:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            className="homepage-link"
            href={data.homepage}
          >
            {data.homepage}
          </a>
        </p>

        <Cast />
        <Simular />
        {showModal ? (
          <ModalTrailer show={showModal} setShow={setShowModal} />
        ) : null}
      </div>

      {loadingAddMovie && <Loading />}
    </div>
  );
}

export default DetailsMovie;
