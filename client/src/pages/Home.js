import React from 'react';
import BookList from '../components/BookList';

import { useQuery } from "@apollo/client";


import { QUERY_BOOKS } from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_BOOKS);

    // use useQuery hook to make query request
    const books = data?.books || [];
    console.log(books);

  
    return (
        <main>
            <div className='flex-row justify-space-between'>
            <div className="col-12 mb-3">
        {loading ? (
            <div page-headers>Loading...</div>
        ) : (
            <BookList books = {books} title="Available Books.." />
        )} 
        </div>
            </div>
        </main>
    );
};

export default Home;