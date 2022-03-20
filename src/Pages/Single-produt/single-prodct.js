import React, { useContext, useEffect, useState } from "react";
import {Link, useParams} from 'react-router-dom';
import AddToCard from "../../component/add to card/add-to-card";
import ProductSlider from "../../component/Products/product-page-slider";
import ProductCarousel from "../../component/Products/product-carousel";
import Card from './../../component/card/card';
import sideBarcCntext from '../../Context/context';
import db , {toggelSlug} from './../../Fire Base/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {faHeart as sHeart} from '@fortawesome/free-solid-svg-icons';
import './single-product.css';

function SingleProduct (props){
    const {name} = useParams();
    const proName = toggelSlug(name , "-" , " ");
    const [fav , setFav] = useState(false);
    const mainContext = useContext(sideBarcCntext)

    useEffect(() => {
        if(mainContext.products){
            const product = mainContext.products.find((item) => {
                return item.name == proName 
            })

            for(let i=0 ; i < mainContext.wishlist.length ; i++){
                if(mainContext.wishlist[i].id == product.id){
                    setFav(true);
                    break;
                }
            }
            console.log(mainContext.wishlist, "efff" , product.id)
        }
        
    } )

    function updatFavList(product , wishlist , user , setWishlist){
        try{
            if(user){
                if(!fav){
                    db.collection("user").doc(user.id).collection("wishlist").doc(product.id).set(product).then(() => {
                        wishlist.push(product)
                    }).then(() => {
                        setWishlist(wishlist);
                        setFav(true)
                    })
                } else {
                    db.collection("user").doc(user.id).collection("wishlist").doc(product.id).delete().then(() => {
                        wishlist = wishlist.filter(item => {
                            return item.id != product.id
                        })
                        setWishlist(wishlist);
                        setFav(false)
                    })
                }

            }else {
                if(!fav){
                   
                        wishlist.push(product)
                        setWishlist(wishlist);
                        setFav(true)
                } else {
                    wishlist = wishlist.filter(item => {
                        return item.id != product.id
                    })
                    setWishlist(wishlist);
                    setFav(false)
                }
            }

        } catch(error) {
            console.log(error)
        }
    }

    function salePrice (price , sale){
        return price - ((price * (sale / 100)))
    }
    
    function printTax(arr , link){
        const ele = arr.map((item, index) => {
            return(
                <li key={index} className="category">
                    {(link ? 
                        <span className="text-capitalize"><Link to={`/category/${item}`} className="text-decoration-none custom-link">{item} {(index < arr.length-1 ? "," : null)}</Link></span>
                     : <span className="text-capitalize">{item} {(index < arr.length-1 ? "," : null)}</span>)}
                </li>
            )
        }) 
        return(ele)
    }

    return(
        <section className="single-product-page">
            <nav aria-label="breadcrumb">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link className="custom-link text-decoration-none" to="/">Home</Link></li>
                        <li className="breadcrumb-item active text-capitalize" aria-current="page">{proName}</li>
                    </ol>
                </div>
            </nav>
            <div className="single-product-page-content">
                <sideBarcCntext.Consumer>
                    {
                        ({products , user , wishlist , setWishlist}) => {
                            if(products){
                                const product = products.find((item) => {
                                    return item.name == proName 
                                })

                                if(wishlist.includes(product)) {
                                    setFav(true)
                                }


                                const {id , category, image , size , gender , price , sale , expert , description} = product;

                                let catArr = products.filter(item => {
                                    return item.category.includes(category[0])
                                });

                                return(
                                    <>
                                        <div className="container">
                                            <div className="product-section product-page-section row mx-0">
                                                <div className="product-slider col-12 col-lg-6 ps-0">
                                                    <ProductSlider length={image.length} image={image}/>
                                                </div>
                                                <div className="col-12 col-lg-6">
                                                    <h5 className="text-capitalize">{proName}</h5>
                                                    <div className="pro-price">
                                                        <span className="price text-center genral-title-style text-center d-block fw-normal"><span className={`d-inline-block ${(sale && sale > 0 ? "text-decoration-line-through" : "text-decoration-none")}`}>{price},00$ </span>{(sale && sale > 0 ? <span className="d-inline-block sale-price">{salePrice(price , sale)},00$</span> : null)}</span>
                                                    </div>
                                                    <div className="pro-description">
                                                        <p className="text-color">{expert}</p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <span className="text-color tax-prifex">Category:</span>
                                                        <ul className = "tax-list d-flex mx-0 mt-0 mb-0 px-0">
                                                            {printTax(category , true)}
                                                        </ul>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-center justify-content-lg-start add-to-card-pro">
                                                        <div><AddToCard pro={product} /></div>
                                                        <div onClick={() => updatFavList(product , wishlist , user , setWishlist)}>
                                                            <span className="d-flex align-items-center justify-content-center fav-icon">
                                                                <FontAwesomeIcon icon={(fav == false ? faHeart : sHeart)}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-details">
                                            <div className="container">
                                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                                    <li className="nav-item" role="presentation">
                                                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Description</button>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Additional Information</button>
                                                    </li>
                                                </ul>
                                                <div className="tab-content" id="pills-tabContent">
                                                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">{description}</div>
                                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                                    <ul className="list-group list-group-horizontal">
                                                        <li className="list-group-item">Size</li>
                                                        <li className="list-group-item">
                                                            <ul className = "tax-list d-flex mx-0 mt-0 mb-0 px-0">
                                                                {printTax(size , false)}
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                    <ul className="list-group list-group-horizontal">
                                                        <li className="list-group-item">Gender</li>
                                                        <li className="list-group-item">
                                                            <ul className = "tax-list d-flex mx-0 mt-0 mb-0 px-0">
                                                                {printTax(gender , false)}
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <section className="product-section sec-padding">
                                            <div className="container">
                                            <ProductCarousel keys={"1"} title="RELATED PRODUCTS" pro={catArr} />
                                            </div>
                                        </section>
                                    </>
                                )
                            }
                        }
                    }
                </sideBarcCntext.Consumer>
            </div>
        </section>
    )
}

export default SingleProduct;