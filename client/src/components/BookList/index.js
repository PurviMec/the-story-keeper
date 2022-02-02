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

  const [saveBook] = useMutation(ADD_FAVOURITE);

  const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = books.find((book) => book.bookId === bookId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveBook({
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
    <main className="display-flex">
      <div className="flex-row justify-space-between">
        {Auth.loggedIn() && (
          <div className="col-12 mb-3">
          <AddBookForm />
          </div>
         )}
      </div>  
      <div>
        <h2 className="text-center m-4 container">{title}</h2>
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
                  <p className="">Genere: {book.genere}</p>

                  <p className="">
                    By {""}
                    {book.author} On {book.publish}
                    {/* {""} Rent: {book.rent} */}
                  </p>
                  <p className="mb-0 ">
                    Reviews: {book.reviews.length}
                  </p>
                  {Auth.loggedIn() && 
                  <button onClick={() => handleSaveBook(book.bookId)}> 
                      Add to Favourite
                  </button> 
                  } 
                  {/* <p><Profile>Go to fav list</Profile> </p> */}
                </div>
              </div>
            </div>
          ))}
      </div>  
    </main>
  );
};

export default BookList;
