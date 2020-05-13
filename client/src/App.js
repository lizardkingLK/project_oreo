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
    authState: null
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

  componentDidMount = () => {
    console.log('project_oreo--------------');
    this.toggleShowcase(true);
    this.toggleBanner(true);
    this.checkAuthState();
  }

  checkAuthState = async () => {
    const user = localStorage.getItem('user_oreo');
    if(user) {
      await axios.get('/api/auth/user', { headers: {'x-auth-token': user} })
      .then(res => {
        this.setState({
          authState: res.data
        })
      })
    }
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

  render() {
    return (
      <div>
        <Spinner spinState={this.state.spinState} />
        <NavigationBar
          authState={this.state.authState}
          handleNavigation={this.handleNavigation}
          setAuthState={this.setAuthState}
          setCartState={this.setCartState}
          cartState={this.state.cart}
        />
        <Cart cart={this.state.cart} />
        <Showcase
          showcase={this.state.showcase}
          title={this.state.title} 
          contents={this.state.contents} 
          blur={this.state.blur} 
          banner={this.state.banner}
        />
        <ItemWindow />
        <BottomBar />
      </div>
    );
  }
}

export default App;