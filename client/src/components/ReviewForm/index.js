import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../../utils/mutations';

// import { useQuery  } from '@apollo/client';
import { QUERY_BOOK} from '../../utils/queries';

const ReviewForm = ({ bookId }) => {
  const [reviewText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addReview, { error }] = useMutation(ADD_REVIEW, {
    update(cache, { data: { addReview } }) {
      try {
      
        const { reviews } = cache.readQuery({ query: QUERY_BOOK });
        cache.writeQuery({
          query: QUERY_BOOK,
          data: { reviews: [addReview, ...reviews] },
        });
      } catch (e) {
        console.error(e);
      }
    }
  });

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
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
      setText('');
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