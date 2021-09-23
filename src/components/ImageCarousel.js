import React from "react";
import "../css/ImageCarousel.css";

function ImageCarousel() {
  return (
    <div className="image-slide">
      <div className="slider">
        <img src="/images/flyer-1.jpg" alt="flyer-1" />

        <img src="/images/flyer-2.jpg" alt="flyer-2" />

        <img src="/images/flyer-3.jpg" alt="flyer-3" />

        <img src="/images/flyer-4.jpg" alt="flyer-4" />

        <img src="/images/flyer-1.jpg" alt="flyer-1" />
      </div>
    </div>
  );
}

export default ImageCarousel;
