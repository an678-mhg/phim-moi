import React, { useMemo } from "react";
import Banner from "../../components/Banner/Banner";
import RecentlySlider from "../../components/Slider/RecentlySlider";
import SliderMovie from "../../components/Slider/SliderMovie";
import SliderTv from "../../components/Slider/SliderTv";
import { getMovieHistory } from "../../utils/localStro";
import Title from "../../components/Shared/Title";

function Content() {
  const historyWatch = useMemo(getMovieHistory, []);

  return (
    <>
      <div className="home-page">
        <Title title={"Phim Moi | Watching and stream movie free"} />
        <Banner />

        <div className="container">
          {historyWatch.length > 0 ? (
            <RecentlySlider data={historyWatch} />
          ) : null}
          <div className="movie">
            <SliderMovie type="trending" />
            <SliderMovie type="popular" />
            <SliderMovie type="top_rated" />
          </div>
          <div className="tv">
            <SliderTv type="trending" />
            <SliderTv type="popular" />
            <SliderTv type="top_rated" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
