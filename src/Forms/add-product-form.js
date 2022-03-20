import React , {useState} from 'react';
import db , { storage } from '../Fire Base/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner , faTimes} from '@fortawesome/free-solid-svg-icons';
import sideBarcCntext from '../Context/context';



function AddProductForm (props){

    function pad2(n) {
        return (n < 10 ? '0' : '') + n;
    }
    
    const date = new Date();
    const month = pad2(date.getMonth()+1);//months (0-11)
    const day = pad2(date.getDate());//day (1-31)
    const year= date.getFullYear();
    const formattedDate =  day+"/"+month+"/"+year;

    let pproduct = {
        name: "",
        category: [],
        image: [],
        description: "",
        expert: "",
        price:null,
        sale:0,
        date: formattedDate,
        gender: [],
        size:[],
        featured:false
    }

    const [product , setProduct] = useState(pproduct)

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
        }
        product[e.target.name] = [...ImageUrl];
        setProduct(product)
        setSpinner(false)
        console.log(product ,"teeeeeeeeeeeeeeee")
    }

    function setValues (e){
        product[e.target.name]= e.target.value.toLowerCase();
        console.log(product)
    }

    function setCategory (e){
        let values = [...product[e.target.name]]
        if(e.target.checked){
            values.push(e.target.value)
        } else {
            values = values.filter((item => {
                return item != e.target.value;
            }))
        }
        product[e.target.name] = values
       console.log(product);
    }

    async function formSubmit(e , products , updateProducts){
        e.preventDefault();
        setShow(false);
        setBtnSpinner(true)
        try {
            if(product.image.length == 0){
                product.image[0] = "https://firebasestorage.googleapis.com/v0/b/react-store-8d220.appspot.com/o/placeholder.png?alt=media&token=2f24a6fe-c621-43fd-b973-3264fa18a8f0"
            };
            await db.collection("Products").add(product).then(()=>{
                products.unshift(product)
            }).then(()=>{
                updateProducts(products)
            }).then(() => {
                e.target.reset();
                setShow(true);
                setBtnSpinner(false);
                setMsg("Your Product has Added Succefuly..")
            })
        }
        catch(err) {
            setMsg(err)
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
                                    <input type="text" className="form-control" name="name" onChange = {setValues}/>
                                </div>
                                <div className="mb-3 col-12 col-lg-6">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Product price:</label>
                                    <input type="number" className="form-control" name="price" onChange = {setValues}/>
                                </div>
                                <div className="mb-3 col-12 col-lg-6">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Discount Percentage:</label>
                                    <input type="number" className="form-control" name="sale" onChange = {setValues}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Product Category:</label>
                                    <div className="row mx-0">
                                        <div className="form-check col-3">
                                            <input className="form-check-input" name="category" type="checkbox" id="flexCheckDefault-sport" value="sport" onChange = {setCategory}/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault-sport">Sport</label>
                                        </div>
                                        <div className="form-check col-3">
                                            <input className="form-check-input" name="category" type="checkbox" id="flexCheckDefault-clothing" value="clothing" onChange = {setCategory}/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault-clothing">Clothing</label>
                                        </div>
                                        <div className="form-check col-3">
                                            <input className="form-check-input" name="category" type="checkbox" id="flexCheckDefault-accessories" value="accessories" onChange = {setCategory}/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault-accessories">Accessories</label>
                                        </div>
                                        <div className="form-check col-3">
                                            <input className="form-check-input" name="category" type="checkbox" id="flexCheckDefault-electronic" value="electronic" onChange = {setCategory}/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault-electronic">Electronic</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Size:</label>
                                    <div className="row mx-0">
                                        <div className="form-check col-3">
                                            <input className="form-check-input" name="size" type="checkbox" id="flexCheckDefault-s" value="S" onChange = {setCategory}/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault-s">S</label>
                                        </div>
                                        <div className="form-check col-3">
                                            <input className="form-check-input" name="size" type="checkbox" id="flexCheckDefault-m" value="m" onChange = {setCategory}/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault-m">M</label>
                                        </div>
                                        <div className="form-check col-3">
                                            <input className="form-check-input" name="size" type="checkbox" id="flexCheckDefault-l" value="l" onChange = {setCategory}/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault-l">L</label>
                                        </div>
                                        <div className="form-check col-3">
                                            <input className="form-check-input" name="category" type="checkbox" id="flexCheckDefault-xl" value="xl" onChange = {setCategory}/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault-xl">XL</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Gender:</label>
                                    <div className="row mx-0">
                                        <div className="form-check col-3">
                                            <input className="form-check-input" name="gender" type="checkbox" id="flexCheckDefault-men" value="men" onChange = {setCategory}/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault-men">Men</label>
                                        </div>
                                        <div className="form-check col-3">
                                            <input className="form-check-input" name="gender" type="checkbox" id="flexCheckDefault-women" value="women" onChange = {setCategory}/>
                                            <label className="form-check-label" htmlFor="flexCheckDefault-women">Women</label>
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
                                    <textarea type="text" className="form-control" name="expert" onChange = {setValues}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Product Description:</label>
                                    <textarea type="text" className="form-control" name="description" onChange = {setValues}></textarea>
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

export default AddProductForm;