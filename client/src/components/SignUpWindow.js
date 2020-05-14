import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {  NavLink, Modal, ModalBody } from 'reactstrap';
import axios from 'axios';

const SignUpWindow = (props) => {
    const {
        setAuthState,
        buttonLabel,
        className
      } = props;
    
      const [modal, setModal] = useState(false);
      const togglesignup = () => setModal(!modal);
    
      let msgA = 'Please enter all fields';
      let msgB = 'User already exist';
      let errMsg = null;
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
          togglesignup();
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
    
      return (
        <div>
          <NavLink style={{cursor: "pointer"}} onClick={togglesignup}>{buttonLabel}</NavLink>
          <Modal id="signUpWindow" isOpen={modal} togglesignup={togglesignup} className={className}>
            <ModalBody id="signUpWindow_body">
              <div id="signUpWindowB_content">
                <div id="signUpWindowBC_header">
                  <h5 id="signUpWindowBCH_left">SignUp</h5>
                </div>
                <div id="signUpWindowBC_body">
                  <form id="signUpWindowBCB_signUpForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="sUfirstName">First Name</label>
                      <input type="text" className="form-control" id="sUfirstName" aria-describedby="firstNameHelp" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="sUlastName">Last Name</label>
                      <input type="text" className="form-control" id="sUlastName" aria-describedby="lastNameHelp" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="sUemail">Email address</label>
                      <input type="email" className="form-control" id="sUemail" aria-describedby="emailHelp" onChange={handleChange} />
                      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="sUpasswordA">Enter Password</label>
                      <input type="password" className="form-control" id="sUpasswordA" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="sUpasswordB">Repeat Password</label>
                      <input type="password" className="form-control" id="sUpasswordB" onChange={handleChange} />
                    </div>
                    <div id="signUpWindowBCBsiF_footer">
                      <button type="submit" className="btn btn-sm btn-outline-dark">SignUp</button>
                      <div id="signUpWindowBCBsiFF_errContainer">
                        {/* <small id="signUpWindowBCBsiFFerrC_errMsg">asdf</small> */}
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