import React from 'react';
import img1 from './../../../src/Assets/image/slide-4_1512x.jpg';
import img2 from './../../../src/Assets/image/slide-5_1512x.jpg';
import img3 from './../../../src/Assets/image/slide-6_1512x.jpg';
import {NavLink} from 'react-router-dom'
import './slider.css';
import Banner from '../banner/banner';

function Slider (){
    return(
        <>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <Banner src={img1} subTile={"MEGA SUMMER SALE"} tilt={"BIG DISCOUNT"} tiltWhite={"UP TO 50%"} btn={"START SHOPPING"} class={"active"}/>
                    <Banner src={img2} subTile={"SPRING - SUMMER 2020"} tilt={"NEW ARRIVALS"} tiltWhite={"COLLECTION"} btn={"SHOP NOW"}/>
                    <Banner src={img3} subTile={"HOT TRENDING"} tilt={"LOOKBOOK"} tiltWhite={"COLLECTION"} btn={"START SHOPPING"}/>
                </div>
                <button className="carousel-control-prev d-none" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next d-none" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default Slider;