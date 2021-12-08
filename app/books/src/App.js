import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddBookForm from './AddBookForm'
import EditBookForm from './EditBookForm'
import Collection from './Collection'

const App = () => {

    // Initialize empty form
    const initialFormState = { id: '', author: '', title: '', description: '' }

    // Set state
    const [ books, setBooks ] = useState( {booksData: []})
    const [ currentBook, setCurrentBook ] = useState(initialFormState)
    const [ editing, setEditing ] = useState(false)


    // CRUD
    // Create a record
    const addBook = book => {
        axios.post('/collection/postBook', book)
    }

    // Read records
    const readBooks = async () => {
        const result = await axios.get('/collection')
        setBooks(result.data)
    }
    
    // Render books collection once, [] used to simulate class components componentdidmount()
     useEffect(() => {
        readBooks()
    }, []) 

    // Update a record
    const updateBook = (book) => {
        axios.put('/collection/updateBook/' + book._id, {author : book.author, title: book.title, description: book.description})
        setEditing(false)
    }

    // Delete a record
    const deleteBook = _id => {
        console.log(_id)
        axios.delete('/collection/delete/' + _id)
        setEditing(false)
    }

    // Set editing state that is used to toggle between add or edit forms
    const editBook = book => {
      //  setEditing(true)

        setCurrentBook({ _id:book._id, author: book.author, title: book.title, description: book.description })
    }

    return (
        <div className="container">
            <h1>Book Collection App</h1>
            <div className="flex-row">
                <div className="flex-large">
                    {editing ? (
                        <EditBookForm 
                            editing={editing}
                            setEditing={setEditing}
                            currentBook={currentBook}
                            updateBook={updateBook}
                            deleteBook={deleteBook}
                        />
                    ) : (
                        <AddBookForm addBook={addBook}/>
                    )}                       
                </div>
                <div className="flex-large">
                    <h2>Book collection</h2>
                    <Collection books={books} editBook={editBook} setEditing={setEditing} editing={editing}  />
                </div>
            </div>
        </div>
    )
}

export default App