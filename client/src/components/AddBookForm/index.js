import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_BOOK } from '../../utils/mutations';
//import { QUERY_BOOKS } from '../../utils/queries';


const AddBookForm = () => {
    const [ bookBody , setBody] = useState('');

    const [addBook] = useMutation(ADD_BOOK);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setBody(values => ({...values, [name]: value}))
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(bookBody);
        try {
            await addBook ({
                variables: { bookBody }
            });
            setBody("");
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
                      value={bookBody.title || ""}
                      onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Genere</label>
                    <input className="form-control" id=""
                      type="text" 
                      name='genere'
                      value={bookBody.genere || ""}
                       onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input className ="form-control" id=""
                      type="text" 
                      name='description'
                      value={bookBody.description || ""}
                       onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Rent</label>
                    <input className="form-control" id=""
                      type="Number" 
                      name='rent'
                      value={bookBody.rent || ""}
                       onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input className="form-control" id=""
                      type="text" 
                      name='author'
                      value={bookBody.author || ""}
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
        