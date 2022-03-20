import React , {Component, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes , faSearch} from '@fortawesome/free-solid-svg-icons'
import style from './Content.module.css';
import {toggelSlug} from './../../../../Fire Base/firebase'
import sideBarcCntext from '../../../../Context/context';
import { Link } from 'react-router-dom';
import './conttnt.css'

class Content extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: props.title,
            filerArr: []
        }
        
    }

    handelFilter = (e , products) => {
        if(e.target.value.length == 0){
            this.setState({filerArr: []})

        } else {
            let filerArr = products.filter(item => {
                return item.name.includes(e.target.value.toLowerCase());
            });
            this.setState({filerArr})
        }
    }

    render(){
        return(
            <sideBarcCntext.Consumer>
            {
                ({closSideBar , products}) =>{
                                const arr = this.state.filerArr.map((item , index) => {
                                    const {image , name} = item;
                                    return(
                                        <li className="list-group-item d-flex align-items-center">
                                            <img src={image[0]} />
                                            <Link to={`/product/${toggelSlug(name, " " , "-")}`} className="text-decoration-none product-link">{name}</Link>
                                        </li>
                                    )
                                })

                                return(
                                    <div className="seacrch-filter">
                                    <div className={`${style["side-bar-title"]}`}>
                                        <h3 className="text-uppercase fs-6 text">{this.state.title}</h3>
                                        <div onClick={() => closSideBar()} className={`${style['close-btn']}`}><FontAwesomeIcon icon={faTimes}/></div>
                                    </div>
                                        <div class="input-group mb-3">
                                            <span class="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faSearch}/></span>
                                            <input type="text" class="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" onChange = {(e) =>this.handelFilter(e , products)}/>
                                        </div>
                                        <div>
                                            <ul className="list-group">
                                                {arr}
                                            </ul>
                                        </div>
                                    </div>
                                )
                            }
                                
                            
                        }

                    
             
           </sideBarcCntext.Consumer>
        )
    }

}

export default Content;