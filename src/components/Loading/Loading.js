import React from "react";
import { FadingBalls } from "react-cssfx-loading";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="ovelay">
      <FadingBalls color="rgb(231, 76, 60)" />
    </div>
  );
};

export default Loading;
