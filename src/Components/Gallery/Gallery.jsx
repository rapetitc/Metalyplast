import React, { useEffect, useState } from "react";
import { getFilesFrom } from "../../utils/storage";
import "./Gallery.scss";

const Gallery = () => {
  const [imgs, setImgs] = useState([]);
  const [imgToShow, setImgToShow] = useState({});
  const [FSStatus, setFSStatus] = useState(document.fullscreenElement);

  const handlingImgPreview = (isActive, imgs, i) => {
    if (isActive) {
      setImgToShow({ ...imgs[i], current: i + 1, isActive: isActive });
    } else {
      if (document.fullscreenElement) handlingFullScreen();
      setImgToShow({ isActive: isActive });
    }
  };

  const handlingFullScreen = () => {
    const imgPreview = document.getElementsByClassName("img-preview")[0];
    if (FSStatus) {
      document.exitFullscreen();
      setFSStatus(false);
    } else {
      imgPreview.requestFullscreen();
      setFSStatus(true);
    }
  };

  useEffect(() => {
    getFilesFrom("media/galleryImgs").then((imgsCollection) => {
      setImgs(imgsCollection);
    });
  }, []);

  return (
    <div className='Gallery'>
      <div className={imgToShow.isActive ? "img-preview active" : "img-preview"}>
        <div className='img-preview-header'>
          <div className='counter'>
            {imgToShow.current}/{imgs.length}
          </div>
          <div className='buttons'>
            <button
              onClick={() => {
                handlingFullScreen();
              }}
            >
              {FSStatus ? (
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-fullscreen-exit' viewBox='0 0 16 16'>
                  <path d='M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z' />
                </svg>
              ) : (
                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-fullscreen' viewBox='0 0 16 16'>
                  <path d='M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z' />
                </svg>
              )}
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
        <div className='img-preview-body'>
          <div className='img-container'>
            <img src={imgToShow.url} alt={imgToShow.title} />
          </div>
        </div>
        <div className='img-preview-footer'>{imgToShow.title}</div>
      </div>
      <div className='gallery-imgs'>
        {imgs.map((imgInfo, i) => (
          <div
            className='img'
            onClick={() => {
              handlingImgPreview(true, imgs, i);
            }}
            key={i}
          >
            <div className='img-container'>
              <img src={imgInfo.url} alt={imgInfo.title} />
            </div>
          </div>
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
