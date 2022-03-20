import React from 'react';
import MainBanner from './../../component/main-banner/main-baner'
import SettingMenu from '../../component/nav/menu/setting-menu';
import sideBarcCntext from '../../Context/context';
import List from '../../component/product-list/product-list';

function UpdateProducts(props){
    return(
            <section className="Product-list-page">
                <MainBanner title={"Products"} />
                <div className="row mx-0">
                    <div className="order-2 order-md-1 setting-menu-side col-12 col-md-4 col-lg-3">
                        <SettingMenu />
                    </div>
                    <div className="order-1 order-md-2 setting-side col-12 col-md-8 col-lg-9">
                        <h2>All Products:</h2>
                        <sideBarcCntext.Consumer>
                            {
                                ({products , updateProducts}) => {
                                    if(products){
                                        const product = products.map((item , index) => {
                                            return(
                                                <li className="list-group-item" key={index}>
                                                    <List product={item} index={index}/>
                                                </li>
                                            )
                                        })
                                        return(
                                            <div className="container">
                                                <ul className="list-group update-section">
                                                    {product}
                                                </ul>
                                            </div>
                                        )
                                    }
                                }
                            }
                        </sideBarcCntext.Consumer>
                    </div>
                </div>
            </section>
    )
}

export default UpdateProducts;