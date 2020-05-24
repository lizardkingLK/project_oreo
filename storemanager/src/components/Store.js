import React,{Component} from "react";
import {Col, Form, Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddItemModal from "./AddItemModal";
import {Accordion, Card} from 'react-bootstrap';
import Update from "./Update";
import AddDisModal from "./AddDisModal";

import axios from 'axios';
import {forEach} from "react-bootstrap/cjs/ElementChildren";

class Store extends Component{

    // _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            items:[],
            addModalShow: false,
            editModalShow: false,
            disModalShow: false,
            id: '',
            iname: '',
            itype: '',
            icat: '',
            iprice: '',
            isubcat: '',
            isize: '',
            ides: '',
            image: ''
        }
    }

    componentDidMount() {
        this.getAllItems();
        // this._isMounted = true;
    }

    // componentWillUnmount() {
    //     this._isMounted = false;
    // }

    getAllItems = () => {
        fetch('/api/items/allitems')
        .then(res => res.json())
        .then(data =>{
            this.setState({
                items: data
            });
        })
    }


    setItems = (data) => {
        this.setState({
            items: data
        });
    }

      // componentDidUpdate() {
      //     this.getAllItems();
      // }

    deleteItem = userId => {
        const requestOptions = {
            method: 'DELETE'
        };

        fetch("/api/items/" + userId, requestOptions).then((response) => {
            return response.json();
        }).then((result) => {
            alert("item deleted succesfully.")
            this.getAllItems();
        });
    }

    search = (e) => {
        e.preventDefault();
        console.log(e.target.querySelector('#itemId').value)
        fetch("/api/items/searchitem/"+e.target.querySelector('#itemId').value).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            this.setItems(data);
            this.shouldComponentUpdate = false;
        });
    }

    loadUpdate = (item) => {
        //console.log(item._id);
        this.setState({
            editModalShow: true,
            id: item._id,
            iname:item.name,
            itype:item.type,
            icat:item.category,
            iprice:item.price,
            isubcat:item.subcategories,
            isize:item.sizes,
            ides:item.description,
            image:item.images
        })
    }

    loadPrice = (item) =>{
        console.log(item._id);
        this.setState({
            disModalShow: true,
            id: item._id,
            iprice:item.price
        })
    }

    render() {
        let {items, iname, itype, icat, iprice, isubcat, isize, ides, id, image} = this.state;
        let addModalClose = () => this.setState({addModalShow: false});
        let editModalClose = () => this.setState({editModalShow: false});
        let disModalClose = () => this.setState({disModalShow: false});

        return(
            <div >
                <div className="row">
                    <div className="col">
                <ButtonToolbar className="mt-3">
                    <Button className="btn-dark ml-5 font-weight-bold" style={{width: '200px',marginLeft: '300px'}}
                    onClick = {() => this.setState({addModalShow: true})}>
                        Add Item
                    </Button>

                    <AddItemModal
                     show= {this.state.addModalShow}
                     onHide= {addModalClose}
                     getAllItems = {this.getAllItems}
                     />
                </ButtonToolbar>
                    </div>
                    <div className="col">
            <form onSubmit={this.search} className="form-inline mt-3" style={{marginLeft: '360px'}}>
                <div className="form-group">
                    <input id="itemId" type="text" name="search" placeholder="Search Item" className="form-control"/>
                    <input type="submit" value="Search" className="btn btn-default btn-secondary" />
                </div>
            </form>
                    </div>
                </div>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead >
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Images</th>
                        <th>Option</th>
                    </tr>
                </thead>

                <Update show = {this.state.editModalShow}
                        onHide={editModalClose}
                        id = {id}
                        iname = {iname}
                        itype = {itype}
                        icat = {icat}
                        iprice = {iprice}
                        isubcat = {isubcat}
                        isize = {isize}
                        ides = {ides}
                        image = {image}
                        getAllItems = {this.getAllItems}
                />

                <AddDisModal
                    show = {this.state.disModalShow}
                    onHide = {disModalClose}
                    id = {id}
                    iprice = {iprice}
                    getAllItems = {this.getAllItems}
                />
                <tbody>
                    {this.state.items.map( (item,index) =>
                        <tr key={item._id}   >
                            <td >
                                {item.name}
                            </td>

                            <td>{item.type}</td>
                            <td>{item.category}</td>
                            <td>{item.subcategories}</td>
                            <td><Accordion defaultActiveKey="1">
                                <Card>
                                <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Click For Sizes!
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                <Card.Body>{item.sizes}</Card.Body>
                                </Accordion.Collapse>
                                </Card>
                                </Accordion></td>
                            <td>{item.price}</td>
                            <td><Accordion defaultActiveKey="1">
                                <Card>
                                <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Click For Description!
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>{item.description}</Card.Body>
                                    </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </td>
                            <td>{item.images.map((image,index) => {
                                return (
                                    <div key={index} style={{width: "50px",height: "50px",backgroundSize: "cover", backgroundImage: "URL("+image+")"}}></div>
                                )
                            })}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button className="mr-3" variant="success" onClick={() => this.loadUpdate(item)}>
                                        Edit
                                    </Button>
                                    <Button className= "mr-2" onClick= {()=>this.deleteItem(item._id)} variant="danger">
                                        Delete
                                    </Button>
                                    <Button className= "mt-2" variant="secondary" onClick={() => this.loadPrice(item)}>
                                        Add Discount
                                    </Button>
                                </ButtonToolbar>
                            </td>
                        </tr>
                    )}
                </tbody>
                </Table>
            </div>
        )
    }
}

export default Store;