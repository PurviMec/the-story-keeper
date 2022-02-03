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
    <main className="row container mt-4">
      <div className="card m-3 flex-column col-10">
        <img src={singleBook} className="card-img-top book-img col-5" alt="/" />
        <h3 className=" col-5 card-title ">{book.title}</h3>
        <div className="card-body row">
          <h5>Genere: {""} </h5>
          <span>{book.genere}</span>
          {book.author}
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
