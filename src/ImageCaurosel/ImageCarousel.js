import React, { useState, useCallback, useRef } from "react";
import "./Carousel.css";

const ImageCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const thumbnailRef = useRef(null);

  const scrollToImage = useCallback((index) => {
    const normalizedIndex = (index + images.length) % images.length; // Round-robin logic

    // Update active index for selected image
    setActiveIndex(normalizedIndex);

    // Scroll the main carousel to the selected image
    carouselRef.current.scrollTo({
      left: normalizedIndex * carouselRef.current.clientWidth,
      behavior: "smooth",
    });

    // Scroll the thumbnails container to ensure the selected thumbnail is in view
    const thumbnails = thumbnailRef.current?.children;
    if (thumbnails) {
      const selectedThumbnail = thumbnails[normalizedIndex];
      selectedThumbnail?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",    // Align vertically if necessary
        inline: "center",    // Center the selected thumbnail horizontally
      });
    }
  }, [images.length]);

  const handleNext = useCallback(() => {
    scrollToImage(activeIndex + 1); // Move to the next image (round-robin)
  }, [activeIndex, scrollToImage]);

  const handlePrev = useCallback(() => {
    scrollToImage(activeIndex - 1); // Move to the previous image (round-robin)
  }, [activeIndex, scrollToImage]);

  return (
    <div className="carousel-container">
      {/* Navigation Buttons Outside */}
      <div className="carousel-controls">
        <button className="nav-button" onClick={handlePrev}>
          ❮
        </button>

        <div className="carousel-wrapper">
          <div className="carousel-track" ref={carouselRef}>
            {images.map((img, index) => (
              <img key={index} src={img} alt={`Slide ${index + 1}`} className="carousel-image" />
            ))}
          </div>
        </div>

        <button className="nav-button" onClick={handleNext}>
          ❯
        </button>
      </div>

      {/* Centered Thumbnails */}
      <div className="thumbnail-wrapper">
        <div className="thumbnail-container" ref={thumbnailRef}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${activeIndex === index ? "selected" : ""}`}
              onClick={() => scrollToImage(index)} // Click to select thumbnail
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
