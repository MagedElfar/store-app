import React from 'react';
import MainBanner from './../../component/main-banner/main-baner'
import SettingMenu from '../../component/nav/menu/setting-menu';
import sideBarcCntext from '../../Context/context';
import CartList from '../../component/cart-list/cart-list';
import './cart.css'

function CartPage(props){
    return(
            <section className="cart-page">
                <MainBanner title={"Cart"} />
                <div className="row mx-0">
                    <div className="order-2 order-md-1 setting-menu-side col-12 col-md-4 col-lg-3">
                        <SettingMenu />
                    </div>
                    <div className="order-1 order-md-2 setting-side col-12 col-md-8 col-lg-9">
                        <h2>Cart:</h2>
                        <sideBarcCntext.Consumer>
                            {
                                ({cart , products}) => {
                                    
                                    const myCart = cart.map((item , index) => {
                                        const product = products.find(ele => {
                                            return ele.id == item.id
                                        })

                                        return(
                                            <li className="list-group-item" key={index}>
                                                <CartList pro={product} cart={item} index={index}/>
                                            </li>
                                        )
                                    })
                                    return(
                                        <div className="container">
                                            <ul className="mx-auto list-group update-section">
                                                {myCart}
                                            </ul>
                                        </div>
                                    )
                            }
                            }
                        </sideBarcCntext.Consumer>
                    </div>
                </div>
            </section>
    )
}

export default CartPage;