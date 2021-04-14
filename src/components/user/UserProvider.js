//imports the main react library and two functions that are exports
import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
//context stores a certain kind of data to be used in the application 
//if you create a dataprovider then you need a createContext
export const UserContext = createContext()

// This component establishes what data can be used.
export const UserProvider = (props) => {
    //users is the variable given-holds the state of the component
    //setUser is the function to update/change the variable/users
    //the useState function will hold and set the array of memories
    const [users, setUser] = useState([])

    //searchTerms is the variable declared
    //setSearchTerms is the function to update the variable searchTerms
    //the useState hook will hold and set the string of searchTerms
    const [searchTerms, setSearchTerms] = useState("")

    //fetches all the info on users from the database
    const getUsers = () => {
        return fetch('https://walk-down-memory-lane-api.herokuapp.com/users?_embed=memories')
        .then(res => res.json())
        .then(setUser)
    }

    //uses a fetch call to get into the database, then adds a new user object to the database through the POST method
    const addUser = userObject => {
        return fetch('https://walk-down-memory-lane-api.herokuapp.com/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObject)
        })
        .then(response => response.json())
    }

    //get a specific user by the parameter of an id
    const getSpecificUserById = (id) => {
        return fetch(`https://walk-down-memory-lane-api.herokuapp.com/users/${id}?_expand=household`)
            .then(res => res.json())
    }

    //get the logged in user by id
    //this is how we make the detailed view for the user and user cards
    const getUserById = () => {
        let userId = localStorage.getItem("memorylane_user")
        return fetch(`https://walk-down-memory-lane-api.herokuapp.com/users/${userId}?_expand=household`)
            .then(res => res.json())
    }

    //edit a user from the database
    const editUser = user => {
        return fetch(`https://walk-down-memory-lane-api.herokuapp.com/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        })
          .then(getUsers)
    }

    
    /*
        You return a context provider which has the
        `users` state, `getUsers` function,
        and the `addUser` function as keys. This
        allows any child elements to access them.
    */
    return (
        //what we are actually exporting
        <UserContext.Provider value={{
            //these are the things that other components can use
            users, getUsers, addUser, getUserById, editUser, searchTerms, setSearchTerms, getSpecificUserById
        }}>
            {props.children}
        </UserContext.Provider>
    )
}