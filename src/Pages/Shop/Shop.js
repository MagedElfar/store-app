import React , {Component, useState} from 'react';
import MainBanner from './../../component/main-banner/main-baner';
import Card from './../../component/card/card';
import sideBarcCntext from '../../Context/context';
import './shop.css';

function Shop (props){
    const catArr = ["sport" , "clothing" , "accessories" , "electronic"];
    const sizeArr = ["s" , "m" , "l" , "xl"];
    const genderArr = ["men" , "women"];
    const[filtterArr , setFilter] = useState([])
    const[cat , setCat] = useState(true);
    const[size , setSize] = useState(true);
    const[gender , setGender] = useState(true);
    
    function pirentFilter(arr){
        const ele = arr.map((item, index) => {
            return(
                <div key={index} className="form-check">
                    <input className="form-check-input" name="category" type="checkbox" id={`flexCheckDefault-${item}`} value={item} onChange = {handelfiler}/>
                    <label className="form-check-label" htmlFor={`flexCheckDefault-${item}`}>{item}</label>
                </div>
            )
        }) 
        return(ele)
    }

    function  toggeltax(setStae , state){
        setStae(!state)
    }

    function handelfiler(e){
        let subFilter = filtterArr;

        if(e.target.checked){
            subFilter.push(e.target.value)
       } else {
            subFilter = subFilter.filter((item => {
                return item != e.target.value;
            }))
       }
       
       setFilter([...subFilter])
       console.log(filtterArr)
    }

    return(
        <section className="shop-page">
            <MainBanner title={"Shop"} />
            <div className="container">
            <div className="row mx-0">
                <sideBarcCntext.Consumer>
                    {
                        ({products , updateProducts}) => {
                            if(products){
                                let filtter = new Set();
                                if(filtterArr.length > 0) {
                                    products.forEach((pro) => {
                                        pro.category.forEach((item) => {
                                            if (filtterArr.includes(item)){
                                                filtter.add(pro)
                                            };
                                        });
                                        pro.size.forEach((item) => {
                                            if (filtterArr.includes(item)){
                                                filtter.add(pro)
                                            };
                                        }) 
                                        pro.gender.forEach((item) => {
                                            if (filtterArr.includes(item)){
                                                filtter.add(pro)
                                            };           
                                        })     
                                    })
                                    filtter = [...filtter]
                                } else { filtter = products }
                                const product = filtter.map((item , index) => {
                                    return(
                                        <div className="col-12 col-md-6 col-lg-4" key={index}>
                                            <Card product={item} index={index}/>
                                        </div>
                                    )
                                })
                                return(
                                    <>
                                        <div className="col-12 col-lg-3 order-2 order-lg-1 fillter-section">
                                            <h6 className="d-flex align-items-center justify-content-between">
                                                <span>Filter By Category:</span> <span onClick={() => toggeltax(setCat , cat)} className="toggle-tax">{(cat ? "-" : "+")}</span>
                                            </h6>
                                            <div className="filtration-attr">
                                                {(cat ? pirentFilter(catArr) : null) }
                                            </div>
                                            <h6 className="d-flex justify-content-between">
                                                <span>Filter By Size:</span> <span onClick={() => toggeltax(setSize , size)} className="toggle-tax">{(size ? "-" : "+")}</span>
                                            </h6>
                                            <div className="filtration-attr size-filter">
                                                { (size ? pirentFilter(sizeArr) : null)}
                                            </div>
                                            <h6 className="d-flex justify-content-between">
                                                <span>Filter By Gender:</span> <span onClick={() => toggeltax(setGender , gender)} className="toggle-tax">{(gender ? "-" : "+")}</span>
                                            </h6>
                                            <div className="filtration-attr">
                                                { (gender ? pirentFilter(genderArr) : null)}
                                            </div>
                                        </div>
                                        <div className="product-section row mx-0 col-12 col-lg-9 order-1 order-lg-2 shop-page-card">
                                            {(product.length > 0 ? product : "no product matched")}
                                        </div>
                                    </>
                                )
                            }
                        }
                    }   
                </sideBarcCntext.Consumer>
            </div>
            </div>
        </section>
    )
}

export default Shop ;