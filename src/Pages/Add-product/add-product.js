import React from 'react';
import MainBanner from './../../component/main-banner/main-baner'
import SettingMenu from '../../component/nav/menu/setting-menu';
import AddProductForm from '../../Forms/add-product-form';

function AddProduct(props){
    return(
            <section className="add-product-page">
                <MainBanner title={"Add Product"} />
                <div className="row mx-0">
                    <div className="order-2 order-md-1 setting-menu-side col-12 col-md-4 col-lg-3">
                        <SettingMenu />
                    </div>
                    <div className="order-1 order-md-2 setting-side col-12 col-md-8 col-lg-9">
                        <h2>Add Product:</h2>
                        <AddProductForm />
                    </div>

                </div>
            </section>
    )
}

export default AddProduct;