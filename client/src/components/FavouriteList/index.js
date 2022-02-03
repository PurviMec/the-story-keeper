import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
//import { removeBookId, saveBookIds } from "../../utils/localStorage";
import { QUERY_ME, QUERY_USER } from "../../utils/queries";
import { REMOVE_FAVOURITE } from "../../utils/mutations";

const FavouriteList = ({ favouriteList}) => {
  const saveBookIds = (bookIdArr) => {
    if (bookIdArr.length) {
      localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
    } else {
      localStorage.removeItem('saved_books');
    }
  };

  const removeBookId = (bookId) => {
    const savedBookIds = localStorage.getItem('saved_books')
      ? JSON.parse(localStorage.getItem('saved_books'))
      : null;
  
    if (!savedBookIds) {
      return false;
    }
    const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
    localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));
  
    return true;
  };
    const { loading, data } = useQuery(QUERY_ME);
    const userData = data?.me || [];

    const [removeBook, { error }] = useMutation(REMOVE_FAVOURITE);

    const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await removeBook({
        variables: { bookId: bookId },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }
      removeBookId(bookId);
    } catch (err) {
      console.error(error);
    }
  };

  
  // if data isn't here yet, say so
  if (loading) {
    return <h2 className='page-headers'>LOADING...</h2>;
  }

  const savedBookIds = userData.favouriteList.map((book) => book._id);
  saveBookIds(savedBookIds); 

  if (favouriteList){
    console.log(favouriteList);
  }

  if (!favouriteList) {
    return <h2 className="bg-dark text-light p-3 page-headers"> add some books!</h2>;
  }

  console.log(savedBookIds);
    return (
       
           
        <div className='d-flex justify-content-center row'>
            <div className='col-12'><h4 className='page-headers text-center mb-4'>Favourite Books:</h4></div> 
         
                {favouriteList.map(book => (
                    <div className="btn w-100 display-block mb-2 card col-9" key={book._id}>
                    <p className='card-header m-3'>{book.title}</p> 
                    <p className='book-text mt-3'>{book.author}</p>  
                    <Link to={`/book/${book._id}`} className='card-body'> {book._id}</Link>
                    <button onClick={() => handleDeleteBook(book.bookId)} className='btn-secondary'>Remove </button>
                    </div>
                ))}
            </div>
           

       
    );
};

export default FavouriteList;

      