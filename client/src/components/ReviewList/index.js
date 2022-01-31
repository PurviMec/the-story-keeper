import React from 'react';
import { Link } from 'react-router-dom';

const ReviewList = ({ reviews }) => {
  return (
    <div className="card m-3">
      <div className="card-header">
        <span className="text-dark">Reviews</span>
      </div>
      <div className="card-body">
        {reviews &&
          reviews.map(review => (
            <p className="pill m-3 p-3 card" key={review._id}>
              {review.reviewText} {'//'} <br/>
              
              <span className='display-inline-block'> 
              <Link to={`/profile/${review.username}`} style={{ fontWeight: 700 }}>{review.username}</Link>
              {/* <h6>{review.username}</h6>  */}
              left review on {review.createdAt}</span>
            </p>
          ))}
      </div>
    </div>
  );
};

export default ReviewList;