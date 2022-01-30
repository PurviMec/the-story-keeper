import React from 'react';

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
              <span className='display-inline-block'> <h6>{review.username}</h6> left review on <h6>{review.createdAt}</h6></span>
            </p>
          ))}
      </div>
    </div>
  );
};

export default ReviewList;