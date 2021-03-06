import React from "react";
import { useParams } from "react-router-dom";
//import { Link } from 'react-router-dom';
import Auth from "../utils/auth"

import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

import { useQuery } from "@apollo/client";
import { QUERY_BOOK } from "../utils/queries";

import singleBook from "../images/singleBook.png";

const SingleBook = (props) => {
  const { id: bookId } = useParams();
  console.log(bookId);

  const { loading, data } = useQuery(QUERY_BOOK, {
    variables: { id: bookId },
  });

  const book = data?.book || {};

  if (loading) {
    return <div page-headers>Loading...</div>;
  }

  return (
    <main className=" container mt-4">
      <div className="card m-3 card row mt-4">
        <div className="col-2"><img src={singleBook} className="book-img" alt="/" /></div>
        <div className="col-10"><h3 className=" col-5 card-title ">{book.title}</h3></div>
        <div className="card-body row">
          <p className="card-text">Genere: {""} {book.genere}</p>
          
          <p className="card-text">Author: {""} {book.author}</p>
          <p className="card-text">Publish: {new Date().getFullYear()}</p>
          
          <p className="card-text">{book.description}</p>
          {/* <a href="#" className="card-link" alt="/">Rent</a>
        <a href="#" className="card-link" alt="/">Add to favourite</a>    */}
        </div>
      </div>
      {/* <Link to={`/profile/${review.username}`} style={{ fontWeight: 700 }}></Link> */}
      {book.reviews.length > 0 && <ReviewList reviews={book.reviews} />}
      {Auth.loggedIn() && <ReviewForm bookId={book._id} />}
    </main>
  );
};

export default SingleBook;
