import React from "react";
import {NavLink} from 'react-router-dom';
import {toggelSlug} from './../../Fire Base/firebase';
import AddToCard from './../add to card/add-to-card'
import './card.css'

function Card(props){
    const {name , image , price , sale } = props.product;

    function salePrice (price , sale){
        return price - ((price * (sale / 100)))
    }
    
    const images = image.map((item , index) => {
        if (index > 1) return;
        return(
            <div key={index} className={`d-flex align-items-center justify-content-center card-image card-image-${++index}`}>
                <img src={item} className="card-img-top" alt="..."/>
            </div>
        )
    });

    return(
        <div className="product-card">
            <div className="card">
                <NavLink to={`/product/${toggelSlug(name, " " , "-")}`} className="d-block text-decoration-none">
                    {images}
                </NavLink>
                {(sale && sale > 0 ? <div className="sale d-flex align-items-center justify-content-center">-{sale}%</div> : null)}
                <div className="add-to-car-form">
                    <AddToCard pro={props.product} />
                </div>
            </div>
            <div className="card-body">
                <NavLink to={`/product/${toggelSlug(name, " " , "-")}`} className="d-block text-decoration-none">
                    <h5 className="card-title genral-title-style text-center text-capitalize">{name}</h5>
                    <span className="price text-center genral-title-style text-center d-block fw-normal"><span className={`d-inline-block ${(sale && sale > 0 ? "text-decoration-line-through" : "text-decoration-none")}`}>{price},00$ </span>{(sale && sale > 0 ? <span className="d-inline-block sale-price">{salePrice(price , sale)},00$</span> : null)}</span>
                </NavLink>
            </div>
        </div>
    )
}

export default Card;