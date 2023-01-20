import React, { useEffect, useRef, useState } from "react";
import "./Gallery.scss";

import { getAllFilesFrom } from "../../../utilities/gettingFile";

const Img = ({ imgInfo, i, handlingImgPreview }) => {
  return (
    <div className='img' onClick={handlingImgPreview}>
      <div className='img-container'>
        <img src={imgInfo.url} alt={imgInfo.name} />
      </div>
    </div>
  );
};

const Gallery = () => {
  const isGalleryCompleted = useRef(false);
  const [imgs, setImgs] = useState([]);

  const handlingImgPreview = (active, imgInfo, i) => {
    const imgPreview = document.getElementsByClassName("img-preview")[0];
    const imgPreviewHeader = document.getElementsByClassName("img-preview-header")[0];
    const imgPreviewBody = document.getElementsByClassName("img-preview-body")[0];
    const imgPreviewFooter = document.getElementsByClassName("img-preview-footer")[0];
    if (active) {
      imgPreviewHeader.firstChild.innerHTML = `${i + 1}/${imgs.length}`;
      imgPreview.style.opacity = "1";
      imgPreview.style.zIndex = "99";
      imgPreviewBody.innerHTML = `
      <div class='img-container'>
        <img src='${imgInfo.url}' alt='${imgInfo.name}' />
      </div>
      `;
      imgPreviewFooter.innerHTML = imgInfo.name;
    } else {
      if (document.fullscreenElement) {
        document
          .exitFullscreen()
          .then(() => console.log("Document Exited from Full screen mode"))
          .catch((err) => console.error(err));
      }
      imgPreview.style.opacity = "0";
      imgPreview.style.zIndex = "-1";
    }
  };

  const handlingFullScreen = () => {
    console.log("Trying to full screen");
    const imgPreview = document.getElementsByClassName("img-preview")[0];
    if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .then(() => console.log("Document Exited from Full screen mode"))
        .catch((err) => console.error(err));
    } else {
      imgPreview.requestFullscreen();
    }
  };

  useEffect(() => {
    if (!isGalleryCompleted.current) {
      getAllFilesFrom("galleryImgs", (imgsCollection) => {
        setImgs(imgsCollection);

        isGalleryCompleted.current = true;
      });
    }
  });

  return (
    <div className='gallery-container'>
      <div className='img-preview'>
        <div className='img-preview-header'>
          <div className='counter'>1/15</div>
          <div className='buttons'>
            <button
              onClick={() => {
                handlingFullScreen();
              }}
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-fullscreen' viewBox='0 0 16 16'>
                <path d='M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z' />
              </svg>
            </button>
            <button
              onClick={() => {
                handlingImgPreview(false);
              }}
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-x-lg' viewBox='0 0 16 16'>
                <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z' />
              </svg>
            </button>
          </div>
        </div>
        <div className='img-preview-body'></div>
        <div className='img-preview-footer'>titulo de la imagen</div>
      </div>
      <div className='gallery-imgs'>
        {imgs.map((imgInfo, i) => (
          <Img
            imgInfo={imgInfo}
            i={i}
            key={i}
            handlingImgPreview={() => {
              handlingImgPreview(true, imgInfo, i);
            }}
          />
        ))}
      </div>
      <div className='gallery-buttons'>
        <button>
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-chevron-left' viewBox='0 0 16 16'>
            <path fillRule='evenodd' d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z' />
          </svg>
        </button>
        <button>
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-chevron-right' viewBox='0 0 16 16'>
            <path fillRule='evenodd' d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z' />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Gallery;
