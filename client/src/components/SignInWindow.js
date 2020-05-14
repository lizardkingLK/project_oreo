import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {  NavLink, Modal, ModalBody } from 'reactstrap';
import axios from 'axios';

import SignUpWindow from './SignUpWindow';

const SignInWindow = (props) => {
  const {
    setAuthState,
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const togglesignin = () => setModal(!modal);

  let msgA = 'Please enter all fields';
  let msgB = 'User does not exist';
  let msgC = 'Invalid credentials';
  let errMsg = null;
  let email = '';
  let password = '';
  
  const handleChange = (e) => {
    let type = e.target.id;
    let value = e.target.value;

    switch(type) {
      case 'sIemail':
        email = value;
        break;
      case 'sIpassword':
        password = value;
        break;
      default:
        break;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/auth', {email,password})
    .then(res => {
      // set user in the state
      setAuthState(res.data.token);
      togglesignin();
    })
    .catch(err => {
      let type = err.response.data.msg;
        switch(type) {
          case msgA:
            errMsg = React.createElement('small', {id: "signInWindowBCBsiFFerrC_errMsg"}, msgA);
            break;
          case msgB:
            errMsg = React.createElement('small', {id: "signInWindowBCBsiFFerrC_errMsg"}, msgB);
            break;
          case msgC:
            errMsg = React.createElement('small', {id: "signInWindowBCBsiFFerrC_errMsg"}, msgC);
            break;
          default:
            console.log(type);
            break;
        }
      ReactDOM.render(
        errMsg,
        document.querySelector('#signInWindowBCBsiFF_errContainer')
      );
    })
  }

  return (
    <div>
      <NavLink style={{cursor: "pointer"}} onClick={togglesignin}>{buttonLabel}</NavLink>
      <Modal id="signInWindow" isOpen={modal} toggleSignIn={togglesignin} className={className}>
        <ModalBody id="signInWindow_body">
          <div id="signInWindowB_content">
            <div id="signInWindowBC_header">
              <h5 id="signInWindowBCH_left">SignIn</h5>
              <p onClick={togglesignin} id="signInWindowBCH_right">New to Oreo? </p><SignUpWindow id="signInWindowBCH_rightB" setAuthState={props.setAuthState} buttonLabel={"Join us"} className={"modal-dialog modal-lg"} />
            </div>
            <div id="signInWindowBC_body">
              <form id="signInWindowBCB_signinForm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="sIemail">Email address</label>
                  <input type="email" className="form-control" id="sIemail" aria-describedby="emailHelp" onChange={handleChange} />
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                  <label htmlFor="sIpassword">Password</label>
                  <input type="password" className="form-control" id="sIpassword" onChange={handleChange} />
                </div>
                <div className="form-group form-check">
                  <input type="checkbox" className="form-check-input" id="sIsignedIn" />
                  <label htmlFor="sIsignedIn" className="form-check-label">Keep me signed in</label>
                </div>
                <div id="signInWindowBCBsiF_footer">
                  <button type="submit" className="btn btn-sm btn-outline-dark">SignIn</button>
                  <div id="signInWindowBCBsiFF_errContainer">
                    {/* <small id="signInWindowBCBsiFFerrC_errMsg">asdf</small> */}
                  </div>
                </div>
              </form>
            </div>
            <div id="signInWindowBC_footer">
              <button id="signInWindowBCF_cancel" onClick={togglesignin} className="btn btn-link">Cancel</button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default SignInWindow;