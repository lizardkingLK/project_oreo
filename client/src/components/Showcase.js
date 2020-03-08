import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
} from 'reactstrap';

class Showcase extends Component {
    render() {
        return (
            <div id="showcase">
                <div id="showcase_card">
                    <h1 className="display-3" id="showcase_title">Fashion by Oreo</h1>
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
                                        lorem
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
                                        lorem
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
                                        lorem
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Showcase;