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

  toggleSpinState = () => {
    this.setState( {banner: false} );
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
        // ]
      })
  }

  componentDidMount = () => {
    this.setState( {banner: true} );
    console.log('componentdidmount app.js');
    // this.setState({
    //   contents: [
    //     {
    //       "subcategories": [
    //                 "men",
    //                 "shoe"
    //             ],
    //             "description": "Featuring a full-length foam midsole and VaporMax Air unit, the Nike Air VaporMax 360 gives you a comfy ride with bold '90s style. Iridescent accents on the upper are combined with small Air Pod details for a fresh look with just enough flash.",
    //             "sizes": [
    //                 "UK 5.5",
    //                 "UK 6(EU 39)",
    //                 "UK 6(EU 40)",
    //                 "UK 6.5",
    //                 "UK 7",
    //                 "UK 7.5",
    //                 "UK 8",
    //                 "UK 8.5",
    //                 "UK 9",
    //                 "UK 9.5",
    //                 "UK 10",
    //                 "UK 10.5",
    //                 "UK 11",
    //                 "UK 11.5",
    //                 "UK 12",
    //                 "UK 13"
    //             ],
    //       "price": "£179.95",
    //       "category": "men",
    //       "type": "shoe",
    //       "name": "Nike Air VaporMax 360",
    //       "images": ["https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/i1-7a36dcf1-1e90-476e-89a0-aea89a055ad5/air-vapormax-360-shoe-HKDddm.jpg","https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/i1-7bddf031-0945-4dd0-8b4e-57981e7c806a/air-vapormax-360-shoe-HKDddm.jpg","https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/i1-4e53362e-1bac-413e-add6-815f4b21099f/air-vapormax-360-shoe-HKDddm.jpg","https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/i1-e56adf81-4531-46f5-b675-ef878bc48a4f/air-vapormax-360-shoe-HKDddm.jpg","https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/i1-a2ab8a7e-2d69-4b2c-9323-b15aa83adfce/air-vapormax-360-shoe-HKDddm.jpg"]
    //     }
    //   ]
    // })
  }

  handleNavigation = async (e) => {
      const option = e.target.innerHTML;
      
      switch(option) {
        case "Men":
            this.toggleSpinState();
              await axios.get('/api/items/men/5')
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
        <Showcase title={this.state.title} contents={this.state.contents} blur={this.state.blur} handleImageClick={this.handleImageClick} banner={this.state.banner} />
        <ItemWindow />
        <BottomBar />
      </div>
    );
  }
}

export default App;