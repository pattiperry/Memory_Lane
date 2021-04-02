import React, { useContext, useEffect, useState } from "react"
import { MemoryContext } from "./MemoryProvider"
import "./Memory.css"
import { useParams, useHistory } from "react-router-dom"
import {CommentContext} from "../comment/CommentProvider"
import {CommentForm} from "../comment/CommentForm"
import {CommentList} from "../comment/CommentList"
import {UserContext} from "../user/UserProvider"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

//build a function that displays the details of the memoryCard
export const MemoryDetail = () => {
  const { getMemoryById, deleteMemory } = useContext(MemoryContext)
  const {getComments} = useContext(CommentContext)
  const {getUserById} = useContext(UserContext)
	const [memory, setMemory] = useState({})
  const [comment, setComment] = useState({})
  
 

  let userId = localStorage.getItem("memorylane_user")
    //useParams allows the app to read a parameter from the URL
	const {memoryId} = useParams();
	const history = useHistory();

    //reach out into the world and get it
  useEffect(() => {
    console.log("useEffect", memoryId)
    getMemoryById(memoryId)
    
    .then((memoryObjectFromAPI) => {
      console.log(memoryObjectFromAPI)
      setMemory(memoryObjectFromAPI)
    })
    getComments().then(setComment)
    getUserById(userId)
    }, [])

    //defining a variable that will be referenced in the return as a  delete button
  const handleDelete = () => {
    if( window.confirm("Are you sure you want to delete this household?")){
    deleteMemory(memory.id)
    .then(()=> {
      history.push("/memories")
    })
  }
  }

  
  return (
    <Card style={{ width: '45rem' }} >
    <section className="memory">
      {/* when you click edit, it fetches the form that is filled out with the memoryId that matches */}
      {/* this ternary operator is only making the edit button show for the user who submitted the memory */}
      {+userId === memory.userId ?
      <Button variant="dark" onClick={() => {
        history.push(`/memories/edit/${memory.id}`)
      }}>EDIT MEMORY</Button>
      :<> </>}
      
      {/* this ternary operator is only making the edit Button show for the user who submitted the memory */}
      {+userId === memory.userId ?
      <Button variant="dark" onClick={handleDelete}>DELETE MEMORY</Button>
      :<> </>}

      <Card.Body>
      <Card.Title>
      <h3 className="memory__name">{memory.title}</h3>
      </Card.Title>

      <Card.Text>  
      {/* the ? below is called optional chaining, you have to do this when using nested properties to not break the code of an empty object*/}
      <div className="memory__category">Category: {memory.category?.name}</div>
      </Card.Text>
      
      <Card.Text>
      <div className="memory__text"> {memory.text}</div>
      </Card.Text>

      <footer className="blockquote-footer">
      <div className="memory__author"> {memory.user?.name}</div>
      </footer>

      {/* shows a comment form on each memory detail card */}
      <div className="memory_comment_form">
      {<CommentForm key={comment} comment={comment} />}
      </div>

      {/* shows the comments that go with each individual memory and print them on the memory detail card */}
      
      <div className="memory_comments">
      {<CommentList key={comment} comment={comment} memoryId={memoryId}/>}</div>
      
      

      
      </Card.Body>
    </section>
    </Card>
  )
}