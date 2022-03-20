import {ADD_Product , Cleare_All_Products} from './type';

function mapStateToProps(state) {
    return { allDeta: state }
}

function add_product (product){
    const action ={
        type: ADD_Product,
        product
    }
    return action;
}

function cleare_products (){
    const action ={
        type: Cleare_All_Products
    }
    return action;
}

export default mapStateToProps;

export {add_product , cleare_products}