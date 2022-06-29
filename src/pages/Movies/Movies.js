import React, { useCallback, useEffect, useState } from "react";
import MovieItem from "../../components/Movie/MovieItem";
import Skeleton from "../../components/Skeleton/Skeleton";
import { Link } from "react-router-dom";
import { API_KEY, BASE_URL } from "../../utils/constans";
import Title from "../../utils/Title";

const Movies = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fetchMovieGenres = useCallback(() => {
    fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies((prev) => [...prev, ...data.results]);
        setTotalPage(data.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [page]);

  useEffect(() => {
    setLoading(true);
    fetchMovieGenres();
  }, [page, fetchMovieGenres]);

  const LoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="margin-top container">
      <Title title={"Movies | Phim Moi"} />

      <h1
        style={{
          color: "#fff",
          fontSize: "20px",
          marginBottom: "20px",
        }}
      >
        Movies
      </h1>

      <div className="grid-layout grid-gap-20px-20px">
        {!loading ? (
          movies?.map((item) => (
            <Link key={item.id} to={`/details/movie/${item.id}`}>
              <MovieItem data={item} />
            </Link>
          ))
        ) : (
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
        )}
      </div>
      <div className="scrollTop" onClick={scrollTop}>
        <box-icon size="sm" color="white" type="solid" name="to-top"></box-icon>
      </div>
      {page < totalPage ? (
        <div onClick={LoadMore} className="load-more">
          <button className="load-more-button">Load More</button>
        </div>
      ) : null}
    </div>
  );
};

export default Movies;
