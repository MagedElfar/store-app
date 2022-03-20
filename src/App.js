import React , {Component} from 'react';
import './App.css';
import Header from './component/header/header';
import Content from './component/content/content';
import SideBar from './component/nav/Sidebar/sidbar/sidebar';
import sideBarcCntext from './Context/context';
import db ,{auth} from './Fire Base/firebase';
import Footer from './component/footer/footer';

class App extends Component {
  openSideBar = ()=>{
    this.setState({
      openSideBar:true
    }) 
  };

  closSideBar = ()=>{
      this.setState({
          openSideBar:false
      })  
  }

  userUpdate = (user) => {
    this.setState({user})
  }

  updateProducts = (products) => {
    this.setState({products})
  }

  updateCart = (newCart) => {
    this.setState({cart: newCart})
  }

  setWishlist = (wishlist) => {
    this.setState({wishlist})
  }

  constructor(props){
    super(props);
    this.state={
        openSideBar:false,
        user: null,
        products: null,
        cart: [],
        wishlist: []
    } 
  }

  componentDidMount() {
    let products = [];

    db.collection("Products").orderBy("date" , "desc").get().then(docs => {
      docs.forEach(doc => {
        products.push({...doc.data() , id: doc.id});
      })
      this.setState({products});
    }).catch(error => {
      console.log(error)
    })

    auth.onAuthStateChanged(async userData => {
      if(userData){
        const id = userData.uid;
        let user = {};
        await db.collection("user").doc(id).get().then(doc => {
          user = {...doc.data()}
          this.setState({user})
         });


        let cart = [];
        let wishlist = [];
        console.log("caaaaaaaaaaaaart")
        db.collection("user").doc(this.state.user.id).collection("cart").get().then((docs) => {
          docs.forEach(doc => {
            cart.push(doc.data());
          })
        }).then(() => {
          this.setState({cart});
          console.log(this.state.cart)
        })

        db.collection("user").doc(this.state.user.id).collection("wishlist").get().then((docs) => {
          docs.forEach(doc => {
            wishlist.push(doc.data());
          })
        }).then(() => {
          this.setState({wishlist});
          console.log(this.state.cart)
        })        
      }
    })

    if(this.state.user){
      
    }
  }

  render(){
    return (
      <div className="App">
        <sideBarcCntext.Provider value={{
            closSideBar:this.closSideBar,
            openSideBar:this.openSideBar,
            user: this.state.user,
            userUpdate:this.userUpdate,
            products:this.state.products,
            updateProducts:this.updateProducts,
            cart: this.state.cart,
            updateCart : this.updateCart,
            wishlist: this.state.wishlist,
            setWishlist: this.setWishlist

          }}>
            <Header />
            <Content />
            {this.state.openSideBar?<SideBar/>:null}
            <Footer />
          </sideBarcCntext.Provider>
      </div>
    );
  } 
}




export default App