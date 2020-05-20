import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

export default class StoreManagerTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteStoreManager = this.deleteStoreManager.bind(this);
    }

    deleteStoreManager() {
        axios.get('/api/storeManagers/delete/'+this.props.storeManager._id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))

        alert('Store Manager successfully deleted!')

        window.location.reload(false);

    }

    render() {
        return (
            <tr>
                <td>{this.props.storeManager.fullName}</td>
                <td>{this.props.storeManager.gender}</td>
                <td>{this.props.storeManager.dob}</td>
                <td>{this.props.storeManager.address}</td>
                <td>{this.props.storeManager.email}</td>
                <td>{this.props.storeManager.password}</td>
                <td>
                    <Link to={"/editStoreManager/"+this.props.storeManager._id}>
                        <button className="btn btn-primary btn-sm">
                            <span>Update</span>
                        </button>
                    </Link>
                    <button className="btn btn-danger btn-sm ml-2" onClick={this.deleteStoreManager}>Delete</button>
                </td>
            </tr>
        );
    }
}