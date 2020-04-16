import React, { useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';

const AuthWindow = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <p onClick={toggle}>{buttonLabel}</p>
      <Modal id="authWindow" isOpen={modal} toggle={toggle} className={className}>
        <ModalBody id="authWindow_body">
          <div id="authWindowB_content">
            <div id="authWindowBC_header">
              <h5 id="authWindowBCH_left">SignIn</h5>
              <p id="authWindowBCH_right">New to Oreo? <small id="authWindowBCH_rightB">SignUp</small></p>
            </div>
            <div id="authWindowBC_body">
            <form id="authWindowBCB_signupForm">
              <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" />
              </div>
              <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label">Keep me signed in</label>
              </div>
              <button type="submit" className="btn btn-sm btn-outline-dark">SignIn</button>
            </form>
            </div>
            <div id="authWindowBC_footer" style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "var(--primaryAccent)", height: "5vh", width: "100%"}}>
              <button onClick={toggle} style={{color: "var(--primaryLight"}} className="btn btn-link">Cancel</button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default AuthWindow;