import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavigationBar from '../src/components/NavigationBar';
import Showcase from '../src/components/Showcase';
import ItemWindow from '../src/components/ItemWindow';
import BottomBar from '../src/components/BottomBar';
import Spinner from '../src/components/Spinner';

class App extends React.Component {
  state = {
    title: 'Oreo',
    contents: [],
    spinState: 'none',
    blur: '0',
    banner: false
  }

  toggleBanner = (bannerOption) => {
    this.setState( {banner: bannerOption} );
  }

  componentDidMount = () => {
    this.toggleBanner(true);
    console.log('project_oreo--------------');
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

  toggleSpinState = () => {
    // this.setState( {banner: false} );
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

  changeShowcaseState = (category,data) => {
      this.setState({
        title: category,
        contents: data

        // [
          // {name: "Nike Air Max 90 FlyEase", _id: 1, value: 27, category: "Men"},
        // ]
      })
  }

  handleImageClick = (e) => {
    const reqBg = e.target.style.backgroundImage;
    const parent = e.target.parentElement.parentElement;
    parent.style.backgroundImage = `${reqBg}`;
  }

  render() {
    return (
      <div>
        <Spinner spinState={this.state.spinState} />
        <NavigationBar handleNavigation={this.handleNavigation} />
        <Showcase 
          title={this.state.title} contents={this.state.contents} 
          blur={this.state.blur} handleImageClick={this.handleImageClick} 
          banner={this.state.banner}
        />
        <ItemWindow />
        <BottomBar />
      </div>
    );
  }
}

export default App;