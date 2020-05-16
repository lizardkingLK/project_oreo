import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavigationBar from '../src/components/NavigationBar';
import Showcase from '../src/components/Showcase';
import ItemWindow from '../src/components/ItemWindow';
import BottomBar from '../src/components/BottomBar';
import Spinner from '../src/components/Spinner';
import Cart from '../src/components/Cart';

class App extends React.Component {
  state = {
    title: 'Oreo',
    contents: [],
    spinState: 'none',
    blur: '0',
    showcase: false,
    banner: false,
    cart: false,
    authState: null,
    cartId: '',
    cartItems: []
  }

  componentDidMount = () => {
    console.log('project_oreo--------------');
    this.toggleShowcase(true);
    this.toggleBanner(true);
    this.checkAuthState();
  }

  toggleShowcase = (showcaseOption) => {
    this.setState( {showcase: showcaseOption} );
  }

  toggleBanner = (bannerOption) => {
    this.setState( {banner: bannerOption} );
  }

  toggleCart = (cartOption) => {
    this.setState( {cart: cartOption} );
  }

  toggleSpinState = () => {
    this.toggleBanner(false);
    if(this.state.spinState === 'none') {
      this.setState({
        blur: '100vh',
        spinState: 'inline-block'
      });
    } else {
      this.setState({
        blur: '0',
        spinState: 'none'
      })
    }
  }

  setCartState = (cartState) => {
    if(cartState) {
      this.toggleCart(true);
      this.toggleShowcase(false);
    }
    else {
      this.toggleShowcase(true);
      this.toggleCart(false);
    }
  }

  getCartId = async (userId) => {
    let cart = null;
    // find the cart
    await axios.get('/api/carts/cart/'+userId)
    .then(res => {
        cart = res.data[0];
    })

    if(cart)
      return cart._id;
    else {
      await axios.post('/api/carts', {userId})
      .then(res => {
          return res.data._id;
      })
    }
  }

  addToCart = async (cartId, itemId, itemSize) => {
    let result = false;
    // add item to the cart
    const newItem = {itemId, itemSize};

    await axios.put('/api/carts', {newItem,cartId})
    .then(res => {
      if(res.data === 'OK') {
        this.setState({
          cartItems: [...this.state.cartItems, newItem]
        })
        result = true;
      }
    });

    return result;
  }

  checkAuthState = async () => {
    const user = localStorage.getItem('user_oreo');
    if(user) {
      await axios.get('/api/auth/user', { headers: {'x-auth-token': user} })
      .then(res => {
        this.setState({
          authState: res.data,
          cartId: this.getCartId(res.data._id)
        })
      })
    }
  }

  clearAuthState = () => {
    localStorage.removeItem('user_oreo');
    this.setState({
      authState: null
    })
  }

  setAuthState = (uo) => {
    localStorage.setItem('user_oreo', uo);
    this.checkAuthState();
  }

  changeShowcaseState = (category,data) => {
    this.setCartState(false);
    this.setState({
      title: category,
      contents: data
    })
  }

  handleNavigation = async (e) => {
    const option = e.target.innerHTML;
    
    switch(option) {
      case "Men":
          this.toggleSpinState();
            await axios.get('/api/items/men/5')
              .then(res => {
                this.changeShowcaseState('Men', res.data);
            })
          this.toggleSpinState();
        break;
      case "Women":
          this.toggleSpinState();
            await axios.get('/api/items/women/5')
              .then(res => {
                this.changeShowcaseState('Women', res.data);
            })
          this.toggleSpinState();
        break;
      case "Kids":
          this.toggleSpinState();
            await axios.get('/api/items/kids/5')
              .then(res => {
                this.changeShowcaseState('Kids', res.data);
            })
          this.toggleSpinState();
        break;
      case "Collections":
          this.setState({
            title: 'Collections'
          })
        break;
      default:
    }
  }

  render() {
    return (
      <div>
        <Spinner spinState={this.state.spinState} />
        <NavigationBar
          authState={this.state.authState}
          handleNavigation={this.handleNavigation}
          setAuthState={this.setAuthState}
          clearAuthState={this.clearAuthState}
          setCartState={this.setCartState}
          cartState={this.state.cart}
        />
        <Cart 
          cart={this.state.cart} 
          authState={this.state.authState}
          setAuthState={this.setAuthState}
        />
        <Showcase
          showcase={this.state.showcase}
          title={this.state.title} 
          contents={this.state.contents} 
          blur={this.state.blur} 
          banner={this.state.banner}
          authState={this.state.authState}
          setAuthState={this.setAuthState}
          getCartId={this.getCartId}
          addToCart={this.addToCart}
        />
        <ItemWindow />
        <BottomBar />
      </div>
    );
  }
}

export default App;