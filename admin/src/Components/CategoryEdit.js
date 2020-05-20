import React, { Component } from 'react';
import {MdModeEdit} from 'react-icons/md'
import axios from 'axios';

export default class CategoryEdit extends Component {

    constructor(props){
        super(props);

        this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
        this.onChangeCategoryType = this.onChangeCategoryType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            categoryName: '',
            categoryType: ''
        }
    }

    componentDidMount() {
        axios.get('/api/categories/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    categoryName: response.data.categoryName,
                    categoryType: response.data.categoryType
                })
            })
            .catch(function (error) {
                console.log(error);
            })
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
        const obj = {
            categoryName: this.state.categoryName,
            categoryType: this.state.categoryType
        };
        console.log(obj);
        axios.post('/api/categories/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center" className="mt-5">Update Category</h3>
                <div className="col-8 mx-auto col-md-9 mt-5">
                    <div className="card border-warning">
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
                            <option>Primary</option>
                            <option>Secondary</option>
                            <option>Ternary</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-dark border-warning" style={{width: '120px'}}><MdModeEdit size={25}/> Update</button>
                    </div>
                </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}