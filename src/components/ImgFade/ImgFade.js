import { useEffect, useRef, useState } from "react";

const ImageFade = ({
  className,
  onLoad,
  crossOrigin: _,
  lazy_src,
  ...others
}) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const img = imgRef.current;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        img.setAttribute("src", lazy_src);
      }
    });

    if (img) {
      observer.observe(img);
    }

    return () => {
      if (img) {
        observer.unobserve(img);
      }
    };
  }, [lazy_src]);

  return (
    <img
      ref={imgRef}
      alt="img"
      className={`${className}`}
      style={{
        opacity: loaded ? "1" : "0",
        transition: "all 0.4s ease-in",
      }}
      onLoad={(e) => {
        setLoaded(true);
        onLoad && onLoad(e);
      }}
      {...others}
    />
  );
};

export default ImageFade;
