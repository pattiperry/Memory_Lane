import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import "./User.css"
import { useHistory, useParams } from 'react-router-dom';

export const UserForm = () => {
    const { addUser, getUserById, editUser, getUsers } = useContext(UserContext)
       
    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
    */


    //Define the initial state of the form inputs with useState()
    const [user, setUser] = useState({})
    //wait for data before button is active
    const[isLoading, setIsLoading] = useState(true)
    //search the url for a userId parameter 
    const {userId} = useParams()
    const history = useHistory()

    
    //Reach out to the world,getUsers state on initialization.
    //if userId is in the URL, getUserById
    useEffect(() => {
        getUsers().then(() => {
          if (userId){
            getUserById(userId)
            .then(user => {
                setUser(user)
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
          //disable the button - no extra clicks, only allow me to submit the form once
        setIsLoading(true);
        console.log("hello")
        //creates a new user object in the database        
        addUser({
            id: +localStorage.getItem("memorylane_user"),
            name: user.name,
            email: user.email,
            phone: user.phone,
            dob: user.dob,
            candy: user.candy,
            dessert: user.dessert,
            food: user.food,
            drink: user.drink,
            place: user.place,
            color: user.color,
            season: user.season,
            movie: user.movie,
            music: user.music,
            scent: user.scent,
            hobby: user.hobby,
            householdId: user.householdId

        })
        //after a new object is created this will take you back to the updated list of all users
        .then(() => history.push("/users"))
    }
        
      

      return (
        <>
        <main className="container-fluid">
            <div className="mt-2">
              <h2 className="userForm__title">New Profile</h2>
            </div>
            <section>
            <form className="form--login" onSubmit={handleClickSaveUser}>
                <h1 className="h3 mb-3 font-weight-normal">Create a Family Member Profile</h1>
                <fieldset>
                    <label htmlFor="name"> Name </label>
                    <input 
                    onChange={handleControlledInputChange}
                    value={user.name} 
                    type="text" 
                    id="name" 
                    className="form-control" 
                    placeholder="Name" 
                    required 
                    autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="dob"> Date of Birth </label>
                    <input 
                    onChange={handleControlledInputChange}
                    value={user.dob} 
                    type="date" 
                    id="dob" 
                    className="form-control" 
                    placeholder="Date of Birth" 
                    required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email </label>
                    <input 
                    onChange={handleControlledInputChange}
                    value={user.email} 
                    type="email" 
                    id="email" 
                    className="form-control" 
                    placeholder="Email" 
                     />
                </fieldset>
                <fieldset>
                    <label htmlFor="phone"> Phone Number </label>
                    <input 
                    onChange={handleControlledInputChange}
                    value={user.phone} 
                    type="tel" 
                    id="phone" 
                    className="form-control" 
                    placeholder="Phone Number" 
                     />
                </fieldset>
                <fieldset>
                    <label htmlFor="candy"> Favorite Candy </label>
                    <input 
                    onChange={handleControlledInputChange}
                    value={user.candy} 
                    type="text" 
                    id="candy" 
                    className="form-control" 
                    placeholder="Favorite Candy" 
                     />
                </fieldset>
                <fieldset>
                    <label htmlFor="dessert"> Favorite Dessert </label>
                    <input 
                    onChange={handleControlledInputChange}
                    value={user.dessert} 
                    type="text" 
                    id="dessert" 
                    className="form-control" 
                    placeholder="Favorite Dessert" 
                     />
                </fieldset>
                <fieldset>
                    <label htmlFor="food"> Favorite Food/Restaurant </label>
                    <input 
                    onChange={handleControlledInputChange}
                    value={user.food} 
                    type="text" 
                    id="food" 
                    className="form-control"
                     placeholder="Favorite Food/Restaurant" 
                      />
                </fieldset>
                <fieldset>
                    <label htmlFor="drink"> Favorite Drink </label>
                    <input 
                    onChange={handleControlledInputChange}
                    value={user.drink} 
                    type="text" 
                    id="drink" 
                    className="form-control" 
                    placeholder="Favorite Drink" 
                     />
                </fieldset>
                <fieldset>
                    <label htmlFor="hobby"> Favorite Hobby/Past-time </label>
                    <input 
                    onChange={handleControlledInputChange}
                    value={user.hobby} 
                    type="text" 
                    id="hobby" 
                    className="form-control" 
                    placeholder="Favorite Hobby/Past-time" 
                     />
                </fieldset>
                <fieldset>
                    <label htmlFor="place"> Favorite Place To Go </label>
                    <input 
                    onChange={handleControlledInputChange}
                    value={user.place} 
                    type="text" 
                    id="place" 
                    className="form-control" 
                    placeholder="Favorite Place To Go" 
                     />
                </fieldset>
                <fieldset>
                    <label htmlFor="season"> Favorite Season of the Year </label>
                    <input 
                    onChange={handleControlledInputChange}
                    value={user.season} 
                    type="text" 
                    id="season" 
                    className="form-control" 
                    placeholder="Favorite Season of the Year" 
                     />
                </fieldset>
                <fieldset>
                    <label htmlFor="movie"> Favorite Show/Movie </label>
                    <input 
                    onChange={handleControlledInputChange}
                    value={user.movie} 
                    type="text" 
                    id="movie" 
                    className="form-control" 
                    placeholder="Favorite Show/Movie" 
                     />
                </fieldset>
                <fieldset>
                    <label htmlFor="music"> Favorite Music/Musician </label>
                    <input 
                    onChange={handleControlledInputChange}
                    value={user.music} 
                    type="text" 
                    id="music" 
                    className="form-control" 
                    placeholder="Favorite Music/Musician" 
                     />
                </fieldset>
                <fieldset>
                    <label htmlFor="scent"> Favorite Scent </label>
                    <input 
                    onChange={handleControlledInputChange}
                    value={user.scent} 
                    type="text" 
                    id="scent" 
                    className="form-control" 
                    placeholder="Favorite Scent" 
                     />
                </fieldset>
                <fieldset>
                    <label htmlFor="color"> Favorite Color </label>
                    <input 
                    onChange={handleControlledInputChange}
                    value={user.color} 
                    type="text" 
                    id="color" 
                    className="form-control" 
                    placeholder="Favorite Color" 
                     />
                </fieldset>
                


                <fieldset>
                    <button 
                    className="btn btn-primary"
                    disabled={isLoading}
                    type="submit">{userId} Add Family Member 
                    </button>
                </fieldset>
            </form>
            </section>
          </main>
        </>
      )
  }