import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../user/UserProvider"
import { MemoryContext } from "../memory/MemoryProvider"
import { CategoryContext } from "../category/CategoryProvider"
import "./Memory.css"
import { useHistory, useParams } from 'react-router-dom';

export const MemoryForm = () => {
    const { addMemory, getMemoryById, editMemory } = useContext(MemoryContext)
    const { users, getUsers } = useContext(UserContext)
    const { categories, getCategories } = useContext(CategoryContext)

    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
    */


    //Define the initial state of the form inputs with useState()
    const [memory, setMemory] = useState({})
    //wait for data before button is active
    const[isLoading, setIsLoading] = useState(true)
    const {memoryId} = useParams()
    const history = useHistory()

    
    //Reach out to the world,get categories state and users state on initialization.
    //if memoryId is in the URL, getMemoryById
    useEffect(() => {
        getCategories().then(getUsers).then(() => {
          if (memoryId){
            getMemoryById(memoryId)
            .then(memory => {
                setMemory(memory)
                setIsLoading(false)
            })
          } else {
            setIsLoading(false)
          }
        })
      }, [])
  

//2RULES to remember with react:
//changing state changes the dom, we cant modify state directly
//we have to use the function useState-use the hook


    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
      /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
      // {}make it an object "..." is spread syntax , we have to use this bc we're copying an object(Use.slice with an array)
      const newMemory = { ...memory }
      /* memory is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newMemory[event.target.id] = event.target.value
      // update state
      setMemory(newMemory)
    }


    const handleClickSaveMemory = () => {
        if (parseInt(memory.userId) === 0) {
            window.alert("Please select a user")
        } else {
          //disable the button - no extra clicks
          setIsLoading(true);
          if (memoryId){
            //PUT - update
            editMemory({
                id: memory.id,
                title: memory.title,
                userId: parseInt(memory.userId),
                customerId: parseInt(memory.categoryId),
                text: memory.text
            })
            .then(() => history.push(`/memories/detail/${memory.id}`))
          }else {
            //POST - add
            addMemory({
                title: memory.title,
                userId: parseInt(memory.userId),
                customerId: parseInt(memory.categoryId),
                text: memory.text

            })
            .then(() => history.push("/memories"))
          }
        }
      }

      return (
        <form className="memoryForm">
            <h2 className="memoryForm__title">New memory</h2>

            <fieldset>
                <label htmlFor="title">Title:</label>
                <input 
                  type="text" 
                  id="title" 
                  onChange={handleControlledInputChange} 
                  required 
                  autoFocus 
                  className="form-control" 
                  placeholder="Title" 
                  defaultValue={memory.title}/>
            </fieldset>

            <fieldset>
                <label htmlFor="text">Text:</label>
                <input 
                  type="text" 
                  id="text" 
                  onChange={handleControlledInputChange} 
                  required 
                  autoFocus 
                  className="form-control" 
                  placeholder="Text" 
                  defaultValue={memory.text}/>
            </fieldset>

            <fieldset>
                <label htmlFor="user">Written By:</label>
                <select 
                  value={memory.userId} 
                  name="userId" 
                  id="userId" 
                  onChange= {handleControlledInputChange} 
                  className="form-control" >
                <option value="0">Select a name</option>
                  {users.map(currentUser => (
                    <option key={currentUser.id} value={currentUser.id}>
                      {currentUser.name}
                    </option>
                  ))}
                </select>
            </fieldset>

            <fieldset>
                <label htmlFor="category">Category:</label>
                <select 
                  value={memory.categoryId} 
                  name="category" 
                  id="categoryId" 
                  onChange= {handleControlledInputChange} 
                  className="form-control" >
                <option value="0">Select a customer</option>
                  {categories.map(currentCategory => (
                    <option key={currentCategory.id} value={currentCategory.id}>
                      {currentCategory.name}
                    </option>
                  ))}
                </select>   
            </fieldset>

            <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleClickSaveMemory()
          }}>
        {memoryId ? <>Save memory</> : <>Add memory</>}</button>
        </form>
      )
  }
      