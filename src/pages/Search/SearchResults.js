import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieItem from "../../components/Movie/MovieItem";
import Skeleton from "../../components/Skeleton/Skeleton";
import { useSearchParams } from "../../hook/useSearchParams";
import { BASE_URL, API_KEY } from "../../utils/constans";
import Title from "../../components/Shared/Title";

function SearchResults() {
  const searchParams = useSearchParams();

  const keyword = searchParams.get("q");

  const [results, setResults] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPage, setTotalPage] = useState();

  const [loading, setLoading] = useState(true);

  const LoadMore = () => {
    setPage(page + 1);
  };

  const searchKeywordforUser = useCallback(
    (keyword) => {
      if (keyword.trim() === "") return;
      fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${keyword}&page=${page}`
      )
        .then((res) => res.json())
        .then((data) => {
          setTotalPage(data.total_pages);
          setResults((prev) => [...prev, ...data.results]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    },
    [page]
  );

  useEffect(() => {
    setLoading(true);
    searchKeywordforUser(keyword);
  }, [page, keyword, searchKeywordforUser]);

  if (!loading && results.length === 0) {
    return (
      <div className="non-results">
        <h1>No Results!</h1>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Change document title */}
      <Title title={`Results for ${keyword}`} />

      <div className="searchResults">
        <h1 className="searchResults-title">Results for {`"${keyword}"`}</h1>
        <div className="grid-layout grid-gap-20px-20px">
          {!loading ? (
            results.map((result) => (
              <Link
                key={result.id}
                to={`/details/${result.media_type}/${result.id}`}
              >
                <MovieItem data={result} />
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
            </>
          )}
        </div>
      </div>
      {page < totalPage ? (
        <div onClick={LoadMore} className="load-more">
          <button className="load-more-button">Load More</button>
        </div>
      ) : null}
    </div>
  );
}

export default SearchResults;
