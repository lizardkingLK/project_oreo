import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
} from 'reactstrap';

const Showcase = (props) => {
    const title = props.title;
    const contents = props.contents;

    const bodMen = contents.map(cont => {
        if(cont.category === 'Men') {
            return (
                <div className="content d-flex d-flex justify-content-center mb-3" key={cont.id}>
                    <div>Name : {cont.name}</div>
                </div>
            )
        }
    })

    const bodWomen = contents.map(cont => {
        if(cont.category === 'Women') {
            return (
                <div className="content d-flex d-flex justify-content-center mb-3" key={cont.id}>
                    <div>Name : {cont.name}</div>
                </div>
            )
        }
    })

    const bodKids = contents.map(cont => {
        if(cont.category === 'Kids') {
            return (
                <div className="content d-flex d-flex justify-content-center mb-3" key={cont.id}>
                    <div>Name : {cont.name}</div>
                </div>
            )
        }
    })

    return (
        <div id="showcase">
            <div id="showcase_card">
                <h1 className="display-3" id="showcase_title">{title}</h1>
                <p className="lead">Fashion because of busy life</p>
                <hr className="my-2" />
                <p>Oreo is a online shopping store made just for you.</p>
                <div className="lead">
                    <div className="row">
                        <div className="col-sm-4">
                            <Card className="bg_transparent">
                                <CardHeader>
                                    <CardTitle className="txt_secondary p-1">
                                        MEN
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    {bodMen}
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-sm-4">
                            <Card className="bg_transparent">
                                <CardHeader>
                                    <CardTitle className="txt_secondary p-1">
                                        WOMEN
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    {bodWomen}
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-sm-4">
                            <Card className="bg_transparent">
                                <CardHeader>
                                    <CardTitle className="txt_secondary p-1">
                                        KIDS
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    {bodKids}
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default Showcase;