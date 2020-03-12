import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavigationBar from '../src/components/NavigationBar';
import Showcase from '../src/components/Showcase';
import ItemWindow from '../src/components/ItemWindow';
import BottomBar from '../src/components/BottomBar';

class App extends React.Component {      
  state = {
    title: 'Fashion by Oreo',
    contents: []
  }

  handleNavigation = (e) => {
    const option = e.target.innerHTML;
    console.log(option)
    switch(option) {
      case "Men":
        this.setState({
          title: 'Men',
          contents: [      
            {name: "Sandeep", id: 1, value: 27, category: "Men"},
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
            {name: "Kevin", id: 8, value: 78, category: "Kids"}
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
