import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {  Modal, ModalBody } from 'reactstrap';
import axios from 'axios';

const SignUpWindow = (props) => {
    const {
        setAuthState,
        buttonLabel,
        className,
        linkStyle
    } = props;
    
    const [modal, setModal] = useState(false);
    const togglesignup = () => setModal(!modal);

    let msgA = 'Please enter all fields';
    let msgB = 'User already exists';
    let msgC = 'Passwords do not match';
    let errMsg = null;
    let name = '';
    let firstName = '';
    let lastName = '';
    let email = '';
    let pwdA = '';
    let pwdB = '';
    let password = '';
    
    const handleChange = (e) => {
    let type = e.target.id;
    let value = e.target.value;

        switch(type) {
            case 'sUfirstName':
            firstName = value;
            break;
            case 'sUlastName':
            lastName = value;
            break;
            case 'sUemail':
            email = value;
            break;
            case 'sUpasswordA':
            pwdA = value;
            break;
            case 'sUpasswordB':
            pwdB = value;
            break;
            default:
            break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        name = `${firstName} ${lastName}`;
        password = pwdA;

        if(pwdA === pwdB) {
            await axios.post('/api/users', {name,email,password})
            .then(res => {
                // set user in the state
                setAuthState(res.data.token);
            })
            .catch(err => {
                let type = err.response.data.msg;
                switch(type) {
                    case msgA:
                    errMsg = React.createElement('small', {id: "signUpWindowBCBsiFFerrC_errMsg"}, msgA);
                    break;
                    case msgB:
                    errMsg = React.createElement('small', {id: "signUpWindowBCBsiFFerrC_errMsg"}, msgB);
                    break;
                    default:
                    console.log(type);
                    break;
                }
                ReactDOM.render(
                errMsg,
                document.querySelector('#signUpWindowBCBsiFF_errContainer')
                );
            })
        }
        else {
            errMsg = React.createElement('small', {id: "signUpWindowBCBsiFFerrC_errMsg"}, msgC);
            ReactDOM.render(
            errMsg, 
            document.querySelector('#signUpWindowBCBsiFF_errContainer')
            );
        }
    }

    return (
    <div>
        <h3 id={linkStyle} onClick={togglesignup}>{buttonLabel}</h3>
        <Modal id="signUpWindow" isOpen={modal} className={className}>
        <ModalBody id="signUpWindow_body">
            <div id="signUpWindowB_content">
            <div id="signUpWindowBC_header">
                <h5 id="signUpWindowBCH_left">SignUp</h5>
            </div>
            <div id="signUpWindowBC_body">
                <form id="signUpWindowBCB_signUpForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="sUfirstName">First Name</label>
                    <input type="text" placeholder="Enter firstname..." className="form-control form-control-sm" id="sUfirstName" aria-describedby="firstNameHelp" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="sUlastName">Last Name</label>
                    <input type="text" placeholder="Enter lastname..." className="form-control form-control-sm" id="sUlastName" aria-describedby="lastNameHelp" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="sUemail">Email address</label>
                    <input type="email" placeholder="Enter email..." className="form-control form-control-sm" id="sUemail" aria-describedby="emailHelp" onChange={handleChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="sUpasswordA">Enter Password</label>
                    <input type="password" placeholder="Enter password..." className="form-control form-control-sm" id="sUpasswordA" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="sUpasswordB">Repeat Password</label>
                    <input type="password" placeholder="Repeat password..." className="form-control form-control-sm" id="sUpasswordB" onChange={handleChange} />
                </div>
                <div id="signUpWindowBCBsiF_footer">
                    <button type="submit" className="btn btn-sm btn-outline-dark">SignUp</button>
                    <div id="signUpWindowBCBsiFF_errContainer">
                    {/* <small id="signUpWindowBCBsiFFerrC_errMsg">Error!</small> */}
                    </div>
                </div>
                </form>
            </div>
            <div id="signUpWindowBC_footer">
                <button id="signUpWindowBCF_cancel" onClick={togglesignup} className="btn btn-link">Cancel</button>
            </div>
            </div>
        </ModalBody>
        </Modal>
    </div>
    );
}

export default SignUpWindow;