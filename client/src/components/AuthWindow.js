import React, { useState } from 'react';
import { Modal, ModalBody, Fade } from 'reactstrap';
import axios from 'axios';

const AuthWindow = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [fadeIn, setFadeIn] = useState(false);
  const fadeToggle = () => setFadeIn(!fadeIn);

  let msgA = 'Please enter all fields';
  let msgB = 'User does not exist';
  let msgC = 'Invalid credentials';

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
      console.log(res.data);
      // toggle();
    })
    .catch(err => {
      let type = err.response.data.msg;
      console.log(type);
      switch(type) {
        case msgA:
          fadeToggle();
          break;
        case msgB:
          fadeToggle();
          break;
        case msgC:
          fadeToggle();
          break;
        default:
          break;
      }
    })
  }

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
              <form id="authWindowBCB_signinForm" onSubmit={handleSubmit}>
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
                <div id="authWindowBCBsiF_footer" style={{display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center"}}>
                  <button type="submit" className="btn btn-sm btn-outline-dark">SignIn</button>
                  <Fade in={fadeIn} tag="small" className="col_primary_accent mt-2" id="authWindowBCBsiFF_msg"></Fade>
                </div>
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