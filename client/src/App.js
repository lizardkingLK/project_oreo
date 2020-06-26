import React from 'react';
import axios from 'axios';
import './App.css';

import NavigationBar from '../src/components/NavigationBar';
import Showcase from '../src/components/Showcase';
import ItemWindow from '../src/components/ItemWindow';
import BottomBar from './components/bottomBar/BottomBar';
import Spinner from '../src/components/Spinner';
import Cart from './components/cart/Cart';

class App extends React.Component {
  state = {
    title: '',
    showcaseItems: [],
    spinState: 'none',
    blur: '0',
    showcase: false,
    cart: false,
    authState: null,
    cartId: '',
    wishlistId: '',
    cartItems: [],
    wishlistItems: [],
    cartTotal: '',
    windowItems: [],
    categories: [],
    reviews: []
  }

  componentDidMount = () => {
    console.log('project_oreo--------------');
    this.toggleShowcase(true);
    this.checkAuthState();
    this.setCategories();
    this.setItemWindow();
    this.getReviews();
  }

  setItemWindow = async () => {
    await axios.get('/api/items/women/5')
      .then(res => {
        this.setState({
          windowItems: res.data
        })
      })
  }

  toggleShowcase = (showcaseOption) => this.setState({ showcase: showcaseOption });

  toggleCart = (cartOption) => this.setState({ cart: cartOption });

  toggleSpinState = () => {
    if (this.state.spinState === 'none') {
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
    if (cartState) {
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
    await axios.get('/api/carts/cart/' + userId)
      .then(res => {
        cart = res.data;
      })

    if (cart)
      return cart._id;
    else {
      await axios.post('/api/carts', { userId })
        .then(res => {
          return res.data._id;
        })
    }
  }

  getWishListId = async (userId) => {
    let wishlist = null;
    // find the wishlist
    await axios.get('/api/wishlists/wishlist/' + userId)
      .then(res => {
        wishlist = res.data;
      })

    if (wishlist)
      return wishlist._id;
    else {
      await axios.post('/api/wishlists', { userId })
        .then(res => {
          return res.data._id;
        })
    }
  }

  setCartItems = async (userId) => {
    let cart = null;

    await axios.get('/api/carts/cart/' + userId)
      .then(res => {
        cart = res.data;
      })

    if (cart) {
      this.setState({
        cartItems: cart.items
      })
    }
    this.setTotal();
    //console.log(this.state.cartItems);
  }

  setWishListItems = async (userId) => {
    let wishlist = null;

    await axios.get('/api/wishlists/wishlist/' + userId)
      .then(res => {
        wishlist = res.data;
      })

    if (wishlist) {
      this.setState({
        wishlistItems: wishlist.items
      })
    }
    //console.log(this.state.wishlistItems);
  }

  setTotal = () => {
    let total = 0;
    this.state.cartItems.forEach(ci => {
      let priceStr = ci.item.price + "";
      let price = priceStr.substring(1, priceStr.length);
      total += parseFloat(price);
    })

    total = parseFloat(total.toFixed());

    this.setState({
      cartTotal: total
    })
  }

  addToCart = async (cartId, itemId, itemSize) => {
    let result = false;
    let item = await this.loadItem(itemId)
      .then(i => {
        return i;
      })

    // add item to the cart
    const newItem = { item, itemSize };

    await axios.put('/api/carts/addItem', { newItem, cartId })
      .then(res => {
        if (res.data === 'OK') {
          const userId = this.state.authState._id;
          this.setCartItems(userId);
          result = true;
        }
      });

    return result;
  }

  checkExistInWishList = async (wishListId, item) => {
    let i = false;
    await axios.post('/api/wishlists/checkExist', { wishListId, item })
      .then(res => {
        if (res.data.length >= 1)
          i = true;
      })
    return i;
  }

  addToWishList = async (wishListId, itemId) => {
    let result = false;

    let item = await this.loadItem(itemId)
      .then(i => {
        return i;
      })

    let contains = await this.checkExistInWishList(wishListId, item)
      .then(x => {
        return x;
      })

    if (!contains) {
      // add item to the wishlist
      const newItem = item;

      await axios.put('/api/wishlists/addItem', { newItem, wishListId })
        .then(res => {
          if (res.data === 'OK') {
            const userId = this.state.authState._id;
            this.setWishListItems(userId);
            result = true;
          }
        });
    }

    return result;
  }

  removeFromCart = async (cartId, index) => {
    let result = false;

    let newItems = this.state.cartItems.filter((item, i) => {
      return (index !== i)
    })

    // console.log(newItems);

    await axios.put('/api/carts/removeItem', { cartId, newItems })
      .then(res => {
        if (res.data === 'OK') {
          const userId = this.state.authState._id;
          this.setCartItems(userId);
          result = true;
        }
      });

    return result;
  }

  removeFromWishList = async (wishListId, index) => {
    let result = false;

    let newItems = this.state.wishlistItems.filter((item, i) => {
      return (index !== i)
    })

    // console.log(newItems);

    await axios.put('/api/wishlists/removeItem', { wishListId, newItems })
      .then(res => {
        if (res.data === 'OK') {
          const userId = this.state.authState._id;
          this.setWishListItems(userId);
          result = true;
        }
      });

    return result;
  }

  loadItem = async (itemId) => {
    let i = null;
    await axios.get('/api/items/item/' + itemId)
      .then(item => {
        i = item.data;
      })
    return i;
  }

  getReviews = async () => {
    await axios.get('/api/reviews/allReviews')
      .then(r => {
        this.setState({
          reviews: r.data
        })
      });
  }

  checkAuthState = async () => {
    const user = localStorage.getItem('user_oreo');
    if (user !== null) {
      await axios.get('/api/auth/user', { headers: { 'x-auth-token': user } })
        .then(res => {
          const userId = res.data._id;
          this.setState({
            authState: res.data,
            cartId: this.getCartId(userId),
            wishlistId: this.getWishListId(userId)
          })
          this.setCartItems(userId);
          this.setWishListItems(userId);
        })
    }
  }

  clearAuthState = () => {
    this.setState({
      authState: null,
      cartTotal: ''
    })
    localStorage.setItem('user_oreo', null);
  }

  setAuthState = (uo) => {
    localStorage.setItem('user_oreo', uo);
    this.checkAuthState();
  }

  searchItems = async (keyword) => {
    await axios.post('/api/items/search', { keyword })
      .then(res => {
        this.setState({
          windowItems: res.data
        })
      })
  }

  getCategoryItems = async (category) => {
    await axios.post('/api/items/category', { category })
      .then(res => {
        this.setState({
          windowItems: res.data
        })
      })
  }

  setCategories = async () => {
    await axios.get('/api/categories/')
      .then(res => {
        if (res.data)
          this.setState({
            categories: res.data
          })
      })
  }

  changeShowcaseState = (category, data) => {
    this.setCartState(false);
    this.setState({
      title: category,
      showcaseItems: data
    })
  }

  handleNavigation = async (e) => {
    const option = e.target.innerHTML;

    switch (option) {
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
          getCartId={this.getCartId}
          cartItems={this.state.cartItems}
          cartTotal={this.state.cartTotal}
          removeFromCart={this.removeFromCart}
          setCartState={this.setCartState}
          wishlistItems={this.state.wishlistItems}
          getWishListId={this.getWishListId}
          removeFromWishList={this.removeFromWishList}
          addToCart={this.addToCart}
        />
        <Showcase
          showcase={this.state.showcase}
          title={this.state.title}
          showcaseItems={this.state.showcaseItems}
          blur={this.state.blur}
          authState={this.state.authState}
          setAuthState={this.setAuthState}
          getCartId={this.getCartId}
          addToCart={this.addToCart}
          getWishListId={this.getWishListId}
          addToWishList={this.addToWishList}
          getReviews={this.getReviews}
          reviews={this.state.reviews}
        />
        <ItemWindow
          setCartState={this.setCartState}
          windowItems={this.state.windowItems}
          searchItems={this.searchItems}
          authState={this.state.authState}
          setAuthState={this.setAuthState}
          getCartId={this.getCartId}
          addToCart={this.addToCart}
          cartItems={this.state.cartItems}
          categories={this.state.categories}
          getCategoryItems={this.getCategoryItems}
          getWishListId={this.getWishListId}
          addToWishList={this.addToWishList}
          getReviews={this.getReviews}
          reviews={this.state.reviews}
        />
        <BottomBar />
      </div>
    );
  }
}

export default App;