import React from 'react';
import { Link } from 'react-router-dom';
//import { useQuery, useMutation } from "@apollo/client";
//import Auth from "../../utils/auth";
//import { removeBookId, saveBookIds } from "../../utils/localStorage";
//import { QUERY_ME } from "../../utils/queries";
//import { REMOVE_FAVOURITE } from "../../utils/mutations";

const FavouriteList = ({ favouriteList }) => {
  
  

  if (!favouriteList.length) {
    return <h2 className="bg-dark text-light p-3 page-headers"> add some books!</h2>;
  }
   
    return (
       
           
        <div className='d-flex justify-content-center row'>
            <div className='col-12'><h4 className='page-headers text-center mb-4'>Favourite Books:</h4></div> 
         
                {favouriteList.map(book => (
                    <div className="btn w-100 display-block mb-2 card col-9" key={book._id}>
                    <Link to={`/book/${book._id}`}>
                    <h2 className="card-header">{book._id}</h2>
                     </Link>
                     <p className='book-text mt-3'>{book.title}</p>
                    <p className='book-text mt-3'>{book.author}</p>  
                    
                    </div>
                ))}
            </div>
           

       
    );
};

export default FavouriteList;

      