import React, {Component} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";

class AddItemModal extends Component{
    constructor(props) {
        super(props);
        this.state = {}
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        fetch('/api/items/',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYjAyYTJjNTRjYTJhZDM1ODI4YzE3MyIsImVtYWlsIjoibGFrbWluYWFiZXlyYXRuZTU2QGdtYWlsLmNvbSIsImlhdCI6MTU4OTU0Mzc3NiwiZXhwIjoxNTg5NTQ3Mzc2fQ.Me2IycxC2IdipId1lLxLxrp7q0l20CpTsSU-VXijAhM'
            },
            body:JSON.stringify({
                name:event.target.ItemName.value,
                type:event.target.ItemType.value,
                category:event.target.category.value,
                price:event.target.price.value,
                description:event.target.des.value,
                images:[event.target.Image1.value, event.target.Image2.value, event.target.Image3.value, event.target.Image4.value, event.target.Image2.value,]
            })
        })
            .then(res=> {
                res.json()

            })
            .then(result=> {
                alert("item added succesfully.")
                console.log(result);
            },
                error=>{
                    alert("Failed")
            })
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
                    Add Item
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className = "container">

                            <Form onSubmit={this.handleSubmit}>
                                <Form.Row>
                                <Form.Group as={Col} controlId="ItemName">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="ItemName"
                                    required
                                    placeholder="Item Name" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="ItemType">
                                <Form.Label>Type:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="ItemType"
                                    required
                                    placeholder="Item Type" />
                                </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                <Form.Group as={Col}controlId="category">
                                <Form.Label>Category:</Form.Label>
                                <Form.Control as="select">
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
                                    placeholder="Item Price" />
                                </Form.Group>
                                </Form.Row>

                                <Form.Group controlId="des">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="des"
                                    required
                                    placeholder="Item Description" />
                                </Form.Group>

                                    <Form.Row>
                                    <Form.Group as={Col} controlId="Image1">
                                    <Form.Label>Image1</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Image1"
                                    required
                                    placeholder="Image" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="Image2">
                                <Form.Label> Image2</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Image2"
                                    required
                                    placeholder="Image" />
                                    </Form.Group>

                                <Form.Group as={Col} controlId="Image3">
                                <Form.Label> Image3</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Image3"
                                    required
                                    placeholder="Image" />
                                </Form.Group>

                                    <Form.Group as={Col} controlId="Image4">
                                    <Form.Label>Image4</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Image4"
                                        required
                                        placeholder="Image" />
                                    </Form.Group>

                                        <Form.Group as={Col} controlId="Image5">
                                    <Form.Label>Image5</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Image5"
                                        required
                                        placeholder="Image" />
                                    </Form.Group>

                                    </Form.Row>

                                        <Form.Group>
                                        <Button varient="primary" type="submit">
                                        Add Item
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

export default AddItemModal;