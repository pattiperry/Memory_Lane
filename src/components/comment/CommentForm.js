import React, { useContext, useEffect, useState } from "react"
import { MemoryContext } from "../memory/MemoryProvider"
import "./Comment.css"
import { useHistory, useParams } from 'react-router-dom';
import { CommentContext } from "./CommentProvider";

export const CommentForm = () => {
    const { getMemoryById} = useContext(MemoryContext)
    const {editComment, addComment, getCommentById} = useContext(CommentContext)
    //Define the initial state of the form inputs with useState()
    const [comment, setComment] = useState({})
    //wait for data before button is active
    
    const {memoryId} = useParams()
    const history = useHistory()
    const userId = localStorage.getItem("memorylane_user")
    //wait for data before button is active
    const[isLoading, setIsLoading] = useState(false)

    //Reach out to the world,get categories state and users state on initialization.
    //if memoryId is in the URL, getMemoryById
    // useEffect(() => {
    //     getMemoryById(memoryId)
    //     .then((setMemory))
            
    // })
    // , [])
  

//2RULES to remember with react:
//changing state changes the dom, we cant modify state directly
//we have to use the function useState-use the hook


    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
      /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
      // {}make it an object "..." is spread syntax , we have to use this bc we're copying an object(Use.slice with an array)
      const newComment = { ...comment }
      /* comment is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newComment[event.target.id] = event.target.value
      // update state
      setComment(newComment)
    }


    const handleClickSaveComment = (e) => {
      e.preventDefault()
          //disable the button - no extra clicks
          setIsLoading(true);
        //   if (memoryId){
        //     //PUT - update
            
        //     editComment({
        //         id: ,
        //         userId: userId,
        //         memoryId: parseInt(memory.categoryId),
        //         text: memory.text,
        //         timeStamp: Date.now()

        //     })
        //     .then(() => history.push(`/comments`))
        //   }else {
            //POST - adD
            addComment({
                userId: userId,
                memoryId: parseInt(memoryId),
                text: comment.text,
                timeStamp: Date.now()
            })
            .then(() => {
                console.log("stop")
                debugger
                history.push(`/memories/details/${memoryId}`)})
          //}
        
      }

      return (
        <>
          <main className="container-fluid">
            <div className="mt-2">
              <h2 className="commentForm__title">Comment</h2>
            </div>
            <section>
              <form className="commentForm p-2"  onSubmit={handleClickSaveComment}>
                <fieldset className="col-6">
                    <label htmlFor="title">Comment:</label>
                    <input 
                      type="text" 
                      id="text" 
                      onChange={handleControlledInputChange} 
                      required 
                      autoFocus 
                      className="form-control"  
                      defaultValue={comment.text}/>
                </fieldset>

                <fieldset>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isLoading}
                   >
                      {comment.id ? <>Save Comment</> : <>Add Comment</>}
                  </button>
                </fieldset>
              </form>
            </section>
          </main>
        </>
      )
  }
      