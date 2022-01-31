import React from 'react';
import { Link } from 'react-router-dom';

const BorrowList = ({ borrowList }) => {
    if (!borrowList) {
        return <p className="bg-dark text-light p-3"> You do not have any rented book!</p>;
    }
    console.log(borrowList);
    return (
        
        <div className=''>
            <h4>Rented Books:</h4> 
            <div className=''>
                {borrowList.map(book => (
                    <div className="btn w-100 display-block mb-2 card" key={book._id}>
                    <p className='card-header'>{book.title}</p>   
                    <Link to={`/book/${book._id}`} className='card-body'>ID: {book._id}</Link>
                    </div>
                ))}
            </div>
        </div>
                
       
    );
};

export default BorrowList;
