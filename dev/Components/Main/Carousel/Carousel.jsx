import React, { useEffect, useRef, useState } from "react";
import { getFilesFrom } from "../../../src/storage";
import "./Carousel.scss";

const Carousel = () => {
  const [imgs, setImgs] = useState([]);
  const [exeOnce, setExeOnce] = useState(true);
  const [currentCarousel, setCurrentCarousel] = useState(0);

  const handlingCurrentCarousel = (action) => {
    if (isNaN(action)) {
      const newCurrentCarousel = action === "next" ? (currentCarousel >= imgs.length ? 1 : currentCarousel + 1) : currentCarousel <= 1 ? imgs.length : currentCarousel - 1;
      setCurrentCarousel(newCurrentCarousel);
    } else {
      setCurrentCarousel(action);
    }
  };

  const setCarouselWidth = (length) => {
    const carouselGroups = document.getElementsByClassName("carousel-groups")[0];
    carouselGroups.style.width = 100 * length + "%";
  };

  useEffect(() => {
    const carouselGroups = document.getElementsByClassName("carousel-groups")[0];
    if (exeOnce) {
      getFilesFrom("media/sliderImgs").then((imgs) => {
        setCarouselWidth(imgs.length);
        setImgs(imgs);
      });
      setCurrentCarousel(1);
      setExeOnce(false);
    }

    const interval = setInterval(() => {
      handlingCurrentCarousel("next");
    }, 4000);

    carouselGroups.style.marginLeft = `-${(currentCarousel - 1) * 100}%`;

    return () => clearInterval(interval);
  }, [imgs, currentCarousel]);

  return (
    <div className='carousel'>
      <div className='carousel-buttons'>
        <button
          onClick={() => {
            handlingCurrentCarousel("prev");
          }}
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-chevron-left' viewBox='0 0 16 16'>
            <path fillRule='evenodd' d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z' />
          </svg>
        </button>
        <button
          onClick={() => {
            handlingCurrentCarousel("next");
          }}
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-chevron-right' viewBox='0 0 16 16'>
            <path fillRule='evenodd' d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z' />
          </svg>
        </button>
      </div>
      <div className='carousel-body'>
        <div className='carousel-groups'>
          {imgs.map((img, i) => {
            return (
              <div className='carousel-group' key={i}>
                <img src={img.url} alt={img.title} />
              </div>
            );
          })}
        </div>
      </div>
      <div className='carousel-dots'>
        {imgs.map((img, i) => {
          return (
            <button
              className={currentCarousel === i + 1 ? "active" : ""}
              onClick={() => {
                handlingCurrentCarousel(i + 1);
              }}
              key={i}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
