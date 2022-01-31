import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../../utils/mutations';

// import { useQuery  } from '@apollo/client';
// import { QUERY_USER } from '../../utils/queries';

const ReviewForm = ({ bookId }) => {
  const [reviewText, setBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addReview, { error }] = useMutation(ADD_REVIEW);
  // const { user }= useQuery(QUERY_USER);

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(reviewText)
    try {
      await addReview({
        variables: { reviewText, bookId },
      });
      
      // clear form value
      setBody('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Leave a reaction to this thought..."
          value={reviewText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>

        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>

      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default ReviewForm;