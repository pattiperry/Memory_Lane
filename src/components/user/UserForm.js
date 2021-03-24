import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import "./User.css"
import { useHistory, useParams } from 'react-router-dom';


export const UserForm = () => {
    const { addUser, getSpecificUserById,editUser} = useContext(UserContext)
    
   
    //Define the initial state of the form inputs with useState()
    const [user, setUser] = useState({})
    //wait for data before button is active
    const[isLoading, setIsLoading] = useState(false)
    //search the url for a householdId parameter 
    
    const {householdId} = useParams()
    const history = useHistory()

    
    //Reach out to the world,getUsers
    useEffect(() => {
      
      console.log(householdId)
      // get the logged in user's whole object from the database
     
      getSpecificUserById(householdId).then(setUser)
      
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
      const newUser = { ...user }
      /* user is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newUser[event.target.id] = event.target.value
      // update state
      setUser(newUser)
    }

    const handleClickSaveUser = (event) => {
      event.preventDefault()
      console.log("this should be the household id", householdId)
          //disable the button - no extra clicks, only allow me to submit the form once
        setIsLoading(true);
        if(user.id){
         
          //PUT-update
        editUser({
          id: user.id,
          name: user.name,
          dob: user.dob,
          email: user.email,
          phone: user.phone,
          candy: user.candy,
          dessert: user.dessert,
          food: user.food,
          drink: user.drink,
          place: user.place,
          season: user.season,
          scent: user.scent,
          movie: user.movie,
          music: user.music,
          hobby: user.hobby,
          color: user.color,
          householdId: +householdId
        })
        .then(()=>history.push(`/households/detail/${householdId}`))
        } else {
          //POST-add
          //creates a new user object in the database        
        addUser({
           
          name: user.name,
          dob: user.dob,
          email: user.email,
          phone: user.phone,
          candy: user.candy,
          dessert: user.dessert,
          food: user.food,
          drink: user.drink,
          place: user.place,
          season: user.season,
          scent: user.scent,
          movie: user.movie,
          music: user.music,
          hobby: user.hobby,
          color: user.color,
          householdId: +householdId

      })
      //after a new object is created this will take you back to the household detail page
      .then(() => history.push(`/households/detail/${householdId}`))
      }
    }
        
      

      return (
        <>
        <main className="container-fluid">
            <div className="mt-2">
              <h1 className="userForm__title">Create New Family Member Profile</h1>
            </div>
            <section>
              <form className="userForm p-2" onSubmit={handleClickSaveUser}>
                <h3>Please fill out all fields below.</h3>
                <fieldset className="col-6">
                    <label htmlFor="name">Name: </label>
                    <input 
                      type="text" 
                      id="name" 
                      onChange={handleControlledInputChange} 
                      required 
                      autoFocus 
                      className="form-control" 
                      placeholder="Name" 
                      defaultValue={user.name}/>
                </fieldset>

                <fieldset className="col-6">
                    <label htmlFor="dob">Birthday: </label>
                    <input 
                      type="date" 
                      id="dob" 
                      onChange={handleControlledInputChange} 
                      required 
                      autoFocus 
                      className="form-control" 
                      placeholder="Birthday" 
                      defaultValue={user.dob}/>
                </fieldset>

                <fieldset className="col-6">
                    <label htmlFor="dob">Email: </label>
                    <input 
                      type="text" 
                      id="email" 
                      onChange={handleControlledInputChange} 
                      required 
                      autoFocus 
                      className="form-control" 
                      placeholder="Email" 
                      defaultValue={user.email}/>
                </fieldset>

                <fieldset className="col-6">
                    <label htmlFor="dob">Phone Number: </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      onChange={handleControlledInputChange} 
                      required 
                      autoFocus 
                      className="form-control" 
                      placeholder="Phone Number" 
                      defaultValue={user.phone}/>
                </fieldset>
            
                <fieldset className="col-6">
                    <label htmlFor="dob">Favorite Candy: </label>
                    <input 
                      type="text" 
                      id="candy" 
                      onChange={handleControlledInputChange} 
                      required 
                      autoFocus 
                      className="form-control" 
                      placeholder="Favorite Candy" 
                      defaultValue={user.candy}/>
                </fieldset>

                <fieldset className="col-6">
                    <label htmlFor="dob">Favorite Dessert: </label>
                    <input 
                      type="text" 
                      id="dessert" 
                      onChange={handleControlledInputChange} 
                      required 
                      autoFocus 
                      className="form-control" 
                      placeholder="Favorite Dessert" 
                      defaultValue={user.dessert}/>
                </fieldset>

                <fieldset className="col-6">
                    <label htmlFor="dob">Favorite Food/Restaurant: </label>
                    <input 
                      type="text" 
                      id="food" 
                      onChange={handleControlledInputChange} 
                      required 
                      autoFocus 
                      className="form-control" 
                      placeholder="Favorite Food/Restaurant" 
                      defaultValue={user.food}/>
                </fieldset>

                <fieldset className="col-6">
                    <label htmlFor="dob">Favorite Drink: </label>
                    <input 
                      type="text" 
                      id="drink" 
                      onChange={handleControlledInputChange} 
                      required 
                      autoFocus 
                      className="form-control" 
                      placeholder="Favorite Drink" 
                      defaultValue={user.drink}/>
                </fieldset>

                <fieldset className="col-6">
                    <label htmlFor="dob">Favorite Place: </label>
                    <input 
                      type="text" 
                      id="place" 
                      onChange={handleControlledInputChange} 
                      required 
                      autoFocus 
                      className="form-control" 
                      placeholder="Favorite Place" 
                      defaultValue={user.place}/>
                </fieldset>

                <fieldset className="col-6">
                    <label htmlFor="dob">Favorite Season: </label>
                    <input 
                      type="text" 
                      id="season" 
                      onChange={handleControlledInputChange} 
                      required 
                      autoFocus 
                      className="form-control" 
                      placeholder="Favorite Season" 
                      defaultValue={user.season}/>
                </fieldset>

                <fieldset className="col-6">
                    <label htmlFor="dob">Favorite Scent: </label>
                    <input 
                      type="text" 
                      id="scent" 
                      onChange={handleControlledInputChange} 
                      required 
                      autoFocus 
                      className="form-control" 
                      placeholder="Favorite Scent" 
                      defaultValue={user.scent}/>
                </fieldset>

                <fieldset className="col-6">
                    <label htmlFor="dob">Favorite Color: </label>
                    <input 
                      type="text" 
                      id="color" 
                      onChange={handleControlledInputChange} 
                      required 
                      autoFocus 
                      className="form-control" 
                      placeholder="Favorite Color" 
                      defaultValue={user.color}/>
                </fieldset>

                <fieldset className="col-6">
                    <label htmlFor="dob">Favorite Movie/TV Show: </label>
                    <input 
                      type="text" 
                      id="movie" 
                      onChange={handleControlledInputChange} 
                      required 
                      autoFocus 
                      className="form-control" 
                      placeholder="Favorite Movie/TV Show" 
                      defaultValue={user.movie}/>
                </fieldset>

                <fieldset className="col-6">
                    <label htmlFor="dob">Favorite Music/Musician: </label>
                    <input 
                      type="text" 
                      id="music" 
                      onChange={handleControlledInputChange} 
                      required 
                      autoFocus 
                      className="form-control" 
                      placeholder="Favorite Music/Musician" 
                      defaultValue={user.music}/>
                </fieldset>

                <fieldset className="col-6">
                    <label htmlFor="dob">Favorite Hobby/Past Time: </label>
                    <input 
                      type="text" 
                      id="hobby" 
                      onChange={handleControlledInputChange} 
                      required 
                      autoFocus 
                      className="form-control" 
                      placeholder="Favorite Hobby/Past Time" 
                      defaultValue={user.hobby}/>
                </fieldset>

                <fieldset>
                  <button
                    className="btn btn-primary"
                    disabled={isLoading}
                    type="submit">
                     {user.id ? <>Save Profile</>: <>Add Family Member</>}
                  </button>
                </fieldset>
              </form>
            </section>
          </main>
        </>
      )
  }
