import React from 'react';
import Card from './../card/card'

function Product (props){
    const product = props.pro.map((item , index) => {
        const {name , image , id} = item;
        return (
            <li key={index} className="col-12 col-lg-4">
                <Card product={item} />
            </li>
        )
    })
    return(
        <ul className="list-unstyled row mx-0">
            {product}
        </ul>
    )
}

export default Product;