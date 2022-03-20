import React, { useContext } from 'react';
import {NavLink} from 'react-router-dom';
import style from './Menu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import sideBarcCntext from '../../../Context/context';
import {auth} from './../../../Fire Base/firebase';
import {useHistory} from 'react-router-dom';


function SettingMenu (){

    const history =useHistory();
    const mainContext = useContext(sideBarcCntext)


    function logOut(userUpdate){
        auth.signOut().then( () =>{
            userUpdate(null);
            mainContext.updateCart([]);
            mainContext.setWishlist([])
            history.push("/");
        })
    }
    
    return(
        <>
            <div className="setting-menu">
                <h2><FontAwesomeIcon icon={faCog} />Setting:</h2>
                <ul className="navbar-nav mb-2 mb-lg-0">
                    {(mainContext.user ?
                        <li className="nav-item">
                            <NavLink activeClassName="settin-selected" exact className={`fs-6 fw-bold nav-link text-capitalize ${style['nav-link']}`} aria-current="page" to="/account">Account</NavLink>
                        </li>
                    : null)}
                    <li className="nav-item">
                        <NavLink activeClassName="settin-selected" className={`fs-6 nav-link fw-bold text-capitalize ${style['nav-link']}`} to="/cart">Cart</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="settin-selected" className={`fs-6 nav-link fw-bold text-capitalize ${style['nav-link']}`} to="/wishlist">Wishlist</NavLink>
                    </li>
                    {(mainContext.user ?
                        <li className="nav-item mobile-pl">
                            <NavLink activeClassName="settin-selected" className={`fs-6 nav-link fw-bold text-capitalize ${style['nav-link']}`} to="/product-list">Product List</NavLink>
                        </li>
                    : null)}
                    {(mainContext.user ?
                        <li className="nav-item mobile-pl">
                            <NavLink activeClassName="settin-selected" className={`fs-6 nav-link fw-bold text-capitalize ${style['nav-link']}`} to="/add-product">Add New Product</NavLink>
                        </li>
                    : null)}
                    {(mainContext.user ?
                        <li>
                        <sideBarcCntext.Consumer>
                            {
                                ({userUpdate , user}) => {
                                    return(
                                        <>
                                            <button className={`log-out-btn btn fs-6 nav-link fw-bold text-capitalize ${style['nav-link']}`} onClick={() => logOut(userUpdate)}>Log Out</button>
                                        </>
                                    )
                                }
                            }
                        </sideBarcCntext.Consumer>
                    </li>
                    : null)}
                </ul>

            </div>
        </>
    )
}

export default SettingMenu;