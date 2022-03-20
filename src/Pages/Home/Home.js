import React from 'react';
import Slider from '../../component/slider/Slider';
import ProductCarousel from './../../component/Products/product-carousel'
import Category from '../../component/category/category';
import sideBarcCntext from '../../Context/context';
import './Home.css'
import Banner from '../../component/banner/banner';
import img from './../../../src/Assets/image/store-baner-if_1512x.jpg'

function Home (props){
        return(
            <div className="home">
                <section className="home-slider">
                    <Slider />
                </section>
                <section className="home-cats container sec-padding">
                    <div className="row mx-0">
                        <div className="col-12 col-md-6 home-left-cats">
                            <Category title={"sport"} src={'https://firebasestorage.googleapis.com/v0/b/react-store-8d220.appspot.com/o/category%2FSport_balls.svg-removebg-preview.png?alt=media&token=8ed05d03-219c-4d5f-a4fb-f0eb5047dbce'}/>
                            <Category title={"accessories"} src={'https://firebasestorage.googleapis.com/v0/b/react-store-8d220.appspot.com/o/category%2Fpng-clipart-handbag-clothing-accessories-leather-women-bag-fashion-clothing-accessories-removebg-preview.png?alt=media&token=8ebefa48-6e9a-41e2-8c9c-4261bf62b581'}/>
                        </div>
                        <div className="col-12 col-md-6 home-right-cats">
                            <Category title={"clothing"} src={'https://firebasestorage.googleapis.com/v0/b/react-store-8d220.appspot.com/o/category%2F570-5706689_clothes-rail-png-clothing-rack-png-transparent-png-removebg-preview.png?alt=media&token=37e821d3-29d6-44b9-8448-a8da12130796'}/>
                            <Category title={"electronic"} src={'https://firebasestorage.googleapis.com/v0/b/react-store-8d220.appspot.com/o/category%2F426-4268674_notch-display-mobile-png-png-download-notch-mobile-removebg-preview.png?alt=media&token=21b25958-b354-4131-bd58-c00bce4631f8'}/>
                        </div>
                    </div>
                </section>
                <section className="product-section sec-padding">
                    <div className="container">
                        <sideBarcCntext.Consumer>
                            {({products}) => {
                                if(products){
                                    if(products.length > 0){
                                        return(
                                            <>
                                                <ProductCarousel keys={"0"} title="LATEST PRODUCTS" pro={products} />
                                            </>
                                        )
                                    } else {
                                        return(
                                            <>
                                                "No Product Found"
                                            </>
                                        )
                                    }
                                    
                                } else {
                                    return(
                                        <>
                                            <div className="pro-spiner d-flex justify-content-center">
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            }}
                        </sideBarcCntext.Consumer>
                    </div>
                </section>
                <section className="home-banner-sec sec-padding">
                    <Banner src={"https://firebasestorage.googleapis.com/v0/b/react-store-8d220.appspot.com/o/category%2Fsaulo-mohana-wNz7_5EvUWU-unsplash-scaled%20-%20Copy.jpg?alt=media&token=54d069e2-3fbb-449d-a4da-d9e056725d92"} subTile={"MY NAME’S GECKO"} tilt={"THE BEST"} tiltWhite={"ONLONE SHOPPING"} btn={"PURCHASE NOW"} class={"d-block d-flex align-items-center"}/>
                </section>
                <section className="product-section sec-padding">
                    <div className="container">
                        <sideBarcCntext.Consumer>
                            {({products}) => {
                                if(products){
                                    if(products.length > 0){
                                        const filtterArr = products.filter((item => {
                                            return item.featured;
                                        }))
                                        return(
                                            <>
                                                <ProductCarousel keys={"1"} title="PUPULAR  PRODUCTS" pro={filtterArr} />
                                            </>
                                        )
                                    } else {
                                        return(
                                            <>
                                                "No Product Found"
                                            </>
                                        )
                                    }
                                    
                                } else {
                                    return(
                                        <>
                                            <div className="pro-spiner d-flex justify-content-center">
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            }}
                        </sideBarcCntext.Consumer>
                    </div>
                </section>
                <section style={{backgroundImage: `url(${img})`}} className="time-section d-flex justify-content-center align-items-center">
                    <div className="d-flex justify-content-center align-items-center flex-column">
                            <h3 className="text-white">GECKO STORE</h3>
                            <p className="text-white mb-0">184 Main Rd E, St Albans VIC 3021, Australia</p>
                            <div className="devider"></div>
                            <h5 className="text-white">Opening Hours</h5>
                            <p className="text-white mb-0">Monday to Friday: 9:00 AM – 9:00 PM</p>
                            <p className="text-white mb-0">Saturday to Sunday: 9:30 AM – 8:00 PM</p>
                    </div>
                </section>
            </div>
        )
}

export default Home ;