import React from 'react';
import { Link } from 'react-router-dom';

const FavouriteList = ({ favouriteList}) => {
  if (!favouriteList) {
    return <p className="bg-dark text-light p-3"> add some books!</p>;
  }
  console.log(favouriteList);
    return (
       
           
        <div className=''>
            <h4>Favourite Books:</h4> 
            <div className=''>
                {favouriteList.map(book => (
                    <div className="btn w-100 display-block mb-2 card" key={book._id}>
                    <p className='card-header'>{book.title}</p>   
                    <Link to={`/book/${book._id}`} className='card-body'>ID: {book._id}</Link>
                    </div>
                ))}
            </div>
        </div>
           

       
    );
};

export default FavouriteList;

      