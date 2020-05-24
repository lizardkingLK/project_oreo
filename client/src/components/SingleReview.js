import React from 'react';

const SingleReview = (props) => {
    const { 
        authState, 
        setAuthState, 
        review 
    } = props;

    return (
        <div style={{margin: "1vh 2vh 1vh 2vh"}}>
            <hr/>
            <div className="singleReview_topA" style={{margin: "1vh 2vh 1vh 2vh", display: "flex", flexDirection: "row", height: "max-content", alignItems: "center", justifyContent: "space-between"}}>
                <small className="singleReviewTopA_A">Rating : {review.rating}</small>
                <small className="singleReviewTopA_B">{new Date(review.createdDate).toDateString()}</small>
            </div>
            <div className="singleReview_topB" style={{margin: "1vh 2vh 1vh 2vh", display: "flex", flexDirection: "column", height: "max-content"}}>
                <strong className="singleReviewTopB_A">{review.title}</strong>
            </div>
            <div className="singleReview_topC" style={{margin: "1vh 2vh 1vh 2vh", display: "flex", flexDirection: "row", height: "max-content", alignItems: "center"}}>
                <p className="singleReviewTopC_A">{review.description}</p>
            </div>
            <div className="singleReview_topD" style={{margin: "1vh 2vh 1vh 2vh", display: "flex", flexDirection: "row", height: "max-content", alignItems: "center", justifyContent: "space-between"}}>
                <small className="singleReviewTopD_A" style={{flex: "1"}}>Was this review helpful?</small>
                <div className="singleReviewTopD_B" style={{flex: "1", display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                    <small className="singleReviewTopDB_a">Yes ({review.helpful})</small>
                    <small className="singleReviewTopDB_b">No ({review.notHelpful})</small>
                </div>
            </div>
            <hr/>
        </div>
    )
};

export default SingleReview;