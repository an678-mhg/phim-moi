import React from "react";

const ResultSkeleton = () => {
  return (
    <div className="result-item">
      <div className={`result-item-img skeleton`}></div>

      <div style={{ width: "100%", flex: 1 }}>
        <p
          style={{ height: "14px", width: "100%" }}
          className={`skeleton skeleton-text`}
        ></p>
        <p
          style={{ height: "14px", width: "80%" }}
          className={`skeleton skeleton-text`}
        ></p>
      </div>
    </div>
  );
};

export default ResultSkeleton;
