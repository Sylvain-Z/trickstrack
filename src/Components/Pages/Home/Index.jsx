import { Link } from "react-router-dom";
import { useEffect } from 'react';
import gsap from 'gsap';
import { Expo } from 'gsap/all';

import Board from '../../../Assets/Images/HomeSkate.png';

function Home() {

    useEffect(() => {
        gsap.from('.home-title', {
            duration: 1,
            delay: 0.2,
            opacity: 0,
            y: 50,
            ease: Expo.easeInOut
        })
        gsap.from('.sentence', {
            duration: 1,
            delay: 1.2,
            opacity: 0,
            y: -50,
            ease: Expo.easeInOut
        })
        gsap.from('.home-button', {
            duration: 2,
            delay: 1.2,
            opacity: 0,
            y: 50,
            ease: Expo.easeInOut
        })
        gsap.from('.home-image', {
            duration: 1,
            delay: 0.4,
            opacity: 0,
            y: -700,
            ease: Expo.easeInOut
        })        
        gsap.to('.home-image', {
            duration: 0.2,
            delay: 2.7,
            rotate: -30,
            ease: Expo.easeInOut
        })
        gsap.to('.home-image', {
            duration: 0.5,
            delay: 2.9,
            y: -400,
            rotate: 5,
            ease: Expo.easeInOut
        })
        gsap.to('.home-image', {
            duration: 0.8,
            delay: 3.5,
            y: -50,
            rotate: 0,
            ease: Expo.easeInOut
        })

    }, []);


    return (
        <>

            <div className="home-container">

                <p className="home-text sentence">Your progress traking site</p>

                <img src={Board} alt="" className="home-image" />

                <h1 className="home-title">TricksTrack</h1>

                <p className="home-text home-button"><Link to="/galerie">Start now!</Link></p>

            </div>



        </>
    )

};

export default Home;