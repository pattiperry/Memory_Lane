import React from "react"
import "./Comment.css"

export const CommentCard = ({comment}) => (
    <section className="comment">
        <div className="comment_author">Written by: {comment.user?.name}</div>
        <div className="comment__text">{comment.text}</div>
    </section>
)