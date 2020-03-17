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
    blur: '0'
  }

  toggleSpinState = () => {
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

  changeState = (category,data) => {
      this.setState({
        title: category,
        contents: data

        // [
          // {name: "Nike Air Max 90 FlyEase", _id: 1, value: 27, category: "Men"},
          // {name: "Mojitha", _id: 2, value: 36, category: "Men"},
          // {name: "Vikum", _id: 3, value: 13, category: "Men"},
          // {name: "Aruna", _id: 4, value: 42, category: "Men"},
          // {name: "Lahiru", _id: 5, value: 8, category: "Men"},
          // {name: "Sapnaka", _id: 6, value: 53, category: "Men"} 
        // ]

        // [
          // {name: "Chathumini", _id: 7, value: 23, category: "Women"}
        // ]

        // [
          // {name: "Kevin", _id: 8, value: 78, category: "Kids"},
          // {name: "Jason", _id:9, value: 93, category: "Kids"}
        // ]
      })
  }

  componentDidMount = () => {
    console.log('componentdidmount app.js');
  }

  handleNavigation = async (e) => {
      const option = e.target.innerHTML;
      // console.log(option)
      switch(option) {
        case "Men":
            this.toggleSpinState();
              await axios.get('/api/items/men/2')
                .then(res => {
                  this.changeState('Men', res.data);
              })
            this.toggleSpinState();
          break;
        case "Women":
            this.toggleSpinState();
              await axios.get('/api/items/women/2')
                .then(res => {
                  this.changeState('Women', res.data);
              })
            this.toggleSpinState();
          break;
        case "Kids":
            this.toggleSpinState();
              await axios.get('/api/items/kids/2')
                .then(res => {
                  this.changeState('Kids', res.data);
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
        <NavigationBar handleNavigation={this.handleNavigation} />
        <Showcase title={this.state.title} contents={this.state.contents} blur={this.state.blur} />
        <ItemWindow />
        <BottomBar />
      </div>
    );
  }
}

export default App;