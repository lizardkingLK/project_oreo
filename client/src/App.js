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

  componentDidMount = () => {
    console.log(true);
  }

  handleNavigation = (e) => {
    const option = e.target.innerHTML;
    console.log(option)
    switch(option) {
      case "Men":
        const url = "/api/items/allitems";
        axios.get(url)
        .then(function (response) {
          // handle success
          console.log(response.data)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });

        this.setState({
          title: 'Men',
          contents: [      
            {name: "Nike Air Max 90 FlyEase", id: 1, value: 27, category: "Men"},
            {name: "Mojitha", id: 2, value: 36, category: "Men"},
            {name: "Vikum", id: 3, value: 13, category: "Men"},
            {name: "Aruna", id: 4, value: 42, category: "Men"},
            {name: "Lahiru", id: 5, value: 8, category: "Men"},
            {name: "Sapnaka", id: 6, value: 53, category: "Men"}
          ]
        })
        break;
      case "Women":
        this.setState({
          title: 'Women',
          contents: [
            {name: "Chathumini", id: 7, value: 23, category: "Women"}
          ]
        })
        break;
      case "Kids":
        this.setState({
          title: 'Kids',
          contents: [
            {name: "Kevin", id: 8, value: 78, category: "Kids"},
            {name: "Json", id:9, value: 93, category: "Kids"}
          ]
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
