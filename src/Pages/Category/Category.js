import React from "react";
import {useParams} from 'react-router-dom';
import MainBanner from './../../component/main-banner/main-baner';
import Card from './../../component/card/card';
import sideBarcCntext from '../../Context/context';
import './Category.css';

function Category (props){
    const {cat} = useParams();

    return(
        <section className="category-page">
            <MainBanner title={cat} />
            <div className="container sec-padding">
                <sideBarcCntext.Consumer>
                    {
                        ({products}) => {
                            if(products){
                                let catArr = products.filter(item => {
                                    return item.category.includes(cat)
                                });
                                catArr = catArr.map((item , index) => {
                                    return(
                                        <div className="col-12 col-md-6 col-lg-4" key={index}>
                                            <Card product={item} index={index}/>
                                        </div>
                                    )
                                })
                                return(
                                    <div className="product-section row mx-0">
                                        {catArr}
                                    </div>
                                )
                            }
                        }
                    }
                </sideBarcCntext.Consumer>
            </div>
        </section>
    )
}

export default Category;