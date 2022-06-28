import React from "react";
import { Link } from "react-router-dom";
import "./Result.css";
import ResultItem from "./ResultItem";
import ResultSkeleton from "./ResultSkeleton";

const ListResults = ({ results, loading, keyWord }) => {
  if (loading) {
    return (
      <div className="result">
        <ResultSkeleton />
        <ResultSkeleton />
        <ResultSkeleton />
      </div>
    );
  }

  return (
    <div className="result">
      {results.map((result) => (
        <ResultItem loading={loading} key={result.id} item={result} />
      ))}

      <Link
        to={`/results?q=${keyWord}`}
        style={{
          width: "100%",
          backgroundColor: "#111",
          color: "#fff",
          padding: "10px 16px",
          border: "none",
          borderRadius: "10px",
          fontSize: "16px",
          display: "block",
          textAlign: "center",
        }}
      >
        All results
      </Link>
    </div>
  );
};

export default ListResults;
