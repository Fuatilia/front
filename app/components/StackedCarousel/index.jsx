import React, { useState } from "react";

import Image from "next/image";
import "./StackedCarousel.css";

const StackedCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="carousel">
      {images.map((image, index) => (
        <div
          key={index}
          className={`carousel-item ${currentIndex === index ? "active" : ""}`}
          style={{
            "--rotation": `${index * 10}deg`,
            "--translateZ": `-${index * 30}px`,
            "--zIndex": images.length - index,
          }}
          onClick={handleSwipe}
        >
          <Image
            // fill
            src={image}
            alt={`carousel-item-${index}`}
            width={300}
            height={300}
          />
        </div>
      ))}
    </div>
  );
};

export default StackedCarousel;
