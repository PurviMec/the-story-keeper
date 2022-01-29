import React from 'react';

const BookList = (books, title) => {
//   if (!books.length) {
//     return <h3>No books Yet</h3>;
//   }

  return (
    <div>
      <h3>{books}</h3>
      {/* {books &&
        books.map(book => (
          <div key={book._id} className="card mb-3">
            <p className="card-header">
              {book.author}
              thought on {book.createdAt}
            </p>
            <div className="card-body">
              <p>{book.description}</p>
              <p className="mb-0">
                Reviews: {book.reviews} || Click to{' '}
                {book.reviewCount ? 'see' : 'start'} the discussion!
              </p>
            </div>
          </div>
        ))} */}
    </div>
  );
};

export default BookList;