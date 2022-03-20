import React from 'react';
import Bg from './../../../src/Assets/image/pexels-philipp-birmes-830891-scaled-1.jpg';
import './main-banner.css'

function MainBanner(props){
    return(
        <section className="main-banner d-flex align-items-center justify-content-center" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)) , url(${Bg})`}}>
            <h3 className="text-capitalize">{props.title}</h3>
        </section>
    );
}

export default MainBanner;