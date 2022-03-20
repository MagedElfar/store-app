import React , {useState} from "react";
import db from './../../Fire Base/firebase';
import sideBarcCntext from "../../Context/context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

function Wishlist (props){
    const {image , name , id } = props.cart;
    
    let index = props.index;
    async function deleteCart(cart ,user , updateCart , id){
        try{
            if(user){
                db.collection("user").doc(user.id).collection("wishlist").doc(props.pro.id).delete().then(()=>{
                    cart = cart.filter(item => {
                        return item.id != id
                    })
                }).then(() => {
                    updateCart(cart)
                })
            } else {
                cart = cart.filter(item => {
                    return item.id != id
                })
                updateCart(cart)
            }
        } catch(error){
            console.log(error)
        }
    }

    return(
        <>
            {
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item d-flex align-items-center col-1 justify-content-center">{++index}</li>
                <li className="list-group-item d-flex align-items-center col-9 col-md-10"><img className="produt-list-img" src={image[0]}/> <span className="text-capitalize pro-name-font-size">{name}</span></li>
                <li className="list-group-item d-flex align-items-center col-1 justify-content-center">
                    <sideBarcCntext.Consumer>
                        {
                            ({wishlist , setWishlist , user}) => {
                                return(
                                    <dv onClick={() => deleteCart(wishlist ,user , setWishlist , id)} className="btn"><FontAwesomeIcon icon={faTimes} /></dv>
                                )
                            }
                        }
                    </sideBarcCntext.Consumer>
                </li>                         
            </ul>}
        </>
    )
}

export default Wishlist;