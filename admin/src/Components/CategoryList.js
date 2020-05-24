import React, {Component} from 'react';
import axios from 'axios';
import CategoryTableRow from './CategoryTableRow';

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {categories: []};
    }

    componentDidUpdate() {
        axios.get('/api/categories/')
            .then(response => {
                this.setState({ categories: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    componentDidMount() {
        axios.get('/api/categories/')
            .then(response => {
                this.setState({ categories: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }
    categoryList() {
        return this.state.categories.map(function(currentCategory, i){
            return <CategoryTableRow category={currentCategory} key={i} />;
        })
    }
    render() {
        return (
            <div>
                <h3 className="text-center">Categories List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead className="bg-dark text-white">
                    <tr>
                        <th>Category Name</th>
                        <th>Category Type</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.categoryList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CategoryList;