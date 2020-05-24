import React, {Component} from 'react';
import axios from 'axios';
import CategoryList from "./CategoryList";
import {IoIosAddCircleOutline} from 'react-icons/io';
import {FiRefreshCcw} from 'react-icons/fi';

class Categories extends Component {

    constructor(props) {
        super(props);
        this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.onChangeCategoryType = this.onChangeCategoryType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            categoryName: '',
            categoryType: ''
        }
    }

    onChangeCategoryName(e) {
        this.setState({
            categoryName: e.target.value
        });
    }
    onChangeCategoryType(e) {
        this.setState({
            categoryType: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Category Name: ${this.state.categoryName}`);
        console.log(`Category Type: ${this.state.categoryType}`);

        const newCategory = {
            categoryName: this.state.categoryName,
            categoryType: this.state.categoryType,
        };

        axios.post('/api/categories/add/', newCategory)
            .then(res => console.log(res.data));

        alert('Category Added Successfully! ');

        this.setState({
            categoryName: '',
            categoryType: ''
        })
    }
    refreshPage() {
        window.location.reload(false);
    }
    render() {
        return (
            <div className="div">
                <div className="row">
                    <div className="col">
                    <div className="col-8 mx-auto col-md-9 mt-5">
                    <div className="card border-warning">
                        <div className="card-header text-dark text-center">Add Categories</div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label className="font-weight-bold">Name</label>
                                    <input type="text"
                                           className="form-control text-capitalize"
                                           value={this.state.categoryName}
                                           onChange={this.onChangeCategoryName}/>
                                </div>
                                <div className="form-group">
                                    <label className="font-weight-bold">Type</label>
                                    <select className="form-control" value={this.state.categoryType} onChange={this.onChangeCategoryType}>
                                        <option></option>
                                        <option value="Primary">Primary</option>
                                        <option value="Secondary">Secondary</option>
                                        <option value="Ternary">Ternary</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-dark border-warning"><IoIosAddCircleOutline size={30}/> Add</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    </div>
                        <div>
                            <button className="btn btn-dark border-warning mt-5" style={{fontSize: '20px',marginLeft: '215px', height: '120px', width : '120px'}} onClick={this.refreshPage}><FiRefreshCcw size={35}/> Refresh</button>
                        </div>
                    </div>

                <div className="col-7 mr-5 ml-2 mt-4">
                    <CategoryList/>
                </div>
                </div>
                </div>
            )
    }
}

export default Categories;