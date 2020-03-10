import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavigationBar from '../src/components/NavigationBar';
import Showcase from '../src/components/Showcase';
import ItemWindow from '../src/components/ItemWindow';
import BottomBar from '../src/components/BottomBar';

class App extends React.Component {      
  state = {
    title: 'Fashion by Oreo'
  }

  handleNavigation = (e) => {
    const option = e.target.innerHTML;
    console.log(option)
    switch(option) {
      case "Men":
        this.setState({
          title: 'Men'
        })
        break;
      case "Women":
        this.setState({
          title: 'Women'
        })
        break;
      case "Kids":
        this.setState({
          title: 'Kids'
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
        <Showcase title={this.state.title} />
        <ItemWindow />
        <BottomBar />
      </div>
    );
  }
}

export default App;
