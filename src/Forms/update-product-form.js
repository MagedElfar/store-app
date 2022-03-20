import React , {useState} from 'react';
import db , { storage } from '../Fire Base/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner , faTimes} from '@fortawesome/free-solid-svg-icons';
import sideBarcCntext from '../Context/context';



function UpdateProductForm (props){
    const product = props.product;
    const [msg , setMsg] = useState("")
    const [showMsg , setShow]= useState(false);
    const [spinner , setSpinner] = useState(false)
    const [btnSpinner , setBtnSpinner] = useState(false);
    
    function toggelShow(){
        setShow(false)
    }


    async function handleImage(e) {
        let ImageUrl = [];
        setSpinner(true)
        for (let i = 0; i < e.target.files.length; i++) {
            await storage.ref(`images/${e.target.files[i].name}`).put(e.target.files[i])
            await  storage.ref().child(`images/${e.target.files[i].name}`).getDownloadURL().then((url) => {
                ImageUrl.push(url);
                console.log("url",  product)
            });

            product[e.target.name] = [...ImageUrl];
        }
        setSpinner(false)
        console.log(product ,"teeeeeeeeeeeeeeee")
    }

    function setValues (e){
        product[e.target.name]= e.target.value.toLowerCase();;
        console.log(product)
    }

    function setCategory (e){
        let values = new Set()
        product[e.target.name].forEach((item) => {
            values.add(item)
        })
        if(e.target.checked){
            values.add(e.target.value)
        } else {
            values.delete(e.target.value)
        }
        product[e.target.name] = [...values]
       console.log(product);
    }

    async function formSubmit(e , products , updateProducts){
        e.preventDefault();
        setShow(false);
        setBtnSpinner(true)
        try{
            await db.collection("Products").doc(product.id).update(product).then(() => {
                products = products.map(item => {
                    if(item.id == product.id){
                        return product
                    } else{
                        return item;
                    }
                })
            }).then(() => {
                updateProducts(products)
                setShow(true);
                setBtnSpinner(false);
                setMsg("Your Product has Edtited Succefuly..")
            })
        } catch(error){
            console.log(error)
        }
    }

    return(
        <sideBarcCntext.Consumer>
            {
                ({products , updateProducts}) => {
                    return(
                        <div className="container">
                            {(showMsg == true ? <div className="alert alert-success d-flex justify-content-between" role="alert">{msg} <span onClick={toggelShow}><FontAwesomeIcon icon={faTimes} /></span></div>:"")}
                            <form className="row" onSubmit={(e) => formSubmit(e,products,updateProducts)}>
                                <div className="mb-3 col-12">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Product Name:</label>
                                    <input defaultValue={product.name} type="text" className="form-control" name="name" onChange = {setValues}/>
                                </div>
                                <div className="mb-3 col-12 col-lg-6">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Product price:</label>
                                    <input defaultValue={product.price} type="number" className="form-control" name="price" onChange = {setValues}/>
                                </div>
                                <div className="mb-3 col-12 col-lg-6">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Discount Percentage:</label>
                                    <input defaultValue={product.sale} type="number" className="form-control" name="sale" onChange = {setValues}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Product Category:</label>
                                    <div className="row mx-0">
                                        <div className="form-check col-3">
                                            <input defaultChecked={(product.category.includes("sport")? true : false)} className="form-check-input" name="category" type="checkbox" id="flexCheckDefault-sport" value="sport" onChange = {setCategory}/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault-sport">Sport</label>
                                        </div>
                                        <div className="form-check col-3">
                                            <input defaultChecked={(product.category.includes("clothing")? true : false)} className="form-check-input" name="category" type="checkbox" id="flexCheckDefault-clothing" value="clothing" onChange = {setCategory}/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault-clothing">Clothing</label>
                                        </div>
                                        <div className="form-check col-3">
                                            <input checked={(product.category.includes("accessories")? true : false)} className="form-check-input" name="category" type="checkbox" id="flexCheckDefault-accessories" value="accessories" onChange = {setCategory}/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault-accessories">Accessories</label>
                                        </div>
                                        <div className="form-check col-3">
                                            <input checked={(product.category.includes("electronic")? true : false)}  className="form-check-input" name="category" type="checkbox" id="flexCheckDefault-electronic" value="electronic" onChange = {setCategory}/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault-electronic">Electronic</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Size:</label>
                                    <div className="row mx-0">
                                        <div className="form-check col-3">
                                            <input defaultChecked={(product.size.includes("s")? true : false)} className="form-check-input" name="size" type="checkbox" id="flexCheckDefault-s" value="S" onChange = {setCategory}/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault-s">S</label>
                                        </div>
                                        <div className="form-check col-3">
                                            <input defaultChecked={(product.size.includes("m")? true : false)} className="form-check-input" name="size" type="checkbox" id="flexCheckDefault-m" value="m" onChange = {setCategory}/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault-m">M</label>
                                        </div>
                                        <div className="form-check col-3">
                                            <input defaultChecked={(product.size.includes("l")? true : false)} className="form-check-input" name="size" type="checkbox" id="flexCheckDefault-l" value="l" onChange = {setCategory}/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault-l">L</label>
                                        </div>
                                        <div className="form-check col-3">
                                            <input defaultChecked={(product.size.includes("xl")? true : false)} className="form-check-input" name="category" type="checkbox" id="flexCheckDefault-xl" value="xl" onChange = {setCategory}/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault-xl">XL</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Gender:</label>
                                    <div className="row mx-0">
                                        <div className="form-check col-3">
                                            <input defaultChecked={(product.gender.includes("men")? true : false)} className="form-check-input" name="gender" type="checkbox" id="flexCheckDefault-man" value="men" onChange = {setCategory}/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault-man">Men</label>
                                        </div>
                                        <div className="form-check col-3">
                                            <input defaultChecked={(product.gender.includes("women")? true : false)} className="form-check-input" name="gender" type="checkbox" id="flexCheckDefault-woman" value="women" onChange = {setCategory}/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault-woman">Women</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Product Image:</label>
                                    <input type="file" multiple  className="form-control"  name="image" onChange={(e) => handleImage(e)}/>
                                    {(spinner == true ?<span className="spinner"><FontAwesomeIcon icon={faSpinner} /></span>: null)}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Expert:</label>
                                    <textarea defaultValue={product.expert} type="text" className="form-control" name="expert" onChange = {setValues}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Product Description:</label>
                                    <textarea defaultValue={product.description} type="text" className="form-control" name="description" onChange = {setValues}></textarea>
                                </div>
                                <div className="row mx-0 justify-content-end">
                                    <button type="submit" className={`btn btn-primary col-4 col-md-2`}>
                                        {(btnSpinner == true ?<span className="spinner"><FontAwesomeIcon icon={faSpinner} /></span>: null)} Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    )
                    
                }
            }
        </sideBarcCntext.Consumer>
    )
}

export default UpdateProductForm;