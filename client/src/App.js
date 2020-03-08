import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavigationBar from '../src/components/NavigationBar';
import Showcase from '../src/components/Showcase';
import ItemWindow from '../src/components/ItemWindow';
import BottomBar from '../src/components/BottomBar';

class App extends React.Component {
  handleNavigation = (e) => {
    const option = e.target.innerHTML;
    console.log(option)
    switch(option) {
      case "Men":
        
        break;
      case "Women":

        break;
      case "Men":
        
        break;
      case "Women":
        
        break;
      case "Kids":
        
        break;
      case "Collections":
        
        break;
      default:
    }
  }

  render() {
    return (
      <div>
        <NavigationBar handleNavigation={this.handleNavigation} />
        <Showcase />
        <ItemWindow />
        <BottomBar />
      </div>
    );
  }
}

export default App;
