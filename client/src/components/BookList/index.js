import React from "react";
import { Link } from "react-router-dom";
//import addBook from "../../images/addBook.png"
import AddBookForm from "../AddBookForm";
//import Auth from '../../utils/auth';


const BookList = ({ books, title }) => {
  if (!books.length) {
    return <h3>No books Yet</h3>;
  }

  return (
    <main className="container">
      <div className="flex-row justify-space-between">
        {/* {Auth.loggedIn() && ( */}
          <div className="col-12 mb-3">
          <AddBookForm />
          </div>
        {/* )} */}
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
                {/* <p>
                  Add to Favourite:
                  <Link to={`/profile`}>  
                    <img src={addBook} className="text-align-right" style={{height: "30px"}}  alt="image add fav book list"/>
                  </Link>
                </p> */}
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default BookList;
