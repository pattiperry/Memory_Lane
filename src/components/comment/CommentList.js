import React, { useContext, useEffect, useState } from "react"
import { CommentContext } from "./CommentProvider"
import { CommentCard } from "./CommentCard"
import "./Comment.css"


export const CommentList = ({memoryId}) => {
  // This state changes when `getComments()` is invoked below
  const { comments, getComments } = useContext(CommentContext)
//   const [currentComment, setCurrentComment] = useState({})

  //useEffect - reach out to the world for something
  //gets the API call for the comments
  useEffect(() => {
     console.log(memoryId)
    getComments(memoryId)
    console.log(comments)
    // .then(setCurrentComment)
   

  }, [])
  //the empty brackets are a dependency array;

  
  return (
    <>
    <h3>Comments</h3>

    <div className="comments">
      {/* {console.log("CommentList: Render", comments)} */}
      
      {
        comments.map(comment => {
            //invoking the function CommentCard
            //key and comment are properties of an object that gets passed as an argument 
          return <CommentCard key={comment.id} comment={comment} />
        })
    }
    </div>
    </>
  )
}