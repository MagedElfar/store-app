import React from 'react';
import{Route , Switch} from 'react-router-dom';
import About from '../../Pages/About/About';
import Contact from '../../Pages/Contact/Contact';
import Register from '../../Pages/Register/register';
import Home from './../../Pages/Home/Home';
import Shop from './../../Pages/Shop/Shop';
import Account from '../../Pages/Account/account';
import UpdateProducts from '../../Pages/Update-product/update-product';
import AddProduct from '../../Pages/Add-product/add-product';
import Category from '../../Pages/Category/Category';
import SingleProduct from '../../Pages/Single-produt/single-prodct';
import Login from '../../Pages/Login/login';
import CartPage from '../../Pages/cart/cart';
import WislistPage from '../../Pages/wishlist/wishlist';
import PrivateRoute from '../privet-rout/privet';

function Content (){
    return(
        <div id="page-content">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route  path="/shop" component={Shop} />
                <Route  path="/about" component={About} />
                <Route  path="/contact" component={Contact} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/account" component={Account} />
                <PrivateRoute path="/product-list" component={UpdateProducts} />
                <PrivateRoute path="/add-product" component={AddProduct} />
                <Route path="/category/:cat" component={Category} />
                <Route path="/product/:name" component={SingleProduct} />
                <Route path="/cart" component={CartPage} />
                <Route path="/wishlist" component={WislistPage} />
            </Switch>
        </div>
    )
}

export default Content;