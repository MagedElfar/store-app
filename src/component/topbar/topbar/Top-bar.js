import React , {Component} from 'react';
import TopBarSlide from '../tob-bar-slid/TobBarSlid';
import {faFacebookF , faTwitter , faInstagram , faDribbble , faPinterest , faYoutube} from '@fortawesome/free-brands-svg-icons';
import style from './TobBar.module.css';
import Social from '../social/social';
import { NavLink } from 'react-router-dom';
import sideBarcCntext from '../../../Context/context';

class TobBar extends Component {
    constructor(props){
        super(props);
        this.content = [
            {
              text: 'Summer sale discount off 50% shop now',
              className: `classA ${style['text-color']}`,
              animation: 'fade',
            },
            {
              text: 'MADE WITH LOVE',
              className:`classB ${style['text-color']}`,
              animation: 'fade',
            },
            {
              text: 'Customer support is second to none',
              className: `classC ${style['text-color']}`,
              animation: 'fade',
            }
          ];
          this.brand = [
              {brandName: "Facebook" , icon: faFacebookF},
              {brandName: "Twitter" , icon: faTwitter},
              {brandName: "Instagram" , icon: faInstagram},
              {brandName: "Dribbble" , icon: faDribbble},
              {brandName: "Pinterest" , icon: faPinterest},
              {brandName: "Youtube" , icon: faYoutube}
            ]
    }

    render(){
        return(
            <section className={`px-2 ${style['top-bar-container']}`}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col d-none d-lg-block d-xl-block">
                            <Social brand={this.brand} />
                        </div>
                        <div className={`col ${style['text-rout']}`}>
                            <TopBarSlide content={this.content}/>
                        </div>
                        <div className="col d-none d-lg-block d-xl-block">
                            <div className={`${style["aut-links"]} d-flex justify-content-end`}>
                                <sideBarcCntext.Consumer>
                                    {
                                        ({user}) =>{
                                            if(user){
                                                const {userName , image} = user;
                                                return(
                                                    <>
                                                        <div className={`${style["user-img"]} top-bar-user user-update-img`} style={{backgroundImage: `url(${image})`}}></div>
                                                        <NavLink to="/account" className="text-decoration-none">{userName}</NavLink>
                                                    </>
                                                )
                                            } else{
                                                return(
                                                    <>
                                                        <NavLink to="/login" className="text-decoration-none">Login</NavLink> 
                                                        <span>/</span>
                                                        <NavLink to="/register" className="text-decoration-none">Register</NavLink>
                                                    </>
                                                )    
                                            }
                                        }
                                    }
                                </sideBarcCntext.Consumer>
                            </div> 
                        </div>
                    </div>
                </div>
            </section>
        )
    }

}

export default TobBar;