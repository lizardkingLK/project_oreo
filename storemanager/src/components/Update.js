import React, {Component} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";

class Update extends Component{
    constructor(props) {
        super(props);
        this.state = {}
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event,id) => {
        event.preventDefault();
        console.log(id);
        fetch('/api/items/'+id,{
            method:'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                //id: _id,
                name:event.target.ItemName.value,
                type:event.target.ItemType.value,
                category:event.target.category.value,
                price:event.target.price.value,
                description:event.target.des.value
            })
        })
        .then(res=> {
            res.json();
        })
        .then(result=> {
            alert("Success");
        })
        .catch(error=>{
            alert("Failed");
        })
    }

    render() {
        //console.log(this.props.id);
        return(
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className = "container">
                        <Form onSubmit={(e) => this.handleSubmit(e,this.props.id)}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="ItemName">
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="ItemName"
                                        required
                                        defaultValue = {this.props.iname}
                                        placeholder="Item Name" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="ItemType">
                                    <Form.Label>Type:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="ItemType"
                                        required
                                        defaultValue = {this.props.itype}
                                        placeholder="Item Type" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col}controlId="category">
                                    <Form.Label>Category:</Form.Label>
                                    <Form.Control as="select" defaultValue = {this.props.icat}>
                                        <option>Men</option>
                                        <option>Women</option>
                                        <option>Kids</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="price">
                                    <Form.Label>Price:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="price"
                                        required
                                        defaultValue = {this.props.iprice}
                                        placeholder="Item Price" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="des">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="des"
                                    required
                                    defaultValue = {this.props.ides}
                                    placeholder="Item Description" />
                            </Form.Group>

                            <Form.Group>
                                <Button varient="primary" type="submit">
                                    Update Item
                                </Button>
                            </Form.Group>
                        </Form>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant = "danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default Update;