import React from "react";
import { Link } from "react-router-dom";
import logo from "./../../Assets/image/footer-logo_200x.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope , faPhone} from '@fortawesome/free-solid-svg-icons'
import './footer.css'

function Footer (props){
    return(
        <footer>
            <div className="footer-links">
                <div className="container">
                    <div className="row mx-0">
                        <div className="col-12 col-md-6 col-lg-4">
                            <Link to="/">
                                <img src={logo} />
                            </Link>
                            <div className="footer-email">
                                <a href="mailto:maged.1992.me@gmail.com">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    maged.1992.me@gmail.com
                                </a>
                            </div>
                            <div className="footer-tel">
                                <a href="tel:00201115138688">
                                    <FontAwesomeIcon icon={faPhone} />
                                    00201115138688
                                </a>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="footer-links-title">
                                <h5>Quick Links</h5>
                            </div>
                            <div className="footer-pages-links">
                                <Link to="/">
                                    Home
                                </Link>
                                <Link to="/shop">
                                    Shop
                                </Link>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 fotter-last">
                            <div className="footer-links-title">
                                <h5>Categories</h5>
                            </div>
                            <div className="footer-pages-links">
                                <Link to="category/sport">
                                    Sport
                                </Link>
                                <Link to="category/clothing">
                                    Clothing
                                </Link>
                                <Link to="category/accessories">
                                    Accessories
                                </Link>
                                <Link to="category/electronic">
                                    Electronic
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;