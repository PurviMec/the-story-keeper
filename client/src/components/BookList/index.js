import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import addBook from "../../images/addBook.png";
import AddBookForm from "../AddBookForm";
import Auth from "../../utils/auth";
//import { saveBookIds, getSavedBookIds } from "../../utils/localStorage";
//import Profile from "../../pages/Profile";

import { ADD_FAVOURITE } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

const BookList = ({ books, title }) => {
  const getSavedBookIds = () => {
    const savedBookIds = localStorage.getItem("saved_books")
      ? JSON.parse(localStorage.getItem("saved_books"))
      : [];

    return savedBookIds;
  };

  const saveBookIds = (bookIdArr) => {
    if (bookIdArr.length) {
      localStorage.setItem("saved_books", JSON.stringify(bookIdArr));
    } else {
      localStorage.removeItem("saved_books");
    }
  };

  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    // let isMounted = true; // note this flag denote mount status
    return () => {
      saveBookIds(savedBookIds);
      // isMounted = false;
    };
  });

  const [saveBook] = useMutation(ADD_FAVOURITE);

  const handleSaveBook = async (bookId) => {
    console.log(bookId, "this si sthe book id");
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = books.find((book) => book._id === bookId);
    console.log(bookToSave);
    const payload = {
      _id: bookToSave._id,
      title: bookToSave.title,
      description: bookToSave.description,
      author: bookToSave.author,
      publish: bookToSave.publish,
    };
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveBook({
        variables: {
          input: payload,
        },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }

      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, bookToSave._id]);
    } catch (err) {
      console.error(err);
    }
  };

  if (!books.length) {
    return <h3 className="page-headers">No books Yet</h3>;
  }

  return (
    <main className="display-flex">
      <div className="flex-row justify-space-between">
        {Auth.loggedIn() && (
          <div className="col-12 mb-3">
            <AddBookForm />
          </div>
        )}
      </div>
      <div>
        <h2 className="text-center m-4 container page-headers">{title}</h2>
        {books &&
          books.map((book) => (
            <div key={book._id} className="card row m-2 justify-space-between">
              <div className="card-body m-1 col-12">
                <div className="flex-row card-title col-12 ">
                  <Link to={`/book/${book._id}`}>
                    <h2 className="card-header">{book.title}</h2>
                  </Link>
                </div>
                <div className="card-text col-lg-12">
                  <p>Genere: {book.genere}</p>

                  <p>
                    Author: {""}By {""}
                    <span className="mb-2">{book.author}</span>
                  </p>
                  <p>Publish: {new Date().getFullYear()}</p>
                  <p className="mb-3">Reviews: {book.reviews.length}</p>
                  {Auth.loggedIn() && (
                    <button
                      disabled={savedBookIds?.some(
                        (savedBookId) => savedBookId === book._id
                      )}
                      className="addFavBtn"
                      onClick={() => handleSaveBook(book._id)}
                    >
                      {savedBookIds?.some(
                        (savedBookId) => savedBookId === book._id
                      )
                        ? "Saved Book!"
                        : "Save this Book!"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default BookList;
