import React, { useState } from 'react';
import { 
    Modal,
    ModalBody
} from 'reactstrap';

import SingleReview from './SingleReview';

const Reviews = (props) => {
  const {
    authState,
    setAuthState,
    btnClass,
    item,
    buttonLabel,
    className,
    reviews
  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <div className={btnClass} onClick={toggle}>{buttonLabel}</div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalBody  style={{height: "90vh"}}>
          <div id="reviews_header" style={{display: "flex", flexDirection: "row", height: "max-content", alignItems: "center", justifyContent: "space-between"}}>
            <h5 id="reviewsH_name" style={{flex: "3", margin: "0 0 0 1vh", display: "flex", flexDirection: "column"}}>{item.name}</h5>
            <small id="reviewsH_cancel" style={{flex: "1", margin: "0 1vh 0 0", cursor: "pointer"}} onClick={toggle}>close</small>
          </div>
          <div id="reviews_body" style={{display: "flex", flexDirection: "column", height: "80vh", overflowY: "scroll"}}>
            <div id="reviewsB_reviewsContainer">
              {(reviews) 
              ?
                reviews.map( (r,index) => {
                  return (
                    <SingleReview 
                      key={index}
                      review={r}
                      authState={authState}
                      setAuthState={setAuthState}
                    />
                  )
                })
              :
              <div></div>
              }
            </div>
            <div id="reviewsB_yourReview">
              
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Reviews;