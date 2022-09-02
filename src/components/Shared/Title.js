import React from "react";
import { useEffect } from "react";

const Title = ({ title }) => {
  useEffect(() => {
    document.title = title || "Phim Moi | Watching and stream movie free";
  });

  return <></>;
};

export default Title;
