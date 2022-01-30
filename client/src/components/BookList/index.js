import React from "react";
import { Link } from "react-router-dom";


const BookList = ({ books, title }) => {
  if (!books.length) {
    return <h3>No books Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {books &&
        books.map((book) => (
          <div key={book._id} className="card mb-3">
            <Link to={`/book/${book._id}`}>
              <h2 className="card-header">{book.title}</h2>
            </Link>

            <div className="card-body">
              <p>Genere: {book.genere}</p>

              <p>
                By {""}
                {book.author} On {book.publish}
                {""} Rent: {book.rent}
              </p>
              <p className="mb-0">
                Reviews: {book.reviews.length} || Click here{" "}
                {book.reviews.length ? "see" : "start"} leave review!
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BookList;
