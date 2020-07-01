import React, {Component} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";

class Update extends Component{
    constructor(props) {
        super(props);
        this.state = {cats:[], subCats:[], tCats:[]}
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('/api/categories/primary/null')
            .then(res => res.json())
            .then(data =>{
                //console.log("DATA OF CATS:", data)
                this.setState({cats:data});
            });

        fetch('/api/categories/secondary/null')
            .then(res => res.json())
            .then(data =>{
                //console.log("DATA OF SCATS:", data)
                this.setState({subCats:data});
            });

        fetch('/api/categories/ternary/null')
            .then(res => res.json())
            .then(data =>{
                //console.log("DATA OF SCATS:", data)
                this.setState({tCats:data});
            });
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
                subcategories: [event.target.category.value, event.target.subCategory.value, event.target.ItemType.value],
                sizes: (event.target.size.value).split(','),
                description:event.target.des.value,
                images:[event.target.Image1.value, event.target.Image2.value, event.target.Image3.value, event.target.Image4.value, event.target.Image2.value,]
            })
        })
        .then(res=> {
            res.json();
        })
        .then(result=> {
            alert("Success");
            this.props.getAllItems();
        })
        .catch(error=>{
            alert("Failed");
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
                                        defaultValue = {this.props.iname}
                                        placeholder="Item Name" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="ItemType">
                                    <Form.Label>Type:</Form.Label>
                                    <Form.Control as="select" defaultValue = {this.props.itype}>
                                        {this.state.tCats.map(tCat =>
                                            <option key={tCat._id}>{tCat.categoryName}</option>
                                        )}
                                    </Form.Control>
                                    </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col}controlId="category">
                                    <Form.Label>Category:</Form.Label>
                                    <Form.Control as="select" defaultValue = {this.props.icat}>
                                        {this.state.cats.map(cat =>
                                        <option key={cat._id}>{cat.categoryName}</option>
                                        )}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="price">
                                    <Form.Label>Price:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="price"
                                        defaultValue = {this.props.iprice}
                                        placeholder="Item Price" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col}controlId="subCategory">
                                    <Form.Label>Sub Category:</Form.Label>
                                    <Form.Control as="select" defaultValue = {this.props.isubcat}>
                                        {this.state.subCats.map(subCat =>
                                            <option key={subCat._id}>{subCat.categoryName}</option>
                                        )}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="size">
                                    <Form.Label>Size:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="size"
                                        defaultValue = {this.props.isize}
                                        placeholder="Sizes" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="des">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="des"
                                    defaultValue = {this.props.ides}
                                    placeholder="Item Description" />
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} controlId="Image1">
                                    <Form.Label>Image1</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Image1"
                                        defaultValue = {this.props.image[0]}
                                        placeholder="Image" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="Image2">
                                    <Form.Label> Image2</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Image2"
                                        defaultValue = {this.props.image[1]}
                                        placeholder="Image" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="Image3">
                                    <Form.Label> Image3</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Image3"
                                        defaultValue = {this.props.image[2]}
                                        placeholder="Image" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="Image4">
                                    <Form.Label>Image4</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Image4"
                                        defaultValue = {this.props.image[3]}
                                        placeholder="Image" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="Image5">
                                    <Form.Label>Image5</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Image5"
                                        defaultValue = {this.props.image[4]}
                                        placeholder="Image" />
                                </Form.Group>
                            </Form.Row>

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