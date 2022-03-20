import React , {useState} from 'react';
import sideBarcCntext from '../../Context/context';
import db from '../../Fire Base/firebase';

function AddToCard(props){
    const [quantity , setQuantity] = useState(1);
    const {name , image , price , sale , id} = props.pro;

    function salePrice (price , sale){
        return price - ((price * (sale / 100)))
    }

    const mycart = {
        name,
        id,
        price: salePrice (price , sale),
        image: image[0],
        quantity:1
    }

    const [cart , setCart] = useState(mycart)

    function handelQuantity(mark){
        let qunt = quantity;
        if(mark == "--" && quantity > 1){
            setQuantity(--qunt)
        } else if(mark == "++") {
            setQuantity(++qunt)
        }

        console.log("clicked")

        mycart.quantity = qunt;
        setCart(mycart)
        console.log(cart)
    }

    function handelChange(e){
        setQuantity(e.target.value)
        mycart[e.target.name] = e.target.value;
        setCart(mycart)
        console.log(cart)
    }

    function cardSubmit(e , uid , updateCart , newCart){
        e.preventDefault();
        console.log(newCart , 'seb')
        try{
            if(uid){
                db.collection("user").doc(uid.id).collection("cart").doc(id).set(cart).then(() =>{
                    alert("Product is added to cart")
                }).then(() => {
                    let newIndex = newCart.findIndex((item) => item.id == cart.id)
                    console.log(newIndex)
                    if(newIndex > -1 ){
                        newCart.splice(newIndex , 1 , cart)
                    } else{
                        newCart.push(cart)
                    }
                }).then(() => {
                    updateCart(newCart);
                    console.log(newCart , "fter")
                })
            } else {
                let newIndex = newCart.findIndex((item) => item.id == cart.id)
                console.log(newIndex)
                if(newIndex > -1 ){
                    newCart.splice(newIndex , 1 , cart)
                } else{
                    newCart.push(cart)
                }
                updateCart(newCart);
            }

            if(props.setOPen){
                props.setOPen()
            }
        } catch (error) {
           
        }

    }

    return(
        <>
            <sideBarcCntext.Consumer>
                {
                    ({user , updateCart , cart}) => {
                        return(
                            <>
                                <form onSubmit={(e) => cardSubmit(e , user , updateCart , cart)}>
                                    <div className="add-to-cart-input" onSubmit={cardSubmit}>
                                        <button type="button" className={`btn add-to-card-btn`} onClick={() => handelQuantity("--")}>-</button>
                                        <input value={quantity} name="quantity" onChange={handelChange}/>
                                        <button type="button" className={`btn add-to-card-btn`} onClick={() => handelQuantity("++")}>+</button>
                                    </div>
                                    <button type="submit" className={`btn add-to-card-submit`}>ADD TO CART</button>
                                </form>
                            </>
                        )
                    }
                }
            </sideBarcCntext.Consumer>
        </>
    )
}

export default AddToCard