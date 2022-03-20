import React , { useState, useEffect } from 'react';
import Slider from "react-slick";
import './product.css'


function ProductSlider(props) {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);

    useEffect(() => {

        setNav1(slider1);
        setNav2(slider2);
    
    });
    

    const settings = {
        dots: false,
        infinite: true,
        autoplay: false,
        touchThreshold: true,
        touchMove: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.slider-nav',
        
    };

    const settingsThumbs = {
        slidesToShow: props.length,
        slidesToScroll: 1,
        infinite: true,
        arrows:false,
        asNavFor: '.slider-for',
        dots: false,
        centerMode: true,
        swipeToSlide: true,
        focusOnSelect: true,
        // centerPadding: '10px',
        vertical:true,
        //]adaptiveHeight:true
       
      };

    const slides = props.image.map((item , index) => {
       
        return (
            <div key={index}>
                <img src={item} />
            </div>
        )
    })
    return(
        <div className="row mx-0">
            <div className="col-0 col-md-2 nav-slider ps-0">
                <Slider 
                    {...settingsThumbs}
                    asNavFor={nav1}
                    ref={slider => (setSlider2(slider))}
                >
                    {slides}
                </Slider>
            </div>
            <div className="col-12 col-md-10 main-slider px-0">
                <Slider 
                    {...settings}
                    asNavFor={nav2}
                    ref={slider => (setSlider1(slider))}
                >
                    {slides}
                </Slider>
            </div>
        </div>
    )
}

export default ProductSlider;