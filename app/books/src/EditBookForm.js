import React, { useState, useEffect } from 'react'

const EditBookForm = props => {

    // Set state
    const [book, setBook] = useState(props.currentBook)

    // Updates book state with information of clicked book from collection
    useEffect(() => {
        setBook(props.currentBook)
    }, [props.currentBook]
    )

    // Enable text input in forms
    const handleChange = event => {
        const {name, value} = event.target
    
        setBook({...book, [name]: value})
    }

    return (
        <div>
            <h2>Edit collection</h2>
            <form 
                onSubmit={event => {
                    event.preventDefault()
                    props.updateBook(book)
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
                <button className="disabled-button" disabled={true}>Save new</button>
                <button type="submit">Save</button>  
{/*}                <button type="button" onClick={() => props.setEditing(false)} className="button muted-button">Cancel</button>           */}
                <button type="button" onClick={ () => props.deleteBook(book._id)} >Delete</button>
            </form>
            </div>
    )
}

export default EditBookForm;