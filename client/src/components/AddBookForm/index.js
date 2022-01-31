import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_BOOK } from '../../utils/mutations';


const AddBookForm = () => {
    const [ args, setArgs] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addBook] = useMutation(ADD_BOOK);

    const handleChange = (event) => {
        if (event.target.value.length) {
            setArgs(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

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
                    <input type="text" className="form-control" id="" 
                      value={args}
                      onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Genere</label>
                    <input type="genere" className="form-control" id=""
                      value={args}
                      onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    Character Count: {characterCount}/280
                    <label className="form-label">Description</label>
                    <input type="description" className ="form-control" id=""
                      value={args}
                      onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Rent</label>
                    <input type="rent" className="form-control" id=""
                      value={args}
                      onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input type="author" className="form-control" id=""
                      value={args}
                      onChange={handleChange}
                    />
                </div>
                <button type="submit" className ="btn btn-primary">Submit</button>
            </form>
        </div>

    )
}

export default AddBookForm;