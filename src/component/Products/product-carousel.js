import React from 'react';
import Card from './../card/card';
import Slider from "react-slick";
import './product.css'


function ProductCarousel(props) {

    var settings = {
    dots: false,
    infinite: (props.pro.length >  2 ? true : false ),
    autoplay: true,
    touchThreshold: true,
    touchMove: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1
          }
        }
      ]
  };
    const product = props.pro.map((item , index) => {
        const {name , image , id} = item;
        return (
            <div key={`${id}${props.keys}`}>
                <Card product={item} />
            </div>
        )
    })
    return(
        <>
            <h2 className="product-slider-title fw-normal genral-title-style">{props.title}</h2>
            <Slider {...settings}>
                {product}
            </Slider>
        </>
    )
}

export default ProductCarousel;