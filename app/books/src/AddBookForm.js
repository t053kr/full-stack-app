import React, { useState } from 'react'

const AddBookForm = props => {

    // Initialize empty form
    const initialFormState = { author: '', title: '', description: '' }

    // Set state
    const [ book, setBook ] = useState(initialFormState)

    // Enable text input in forms
    const handleChange = event => {
        const {name, value} = event.target
    
        setBook({...book, [name]: value})
    }

    return (
            <div>
            <h2>Add collection</h2>
            <form 
                onSubmit={event => {
                    event.preventDefault()
        
                    if (!book.author || !book.title || !book.description) {
                        alert("You need to fill all fields in the form")
                        return
                    }
                    props.addBook(book)
                    setBook(initialFormState)
                }}
            >
                <label>Author</label>
                <input
                    type="text"
                    name="author"
                    value={book.author}
                    onChange={handleChange} 
                />
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={book.title}
                    onChange={handleChange} 
                />
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={book.description}
                    onChange={handleChange} 
                />   
                <button type="submit">Save new</button> 
                <button className="disabled-button" disabled={true}>Save</button>
                <button className="disabled-button" disabled={true}>Delete</button>  
            </form>
            </div>
        )
}

export default AddBookForm;


