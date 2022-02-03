import React from 'react';
import { Link } from 'react-router-dom';

const BorrowList = ({ borrowList }) => {
    const borrowBookIds = (bookIdArr) => {
        if (bookIdArr.length) {
          localStorage.setItem('borrowed_books', JSON.stringify(bookIdArr));
        } else {
          localStorage.removeItem('borrowed_books');
        }
      };

      const borrowedBookIds = userData.borrowList.map((book) => book._id);
      borrowBookIds(borrowedBookIds); 
    
      if (borrowList){
        console.log(borrowList);
      }

    if (!borrowList) {
        return <p className="bg-dark text-light p-3"> You do not have any rented book!</p>;
    }
    console.log(borrowList);
    return (
        
        <div className='d-flex justify-content-center row'>
            <div className='col-12'><h4 className='page-headers text-center mb-4'>Rented Books:</h4></div>
            
            
                {borrowList.map(book => (
                    <div className="btn w-100 display-block mb-2 card col-9" key={book._id}>
                    <p className='card-header m-3'>{book.title}</p>
                    <p className='book-text mt-3'>{book.author}</p>   
                    <Link to={`/book/${book._id}`} className='card-body'>ID: {book._id}</Link>
                    </div>
                ))}
            
        </div>
                
       
    );
};

export default BorrowList;
