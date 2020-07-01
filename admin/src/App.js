import React, {Component} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route, Switch } from "react-router-dom";
import  Header from './Components/Header';
import Categories from "./Components/Categories";
import StoreManagersManagement from "./Components/StoreManagersManagement";
import CategoryEdit from "./Components/CategoryEdit";
import StoreManagerEdit from "./Components/StoreManagerEdit";

import SignInWindow from './Components/SignInWindow';
import axios from 'axios';



class App extends Component {
    state = {
        authState: ''
    }

    checkAuthState = async () => {
        const user = localStorage.getItem('admin_oreo');
        console.log(user);
    }

    setAuthState = (uo) => {
        localStorage.setItem('admin_oreo', uo);
        this.checkAuthState();
        this.setState({
            authState: uo
        })
    }

    render()
    {
        let stateAll = (this.state.authState === '' || this.state.authState === 'Failed') ? 'none' : 'block';
        return (
             <BrowserRouter>

               <Header/>

                        <SignInWindow
                            display={stateAll}
                            scrollable={false}
                            setAuthState={this.setAuthState}
                            buttonLabel={"SignIn"}
                            className={"modal-dialog modal-lg"}
                        />
                 <Switch>
                    <div style={{display: stateAll}}>
                        <Route path="/" component={Categories} exact/>
                        <Route path="/storeManagersManagement" component={StoreManagersManagement}/>
                        <Route path="/editCatgory/:id" component={CategoryEdit}/>
                        <Route path="/editStoreManager/:id" component={StoreManagerEdit}/>
                    </div>
                 </Switch>

             </BrowserRouter>


         );
    }
}

export default App;