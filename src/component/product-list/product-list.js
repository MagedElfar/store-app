import React , {useState} from "react";
import { Link } from "react-router-dom";
import db , {toggelSlug} from './../../Fire Base/firebase';
import sideBarcCntext from "../../Context/context";
import {faTimes , faStar } from '@fortawesome/free-solid-svg-icons';
import{faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import './product-list.css';
import UpdateProductForm from "../../Forms/update-product-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function List (props){
    const {image , name , id , featured} = props.product;
    const [toggelOpen , setOPen] = useState(false);
    
    function toggelForm(){
      setOPen(!toggelOpen)
    }

    let index = props.index;
    async function deleteProduct(id ,products , updateProducts){
        try{
            await db.collection("Products").doc(id).delete().then(() => {
                products = products.filter((item => {
                    return item.id != id;
                }))
            }).then(()=>{
                updateProducts(products)
            })
        } catch(error){
            console.log(error)
        }
    }

    async function toggelFeatured (id ,products , updateProducts){
        props.product.featured = !featured;
        try{
            await db.collection("Products").doc(id).update(props.product).then(() => {
                products = products.map(item => {
                    if(item.id == id){
                        return props.product
                    } else{
                        return item;
                    }
                })
            }).then(()=>{
                updateProducts(products)
            })
        } catch(error){
            console.log(error)
        }
    }
    return(
        <>
            {(toggelOpen? 
            <div className="update-product-form d-flex align-items-center">
                <FontAwesomeIcon className="update-product-form-close" onClick={toggelForm} icon={faTimes} />
                <UpdateProductForm product={props.product} />
            </div> :
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item d-flex align-items-center col-lg-1 justify-content-center">{++index}</li>
                <li className="list-group-item d-flex align-items-center col-lg-1 justify-content-center">
                    <sideBarcCntext.Consumer>
                        {
                            ({products , updateProducts}) => {
                                return(
                                    <button onClick={() => toggelFeatured(id ,products , updateProducts)} className="btn btn-featured">{(featured? <FontAwesomeIcon icon={faStar} /> : <FontAwesomeIcon icon={farStar} />)}</button>
                                )
                            }
                        }
                    </sideBarcCntext.Consumer>
                </li>  
                <li className="list-group-item d-flex align-items-center col-lg-4"><img className="produt-list-img" src={image[0]}/> <span>{name}</span></li>
                <li className="list-group-item d-flex align-items-center col-lg-2 justify-content-center"><button className="btn btn-success"><Link to={`/product/${toggelSlug(name, " " , "-")}`} className="text-decoration-none product-link">View</Link></button></li>
                <li className="list-group-item d-flex align-items-center col-lg-2 justify-content-center"><button className="btn btn-primary" onClick={toggelForm}>Edit</button></li>
                <li className="list-group-item d-flex align-items-center col-lg-2 justify-content-center">
                    <sideBarcCntext.Consumer>
                        {
                            ({products , updateProducts}) => {
                                return(
                                    <button onClick={() => deleteProduct(id ,products , updateProducts)} className="btn btn-danger">Delete</button>
                                )
                            }
                        }
                    </sideBarcCntext.Consumer>
                </li>                         
            </ul>)}
        </>
    )
}

export default List;