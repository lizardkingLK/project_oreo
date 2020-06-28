import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalBody
} from 'reactstrap';
import axios from 'axios';

import SingleReview from './ratings/SingleReview';

const Reviews = (props) => {
  const {
    authState,
    setAuthState,
    btnClass,
    item,
    buttonLabel,
    className
  } = props;

  const id = item._id;
  const [modal, setModal] = useState(false);
  const [reviews, setReviews] = useState('');

  const toggle = () => setModal(!modal);

  useEffect(() => {
    const loadReviews = async () => {
      await axios.get('/api/reviews/item/' + id)
        .then(res => {
          setReviews(res.data)
        });
    }

    loadReviews();
  }, [id]);

  return (
    <div>
      <div className={btnClass} style={{ cursor: "pointer" }} onClick={toggle}>{buttonLabel}</div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalBody style={{ height: "90vh" }}>
          <div
            id="reviews_header"
            style={{
              display: "flex",
              flexDirection: "row",
              height: "max-content",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "1vh 0"
            }}
          >
            <h5
              id="reviewsH_name"
              style={{
                flex: "3",
                margin: "0 1vh",
                display: "flex",
                flexDirection: "column",
                color: "var(--primaryDark)"
              }}
            >
              {item.name}
            </h5>
            <small
              id="reviewsH_cancel"
              style={{
                flex: "1",
                margin: "0 1vh",
                cursor: "pointer",
                textAlign: "right",
                color: "var(--primaryDark)"
              }}
              onClick={toggle}
            >
              <i className="fa fa-times"></i>
            </small>
          </div>
          <div
            id="reviews_body"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "75vh",
              overflowY: "scroll"
            }}
          >
            <div id="reviewsB_reviewsContainer">
              {(reviews.length !== 0)
                ?
                reviews.map((r, index) => {
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