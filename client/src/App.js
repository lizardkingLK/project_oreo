import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavigationBar from '../src/components/NavigationBar';
import Showcase from '../src/components/Showcase';
import ItemWindow from '../src/components/ItemWindow';
import BottomBar from '../src/components/BottomBar';

class App extends React.Component {
  state = {
    title: 'Oreo',
    contents: []
  }

  changeState = (category,data) => {
    // if(typeof(data) == typeof(this.state.contents)) console.log(true)

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
            await axios.get('/api/items/men/2')
              .then(res => {
                this.changeState('Men', res.data);
            })
          break;
        case "Women":
            await axios.get('/api/items/women/2')
              .then(res => {
                this.changeState('Women', res.data);
            })
          break;
        case "Kids":
            await axios.get('/api/items/kids/2')
              .then(res => {
                this.changeState('Kids', res.data);
            })
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
        <NavigationBar handleNavigation={this.handleNavigation} />
        <Showcase title={this.state.title} contents={this.state.contents} />
        <ItemWindow />
        <BottomBar />
      </div>
    );
  }
}

export default App;