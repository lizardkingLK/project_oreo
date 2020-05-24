import React, {Component} from 'react';
import {IoIosAddCircleOutline} from 'react-icons/io';
import {FiRefreshCcw} from 'react-icons/fi';
//import {Link} from "react-router-dom";

class Collections extends Component {
    render() {
        return (
            <div>
            <div className="row">
                <div className="col">
                <button className="btn btn-dark border-warning mt-5" style={{fontSize: '20px',marginLeft: '215px', height: '120px', width : '120px'}} onClick={this.refreshPage}><IoIosAddCircleOutline size={35}/> Add Collection</button>
                </div>
                <div className="col">
                    <button className="btn btn-dark border-warning mt-5" style={{fontSize: '20px',marginLeft: '215px', height: '120px', width : '120px'}} onClick={this.refreshPage}><FiRefreshCcw size={35}/> Refresh</button>
                </div>
                </div>
                <div className="row">

                </div>
            </div>
        )
    }
}

export default Collections;