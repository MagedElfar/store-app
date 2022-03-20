import React from 'react';
import {NavLink} from 'react-router-dom';
import './banner.css';

function Banner (props){
    return(
        <div className={`carousel-item ${(props.class? props.class : '' )} justify-content-center align-items-center`}  style={{backgroundImage:`url(${props.src})`}}>
            <div className="carousel-caption d-block d-md-block">
                <div className="sub-title">{props.subTile}</div>
                <h3><span>{props.tilt}</span> {props.tiltWhite}</h3>
                <NavLink className="d-inline-flex justify-content-center align-items-center text-decoration-none" to="/shop">START SHOPPING</NavLink>
            </div>
        </div>
    )
}

export default Banner;