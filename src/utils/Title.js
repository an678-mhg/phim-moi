import React from "react";
import { useEffect } from "react";

const Title = ({ title }) => {
  useEffect(() => {
    if (title === "undefined") {
      document.title = "Phim Moi";
    } else {
      document.title = title;
    }
  });

  return <></>;
};

export default Title;
