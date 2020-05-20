import React, {Component} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route, Switch } from "react-router-dom";
import  Header from './Components/Header';
import Categories from "./Components/Categories";
import StoreManagersManagement from "./Components/StoreManagersManagement";
import Collections from "./Components/Collections";
import CategoryEdit from "./Components/CategoryEdit";
import StoreManagerEdit from "./Components/StoreManagerEdit";

class App extends Component {
    render()
    {
        return (
            <BrowserRouter>

                <Header/>

                <Switch>
                    <Route path="/" component={Categories} exact />
                    <Route path="/storeManagersManagement" component={StoreManagersManagement}/>
                    <Route path="/collections" component={Collections}/>
                    <Route path="/editCatgory/:id" component={CategoryEdit}/>
                    <Route path="/editStoreManager/:id" component={StoreManagerEdit}/>
                </Switch>

            </BrowserRouter>


        );
    }
}

export default App;