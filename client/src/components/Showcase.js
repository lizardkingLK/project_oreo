import React, { Component } from 'react';
import {
    Button
} from 'reactstrap';

class Showcase extends Component {
    render() {
        return (
            <div id="showcase">
                <div id="showcase_card">
                    <h1 className="display-3" id="showcase_title">Fashion by Oreo</h1>
                    <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr className="my-2" />
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <p className="lead">
                        <Button color="outline-dark">Learn More</Button>
                    </p>
                </div>
            </div>
        )
    }
}

export default Showcase;