import React, { Component } from 'react';
import {MdModeEdit} from 'react-icons/md'
import axios from 'axios';

class StoreManagerEdit extends Component {

    constructor(props){
        super(props);

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
            password: ''
        }
    }

    componentDidMount() {
        axios.get('/api/storeManagers/'+this.props.match.params.id)
            .then(response => {
                this.setState({

                    fullName: response.data.fullName,
                    gender: response.data.gender,
                    dob: response.data.dob,
                    address: response.data.address,
                    email: response.data.email,
                    password: response.data.password
                })
            })
            .catch(function (error) {
                console.log(error);
            })
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
        const obj = {

            fullName: this.state.fullName,
            gender: this.state.gender,
            dob: this.state.dob,
            address: this.state.address,
            email: this.state.email,
            password: this.state.password
        };
        console.log(obj);
        axios.post('/api/storeManagers/updateStoreManager/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/storeManagersManagement');
    }

    render() {
        return (
            <div>
                <h3 align="center" className="mt-2">Update Store Manager</h3>
                <div className="col-8 mx-auto col-md-7">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label className="font-weight-bold">Full Name</label>
                                    <input type="text"
                                           className="form-control"
                                           value={this.state.fullName}
                                           onChange={this.onChangeFullName}/>
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Gender</label>
                                    <select className="form-control" value={this.state.gender} onChange={this.onChangeGender}>
                                        <option></option>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Date of Birth</label>
                                    <input type="date"
                                           className="form-control"
                                           value={this.state.dob}
                                           onChange={this.onChangeDob}/>
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Address</label>
                                    <input type="text"
                                           className="form-control"
                                           value={this.state.address}
                                           onChange={this.onChangeAddress}/>
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Email</label>
                                    <input type="email"
                                           className="form-control"
                                           value={this.state.email}
                                           onChange={this.onChangeEmail}/>
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Password</label>
                                    <input  type="text"
                                            className="form-control"
                                            value={this.state.password}
                                            onChange={this.onChangePassword}
                                            readOnly/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-dark border-warning" style={{width: '120px'}}><MdModeEdit size={25}/> Update</button>
                                </div>
                            </form>
                        </div>
                    </div>

        )
    }
}

export default StoreManagerEdit;