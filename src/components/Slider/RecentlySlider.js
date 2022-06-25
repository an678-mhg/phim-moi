// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import useInnerWidth from "../../hook/useInnerWidth";
import "./Slider.css";
import { Link } from "react-router-dom";
import MovieItem from "../Movie/MovieItem";

const RecentlySlider = ({ data }) => {
  SwiperCore.use([Navigation]);
  const width = useInnerWidth();

  let item;

  if (width >= 1024) {
    item = 5;
  } else if (width < 1024 && width >= 740) {
    item = 4;
  } else if (width < 740 && width >= 500) {
    item = 3;
  } else {
    item = 2;
  }

  return (
    <div className="slider">
      <div className="title">
        <h1>Recently viewed</h1>
      </div>
      <Swiper
        navigation
        grabCursor={true}
        spaceBetween={20}
        slidesPerView={item}
      >
        {data?.map((item) => (
          <SwiperSlide key={item.id}>
            <Link to={`/details/${item.media_type}/${item.id}`}>
              <MovieItem data={item} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecentlySlider;
