import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import addBook from "../../images/addBook.png"
import AddBookForm from "../AddBookForm";
import Auth from '../../utils/auth';
import { saveBookIds, getSavedBookIds } from "../../utils/localStorage";
//import Profile from "../../pages/Profile";

import { ADD_FAVOURITE } from "../../utils/mutations";
import { useMutation } from "@apollo/client";


const BookList = ({ books, title }) => {
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

  const [addFavourite] = useMutation(ADD_FAVOURITE);

  const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = books.find((book) => book.bookId === bookId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await addFavourite({
        variables: {
          input: bookToSave,
        },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }

      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  if (!books.length) {
    return <h3>No books Yet</h3>;
  }

  return (
    <main className="container">
      <div className="flex-row justify-space-between">
        {Auth.loggedIn() && (
          <div className="col-12 mb-3">
          <AddBookForm />
          </div>
         )}
      </div>  

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
                <button onClick={() => handleSaveBook(book.bookId)}> 
                    <img src={addBook} className="text-align-right" style={{height: "30px"}}  alt="add favourite"/>
                  </button>  
                 {/* <p><Profile>Go to fav list</Profile> </p> */}
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default BookList;
