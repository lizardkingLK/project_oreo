import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Store from "./components/Store";
import Navigation from "./components/Navigation";
import {BrowserRouter} from 'react-router-dom';

import axios from 'axios';

class App extends Component{

    render() {
        return(
            <div >
                <BrowserRouter>
                <Navigation/>
                <Store />
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
