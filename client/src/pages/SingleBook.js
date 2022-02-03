import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import { Link } from 'react-router-dom';
import Auth from "../utils/auth"

import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_BOOK } from "../utils/queries";
import { ADD_BORROW } from "../utils/mutations";

import singleBook from "../images/singleBook.png";

const SingleBook = (props) => {
  const { id: bookId } = useParams();
  console.log(bookId);

  const { loading, data } = useQuery(QUERY_BOOK, {
    variables: { id: bookId },
  });

  const book = data?.book || {};

  const getBorrowedBookIds = () => {
    const borrowedBookIds = localStorage.getItem("borrowed_books")
      ? JSON.parse(localStorage.getItem("borrowed_books"))
      : [];

    return borrowedBookIds;
  };

  const borrowBookIds = (bookIdArr) => {
    if (bookIdArr.length) {
      localStorage.setItem("borrowed_books", JSON.stringify(bookIdArr));
    } else {
      localStorage.removeItem("borrowed_books");
    }
  };

  const [borrowedBookIds, setBorrowedBookIds] = useState(getBorrowedBookIds());

  useEffect(() => {
    // let isMounted = true; // note this flag denote mount status
    return () => {
      borrowBookIds(borrowedBookIds);
      // isMounted = false;
    };
  });

  const [borrowBook] = useMutation(ADD_BORROW);

  const handleSaveBook = async (bookId) => {
    console.log(bookId, "this si sthe book id");
    // find the book in `searchedBooks` state by the matching id
    const bookToBorrow = book.find((book) => book._id === bookId);
    console.log(bookToBorrow);
    const payload = {
      _id: bookToBorrow._id,
      title: bookToBorrow.title,
      description: bookToBorrow.description,
      author: bookToBorrow.author,
      publish: bookToBorrow.publish,
    };
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await borrowBook({
        variables: {
          input: payload,
        },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }

      // if book successfully saves to user's account, save book id to state
      setBorrowedBookIds([...borrowedBookIds, bookToBorrow._id]);
    } catch (err) {
      console.error(err);
    }
  };


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
        <button className="addFavBtn" onClick={() => handleSaveBook(book._id)}>Add to Borrowed List</button>
        </div>
      </div>
      {/* <Link to={`/profile/${review.username}`} style={{ fontWeight: 700 }}></Link> */}
      {book.reviews.length > 0 && <ReviewList reviews={book.reviews} />}
      {Auth.loggedIn() && <ReviewForm bookId={book._id} />}
    </main>
  );
};

export default SingleBook;
