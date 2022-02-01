import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { removeBookId, saveBookIds } from "../../utils/localStorage";
import { QUERY_ME, QUERY_USER } from "../../utils/queries";
import { REMOVE_FAVOURITE } from "../../utils/mutations";

const FavouriteList = ({ favouriteList}) => {
    

    const { loading, data } = useQuery(QUERY_ME, QUERY_USER);
    const userData = data?.me || data?.user || [];

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
    return <h2>LOADING...</h2>;
  }

  if (!favouriteList) {
    return <p className="bg-dark text-light p-3"> add some books!</p>;
  }

  const savedBookIds = userData.favouriteList.map((book) => book.bookId);
  saveBookIds(savedBookIds); 

  console.log(favouriteList);
    return (
       
           
        <div className=''>
            <h4>Favourite Books:</h4> 
            <div className=''>
                {favouriteList.map(book => (
                    <div className="btn w-100 display-block mb-2 card" key={book._id}>
                    <p className='card-header'>{book.title}</p>   
                    <Link to={`/book/${book._id}`} className='card-body'>ID: {book._id}</Link>
                    <button onClick={() => handleDeleteBook(book.bookId)}>Remove </button>
                    </div>
                ))}
            </div>
        </div>
           

       
    );
};

export default FavouriteList;

      