import React, { useEffect, useRef, useState } from "react";
import "./Carousel.scss";

import { getFilesFrom } from "../../../src/storage";

const Carousel = () => {
  let autoPlay = useRef(false);
  let nextCarrousel = useRef(1); //in seconds
  const [isCarrouselCharged, setIsCarrouselCharged] = useState(false);
  const [files, setFiles] = useState([]);
  const [carouselLength, setCarouselLength] = useState();
  const [currentCarousel, setCurrentCarousel] = useState();

  const handlingCurrentCarousel = (action) => {
    let newCurrentCarousel;
    const isNextPrev = action === "next" || action === "prev";
    if (isNextPrev) {
      const isNext = action === "next";
      newCurrentCarousel = isNext ? (currentCarousel >= carouselLength ? 1 : currentCarousel + 1) : currentCarousel <= 1 ? carouselLength : currentCarousel - 1;
    } else {
      newCurrentCarousel = action;
    }
    setCurrentCarousel(newCurrentCarousel);

    const carouselGroups = document.getElementsByClassName("carousel-groups")[0];
    carouselGroups.style.marginLeft = "-" + (100 * newCurrentCarousel - 100) + "%";
  };

  useEffect(() => {
    if (!isCarrouselCharged) {
      getFilesFrom("media/sliderImgs").then((files) => {
        setFiles(files);
      });

      if (files.length > 1) {
        const newCarouselLength = document.getElementsByClassName("carousel-group").length;
        setCarouselLength(newCarouselLength);
        setCurrentCarousel(newCarouselLength > 0 ? 1 : 0);

        const carouselGroups = document.getElementsByClassName("carousel-groups")[0];
        carouselGroups.style.width = 100 * newCarouselLength + "%";

        setIsCarrouselCharged(true);
      }
    } else {
      if (autoPlay.current) {
        setInterval(() => {
          handlingCurrentCarousel("next");
        }, 1000);
        autoPlay.current = false;
      }
    }
  });

  const dots = (i) => {
    return (
      <button
        onClick={() => {
          handlingCurrentCarousel(i + 1);
        }}
        key={i}
      ></button>
    );
  };

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
          {files.map((file, i) => {
            return (
              <div className='carousel-group' key={i}>
                <img src={file.url} alt={file.name} />
              </div>
            );
          })}
        </div>
      </div>
      <div className='carousel-dots'>
        {files.map((url, i) => {
          return dots(i);
        })}
      </div>
    </div>
  );
};

export default Carousel;
