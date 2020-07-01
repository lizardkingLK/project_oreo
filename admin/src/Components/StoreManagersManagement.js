import React, {Component} from 'react';
import {IoIosAddCircleOutline} from 'react-icons/io';
import {MdContentCopy} from 'react-icons/md';
import axios from "axios";
import StoreManagerList from "./StoreManagerList";
import {FiRefreshCcw} from 'react-icons/fi';


class StoreManagersManagement extends Component {

    constructor(props) {
        super(props)

        this.onChangeFullName = this.onChangeFullName.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeDob = this.onChangeDob.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            fullName: '',
            gender: '',
            dob: '',
            address: '',
            email: '',
            password: '',
        }

    }

    onChangeFullName(e) {
        this.setState({
            fullName: e.target.value
        });
    }
    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }
    onChangeDob(e) {
        this.setState({
            dob: e.target.value
        });
    }
    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Store Manager Full Name: ${this.state.fullName}`);
        console.log(`Store Manager Gender: ${this.state.gender}`);
        console.log(`Store Manager Date of Birth: ${this.state.dob}`);
        console.log(`Store Manager Address: ${this.state.address}`);
        console.log(`Store Manager Email: ${this.state.email}`);
        console.log(`Store Manager Password: ${this.state.password}`);

        const newStoreManager = {
            fullName: this.state.fullName,
            gender: this.state.gender,
            dob: this.state.dob,
            address: this.state.address,
            email: this.state.email,
            password: this.state.password,
        };

        axios.post('/api/storeManagers/addStoreManager', newStoreManager)
            .then(res => console.log(res.data));

        this.setState({
            fullName: '',
            gender: '',
            dob: '',
            address: '',
            email: '',
            password: ''
        })

    }

   generatePassword() {
        var pass = Math.random().toString(36).slice(-8);
        var result =  document.getElementById('password');
        result.value = pass;
        console.log(pass);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col">
                <form onSubmit={this.onSubmit}>
                <div className="form-row ml-4 mt-4">
                        <div className="form-group col-md-5">
                            <label className="font-weight-bold">Full Name</label>
                            <input type="text"
                                   className="form-control form-control-sm"
                                   value={this.state.fullName}
                                   onChange={this.onChangeFullName}/>
                        </div>
                        <div className="form-group col-md-5 ml-2">
                            <label className="font-weight-bold">Address</label>
                            <input type="text"
                                   className="form-control form-control-sm"
                                   value={this.state.address}
                                   onChange={this.onChangeAddress}/>
                        </div>
                </div>
                    <div className="form-row ml-4">
                        <div className="form-group col-md-5">
                            <label className="font-weight-bold">Gender</label>
                            <select className="form-control form-control-sm" value={this.state.gender} onChange={this.onChangeGender}>
                                <option></option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </select>
                        </div>
                        <div className="form-group col-md-5 ml-2">
                            <label className="font-weight-bold">Email</label>
                            <input type="email"
                                   className="form-control form-control-sm"
                                   value={this.state.email}
                                   onChange={this.onChangeEmail}/>
                        </div>
                        </div>
                    <div className="form-row ml-4">
                    <div className="form-group col-md-5">
                        <label className="font-weight-bold">Date of Birth</label>
                        <input type="date"
                               className="form-control form-control-sm"
                               value={this.state.dob}
                               onChange={this.onChangeDob}/>
                        </div>
                        <div className="form-group col-md-5 ml-2">
                            <label className="font-weight-bold">Password</label>
                            <input  type="text"
                                    className="form-control form-control-sm"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}/>
                        </div>
                        <button type="submit" className="btn btn-dark border-warning btn-sm ml-1 font-weight-bold" style={{marginTop: '30px',height: '35px'}}><IoIosAddCircleOutline size={25}/> Add</button>
                        </div>
                </form>
                    </div>
                    <div className="col-md-4" style={{marginTop: '20px'}}>
                        <div className="card border-warning bg-light ml-0 mr-5 mt-5">
                            <div className="card-body">
                                <h5 className="card-title text-dark text-center">Generate Password</h5>
                                <div className="form-inline">
                                <input id="password" className="form-control form-control-sm" style={{width: '350px'}} readOnly></input><br/>
                                <button className="btn btn-info btn-sm"
                                        style={{width: '37px'}}
                                        id="clipboard"
                                        onClick={ () => {
                                            let copiedPass = document.getElementById("password");
                                            copiedPass.select();
                                            document.execCommand("copy");
                                            alert('Copied to Clipboard!');
                                        }}
                                        >
                                    <MdContentCopy size={20}/>
                                </button>
                                </div>
                                <button onClick={this.generatePassword} className="btn btn-dark border-warning btn-sm mt-3" style={{marginLeft: '143px'}}><FiRefreshCcw size={20}/> Generate</button>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="container">
                    <hr className="my-3"/>
                </div>
                <div className="row">
                    <div className="col ml-5 mr-5">
                         <StoreManagerList/>
                    </div>
                </div>
            </div>
        )
    }
}

export default StoreManagersManagement;