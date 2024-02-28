import React, { useState, useEffect } from 'react';

// import { FETCH_URL } from '../../../Assets/Variables/const'; // pour version API

import { galery } from "./Galery"; // variables js pour démo version statique (hébergement sans BDD)

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Slider() {

  // Code fetch API Node JS
  // const [videos, setVideos] = useState([]);
  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const datas = await fetch(FETCH_URL + "videos/last-upload", {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           // 'Authentication': `Bearer ${TOKEN}`
  //         }
  //       });
  //       if (datas.status === 200) {
  //         const json = await datas.json();
  //         setVideos(json);
  //       }
  //     } catch (error) {
  //       throw Error(error);
  //     }
  //   }
  //   getData();
  // }, []);


  // Boutton du slider
  const [currentIndex, setCurrentIndex] = useState(0);
  function goToNextSlide(e) {
    e.preventDefault();
    setCurrentIndex((prevIndex) => (prevIndex === galery.length - 1 ? 0 : prevIndex + 1));
  };
  function goToPrevSlide(e) {
    e.preventDefault();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? galery.length - 1 : prevIndex - 1));
  };

  return (

    <React.Fragment key={galery[currentIndex].id}>

      <div className="slider">
        <button onClick={goToPrevSlide} className='slider-button prev'><FontAwesomeIcon icon={faChevronLeft} size="2xl" className="fa fa-chevron-left" /></button>
        <button onClick={goToNextSlide} className='slider-button next'><FontAwesomeIcon icon={faChevronRight} size="2xl" className="fa fa-chevron-right" /></button>

        <video className='slider-video' controls>
          <source src={"/Videos/" + galery[currentIndex].title} controls type="video/mp4" />
        </video>

      </div>


      {/* <div className="slider" >
        {!videos ? (   // Code fetch API Node JS
          <>
            <p>Aucune vidéo disponible</p>
          </>
        ) : (
          <React.Fragment key={videos[currentIndex].id}>
            <button onClick={goToPrevSlide} className='slider-button'><FontAwesomeIcon icon={faChevronLeft} size="2xl" className="fa fa-chevron-left" /></button>

            <video controls width="500">
              <source src={"/Videos/" + videos[currentIndex].title} controls type="video/mp4" />
            </video>

            <button onClick={goToNextSlide} className='slider-button'><FontAwesomeIcon icon={faChevronRight} size="2xl" className="fa fa-chevron-right" /></button>
          </React.Fragment>
        )}
      </div> */}

    </React.Fragment >
  );
};

export default Slider;