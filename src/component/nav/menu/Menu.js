import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './Menu.module.css';
import sideBarcCntext from './../../../Context/context'


function Menu (){
    return(
        <>
            <button className={`navbar-toggler ${style['menu-toggle']}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink activeClassName="selected" exact className={`fs-6 fw-bold nav-link text-capitalize ${style['nav-link']}`} aria-current="page" to="/">home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="selected" className={`fs-6 nav-link fw-bold text-capitalize ${style['nav-link']}`} to="/shop">shop</NavLink>
                    </li>
                    <sideBarcCntext.Consumer>
                                    {
                                        ({user}) =>{
                                            if(!user){
                                                return(
                                                    <>
                                                    <li className="nav-item mobile-link">
                                                        <NavLink className={`fs-6 nav-link fw-bold text-capitalize ${style['nav-link']}`} to="/login">Login</NavLink> 
                                                    </li>
                                                    <li className="nav-item mobile-link">
                                                        <NavLink className={`fs-6 nav-link fw-bold text-capitalize ${style['nav-link']}`} to="/register">Register</NavLink>
                                                    </li>
                                                    </>
                                                )    
                                            }
                                        }
                                    }
                                </sideBarcCntext.Consumer>
                </ul>

            </div>
        </>
    )
}

export default Menu;