import React from 'react';

const BookList = ({ books, title}) => {
  
  if (!books.length) {
    return <h3>No books Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {books &&
        books.map(book => (
          <div key={book._id} className="card mb-3">
            <h2>{book.title}</h2>
            
            <div className="card-body">
            <p className="card-header">
              Genere: {' '} {book.genere}
            </p>

            <p className="card-header">
              By {''}{book.author} On {book.publish}
              {''} Rent: {book.rent}
            </p>
              <p className="mb-0">
                Reviews: {book.reviewsCount} || Click to{' '}
                {book.reviewsCount ? 'see' : 'start'} the discussion!
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BookList;