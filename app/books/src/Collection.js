import React from 'react'

const Collection = props => {

    return (
    <table>
        <thead >
            <tr className="thead">
                <th>Author</th>
                <th>Title</th>
            </tr>
        </thead>
        <tbody>
            {props.books.length > 0 ? (
                props.books.map( (book, index) => (
                    <tr  
                        key={index} 
                        onClick={() => {
                            props.editBook(book, index) ; 
                            props.setEditing(!props.editing) ;
                        }}
                    >
                        <td>{book.author}</td>
                        <td>{book.title}</td>
                    </tr>
                ) )
            ) : (
                    <tr>
                        <td colSpan={3}>No books yet</td>
                    </tr>
                )
            }
        </tbody> 
    </table>
    )
}

export default Collection 