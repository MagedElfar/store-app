import React from 'react';
import {NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';
import style from './category.module.css';

function Category (props) {
    return(
        <NavLink to={`/category/${props.title}`} className={`text-decoration-none d-inline-block`}>
            <div className={`row  mx-0 cat-container ${style["cat-container"]}`}>
                <div className={`${style["cat-titles"]} col-12 col-md-6 col-lg-4`}>
                    <h4 className='text-uppercase'>{props.title}</h4>
                    <span className="fst-italic d-flex align-items-center">Shop now <FontAwesomeIcon icon={faLongArrowAltRight} /></span>
                </div>
                <div className={`${style["cat-image"]} col-12 col-md-6 col-lg-8 d-flex justify-content-end align-items-center`}>
                    <img src={props.src} />
                </div>
            </div>
        </NavLink>
    )
}

export default Category;