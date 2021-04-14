//imports the main react library and two functions that are exports
import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
//context stores a certain kind of data to be used in the application 
//if you create a dataprovider then you need a createContext
export const CommentContext = createContext()

// This component establishes what data can be used.
export const CommentProvider = (props) => {
    //comments is the variable given-holds the state of the component
    //setComments is the function to update/change the variable/comments
    //the useState function will hold and set the array of comments
    const [comments, setComments] = useState([])

    //searchTerms is the variable declared
    //setSearchTerms is the function to update the variable searchTerms
    //the useState hook will hold and set the string of searchTerms
    const [searchTerms, setSearchTerms] = useState("")

    //fetches all the info on comments from the database
    const getComments = (memoryId) => {
        return fetch(`https://walk-down-memory-lane-api.herokuapp.com/comments?memoryId=${memoryId}&_expand=user`)
        .then(res => res.json())
        .then(setComments)
    }

    //uses a fetch call to get into the database, then adds a new comment object to the database through the POST method
    const addComment = commentObject => {
        return fetch(`https://walk-down-memory-lane-api.herokuapp.com/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentObject)
        })
       
        .then(()=>getComments(commentObject.memoryId))
    }

    //get a specific comment by the parameter of an id
    const getCommentById = (id) => {
        return fetch(`https://walk-down-memory-lane-api.herokuapp.com/comments/${id}?_expand=user&_expand=category`)
            .then(res => res.json())
    }

    //delete a comment from the database
    const deleteComment = commentId => {
        return fetch(`https://walk-down-memory-lane-api.herokuapp.com/comments/${commentId}`, {
            method: "DELETE"
        })
           
    }

    //edit a comment from the database
    const editComment = comment => {
        return fetch(`http://localhost:8088/comments/${comment.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(comment)
        })
          .then(getComments)
    }

    
    
    return (
        //what we are actually exporting
        <CommentContext.Provider value={{
            //these are the things that other components can use
            comments, getComments, addComment, getCommentById, deleteComment, editComment, searchTerms, setSearchTerms
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}