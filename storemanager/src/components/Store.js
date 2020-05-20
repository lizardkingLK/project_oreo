import React,{Component} from "react";
import {Col, Form, Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddItemModal from "./AddItemModal";
import {Accordion, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import Update from "./Update"

class Store extends Component{

    // _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            items:[],
            addModalShow: false,
            editModalShow: false,
            id: '',
            iname: '',
            itype: '',
            icat: '',
            iprice: '',
            ides: ''
        }
    }

    componentDidMount() {
        this.getAllItems();
        // this._isMounted = true;
    }

    // componentWillUnmount() {
    //     this._isMounted = false;
    // }

    getAllItems(){
        fetch('/api/items/allitems')
        .then(res => res.json())
        .then(data =>{
            this.setState({items:data});
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
            ides:item.description
        })
        //console.log(this.state);
        // this.setState({
        //     editModalShow:true,
        //     iname:item.name,
        //     itype:item.type,
        //     icat:item.category,
        //     iprice:item.price,
        //     ides:item.description
        // })
    }

    render() {
        let {items, iname, itype, icat, iprice, ides, id} = this.state;
        let addModalClose = () => this.setState({addModalShow: false});
        let editModalClose = () => this.setState({editModalShow: false});

        return(
            <div >
                <ButtonToolbar className="mt-3">
                    <Button varient="primary"
                    onClick = {() => this.setState({addModalShow: true})}>
                    Add Item
                    </Button>

                    <AddItemModal
                     show= {this.state.addModalShow}
                     onHide= {addModalClose}
                     />
                </ButtonToolbar>

            <form onSubmit={this.search} className="form-inline">
                <div className="form-group">
                    <input id="itemId" type="text" name="search" placeholder="search item" className="form-control"/>
                    <input type="submit" value="search" className="btn btn-default"/>
                </div>
            </form>

            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Discount</th>
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
                  ides = {ides}
                />
                <tbody>
                    {this.state.items.map(item =>
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
                            <td></td>
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
                                    </Accordion></td>
                            <td>{item.images.map((image,index) => {
                                return (
                                    <div key={index} style={{width: "50px",height: "50px",backgroundSize: "cover", backgroundImage: "URL("+image+")"}}></div>
                                )
                            })}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info" onClick={() => this.loadUpdate(item)}>
                                        Edit
                                    </Button>
                                    <Button className= "mr-2" onClick= {()=>this.deleteItem(item._id)} variant="danger">
                                        Delete
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