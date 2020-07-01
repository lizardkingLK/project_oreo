import React, {Component} from 'react';
import axios from 'axios';
import StoreManagerTableRow from './StoreManagerTableRow';

class StoreManagerList extends Component {
    constructor(props) {
        super(props);
        this.state = {storeManagers: []};
    }

    componentDidUpdate() {
        axios.get('/api/storeManagers/')
            .then(response => {
                this.setState({ storeManagers: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    componentDidMount() {
        axios.get('/api/storeManagers/')
            .then(response => {
                this.setState({ storeManagers: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }
    employeeList() {
        return this.state.storeManagers.map(function(currentStoreManager, i){
            return <StoreManagerTableRow storeManager={currentStoreManager} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3 className="text-center">Store Managers List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead className="bg-dark text-white">
                    <tr>
                        <th>Full Name</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.employeeList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default StoreManagerList;