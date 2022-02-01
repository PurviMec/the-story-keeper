import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_BOOK } from '../../utils/mutations';
import { QUERY_BOOKS } from '../../utils/queries';


const AddBookForm = () => {
    const [ args , setArgs] = useState('');

    const [addBook] = useMutation(ADD_BOOK, {
        update(cache, { data: { addBook } }) {
          // read what's currently in the cache
          const { books } = cache.readQuery({ query: QUERY_BOOKS});
      
          // prepend the newest thought to the front of the array
          cache.writeQuery({
            query: QUERY_BOOKS,
            data: { books: [addBook, ...books] }
          });
        }
      });
      

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setArgs(values => ({...values, [name]: value}))
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(args);
        try {
            await addBook ({
                variables: { args }
            });
            setArgs("");
        } catch (e) {
            console.error(e);
        }
    }
    return(
        <div className='flex-row justify-center justify-space-between-md align-stretch'>
            <p className="card-header">
                Add New Book 
            </p>
            <form className="card" onSubmit={handleFormSubmit}>
                <div className="mb-3 mt-3">
                    <label  className="form-label">Book Title</label>
                    <input  className="form-control" id="" 
                      type="text" 
                      name='title'
                      value={args.title || ""}
                      onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Genere</label>
                    <input className="form-control" id=""
                      type="text" 
                      name='genere'
                      value={args.genere || ""}
                       onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input className ="form-control" id=""
                      type="text" 
                      name='description'
                      value={args.description || ""}
                       onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Rent</label>
                    <input className="form-control" id=""
                      type="Number" 
                      name='rent'
                      value={args.rent || ""}
                       onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input className="form-control" id=""
                      type="text" 
                      name='author'
                      value={args.author || ""}
                       onChange={handleChange}
                    />
                </div>
                <button type="submit" className ="btn btn-primary">Submit</button>
            </form>
        </div>

    )
}

export default AddBookForm;

    // 
        