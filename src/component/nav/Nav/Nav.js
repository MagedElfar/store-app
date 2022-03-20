import React , {Component} from 'react';
import logo from './../../../Assets/logo.svg'
import {NavLink , Link} from 'react-router-dom';
import Menu from '../menu/Menu';
import style from './Nav.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch , faShoppingCart , faHeart} from '@fortawesome/free-solid-svg-icons';
import sideBarcCntext from '../../../Context/context';

class Nav extends Component {
    render(){
        return(
            <nav className={`px-2 navbar navbar-expand-lg navbar-light bg-light ${style.nav}`}>
                <div className="container-fluid">
                    <div className="col-6 col-lg-2 order-2 order-lg-1">
                        <NavLink className="navbar-brand d-flex align-items-center" to="/">
                            <img className={style.logo} src={logo} />
                        </NavLink>
                    </div>
                    <div className="col-3 col-lg-8 order-1 order-lg-2">
                        <Menu />
                    </div>
                    <div className={`col-3 d-flex justify-content-end col-lg-2 order-3 d-flex order-lg-3 ${style['shop-icons']}`}>
                        <sideBarcCntext.Consumer>
                            {
                                ({openSideBar , cart , wishlist})=>
                                    <>
                                        <div className={style['nav-search']}>
                                            <FontAwesomeIcon icon={faSearch} onClick={()=> openSideBar()}/>
                                        </div>
                                        <div className={style['nav-cart']} >
                                            <Link to="/cart">
                                                <FontAwesomeIcon icon={faShoppingCart} />
                                                <span className={style['nav-car-qunt']}>{cart.length}</span>
                                            </Link>
                                        </div>
                                        <div className={style['nav-cart']} >
                                            <Link to="/wishlist">
                                                <FontAwesomeIcon icon={faHeart} />
                                                <span className={style['nav-car-qunt']}>{wishlist.length}</span>
                                            </Link>
                                        </div>
                                    </>
                            }
                        </sideBarcCntext.Consumer>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Nav