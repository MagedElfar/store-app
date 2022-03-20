import React , {useState} from "react";
import db from './../../Fire Base/firebase';
import sideBarcCntext from "../../Context/context";
import AddToCard from "../add to card/add-to-card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

function CartList (props){
    const {image , name , id , quantity , price} = props.cart;
    const [toggelOpen , setOPen] = useState(false);
    
    function toggelForm(){
      setOPen(!toggelOpen)
    }

    let index = props.index;
    async function deleteCart(cart ,user , updateCart , id){
        try{
            if(user){
                db.collection("user").doc(user.id).collection("cart").doc(props.pro.id).delete().then(()=>{
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
            <ul className="list-group list-group-horizontal flex-wrap">
                <li className="list-group-item d-flex align-items-center col-2 col-md-1 justify-content-center">{++index}</li>
                <li className="list-group-item d-flex align-items-center col-9 col-md-6"><img className="produt-list-img" src={image}/> <span className="pro-name-font-size">{name}</span></li>
                <li className="list-group-item d-flex align-items-center col-2  col-md-1 col-lg-2 justify-content-center">{(toggelOpen ? <AddToCard setOPen={toggelForm} pro={props.pro} /> : <spna d-block className="cart-qun" onClick={toggelForm}>{quantity}</spna>)}</li>
                <li className="list-group-item d-flex align-items-center col-8 col-md-3 col-lg-2 justify-content-center">{quantity * price} $</li>
                <li className="list-group-item d-flex align-items-center col-1 justify-content-center">
                    <sideBarcCntext.Consumer>
                        {
                            ({cart , updateCart , user}) => {
                                return(
                                    <div onClick={() => deleteCart(cart ,user , updateCart , id)} className="bt">
                                        <FontAwesomeIcon icon={faTimes} />
                                    </div>
                                )
                            }
                        }
                    </sideBarcCntext.Consumer>
                </li>                         
            </ul>}
        </>
    )
}

export default CartList;