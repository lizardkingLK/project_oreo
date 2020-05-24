import React, {Component} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import {parse} from "dotenv";

import axios from 'axios';

class AddDisModal extends Component{
    constructor(props) {
        super(props);
        this.newPriceS = '';
        this.state = {}
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        let newPriceControl = e.target.parentElement.parentElement.children[0].children[1].children[1];
        let oldPrice = parseFloat((this.props.iprice).substring(1, this.props.iprice.length));
        let discount = e.target.value;
        let newPrice = oldPrice - discount;

        let newPriceSymbol =  (this.props.iprice).substring(0,1)+newPrice;
        newPriceControl.value = newPriceSymbol;

        this.newPriceS = newPriceSymbol;
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let newPrice = this.newPriceS;
        let pounds = newPrice.substring(0,1);

        console.log(this.props.iprice);
        console.log(this.newPriceS);

        if(this.newPriceS !== pounds+NaN) {
            console.log(this.props.id);
            let itemId = this.props.id;
            axios.put('/api/items/updatePrice/'+itemId, {newPrice})
            .then(res => {
                console.log(res.data);
            })

            let oldPrice = this.props.iprice;
            let discount = pounds+event.target.dis.value;
            axios.post('/api/prices', {itemId,newPrice,oldPrice,discount})
            .then(res => {
                console.log(res.data);
                this.props.getAllItems();
            })
        }
    }



    render() {
        return(
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Discount
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className = "container">
                        <Form onSubmit={(e) => this.handleSubmit(e)}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="prevPrice">
                                        <Form.Label>Previous Price:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="prevPrice"
                                            required
                                            disabled
                                            defaultValue = {this.props.iprice}
                                            placeholder="Previous Price" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="newPrice">
                                        <Form.Label>New Price:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="newPrice"
                                            disabled
                                            defaultValue = {this.props.iprice}
                                            placeholder="New Price" />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group controlId="dis">
                                    <Form.Label>Enter Discount:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="dis"
                                        required
                                        onChange={(e) => this.handleChange(e)}
                                        placeholder="Enter Discount" />
                                </Form.Group>

                            <Form.Group>
                                <Button varient="primary" type="submit">
                                    Submit
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

export default AddDisModal;