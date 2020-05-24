import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class CategoryTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    deleteCategory() {
        axios.get('/api/categories/deleteCategory/'+this.props.category._id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))

    }

    render() {
        return (
            <tr>
                <td>{this.props.category.categoryName}</td>
                <td>{this.props.category.categoryType}</td>
                <td>
                    <Link to={"/editCatgory/"+this.props.category._id}>
                        <button className="btn btn-success btn-sm">
                            <span>Update</span>
                        </button>
                    </Link>
                    <button className="btn btn-danger btn-sm ml-2" onClick={this.deleteCategory}>Delete</button>
                </td>
            </tr>
        );
    }
}