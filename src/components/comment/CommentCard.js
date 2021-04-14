import React from "react"
import "./Comment.css"

export const CommentCard = ({comment}) => (
    <section className="comment">
         <div className="comment__text">{comment.text}-{comment.user?.name}</div>
        
        {/* <footer className="blockquote-footer">
        <div className="comment_author">{comment.user?.name}</div>
        </footer> */}


    </section>
)