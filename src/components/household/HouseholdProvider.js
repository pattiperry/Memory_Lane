//imports the main react library and two functions that are exports
import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
//context stores a certain kind of data to be used in the application 
//if you create a dataprovider then you need a createContext
export const HouseholdContext = createContext()

// This component establishes what data can be used.
export const HouseholdProvider = (props) => {
    //categories is the variable given-holds the state of the component
    //setHousehold is the function to update/change the variable/categories
    //the useState function will hold and set the array of categories
    const [households, setHousehold] = useState([])

    //searchTerms is the variable declared
    //setSearchTerms is the function to update the variable searchTerms
    //the useState hook will hold and set the string of searchTerms
    const [searchTerms, setSearchTerms] = useState("")

    //fetches all the info on households from the database
    const getHouseholds = () => {
        return fetch("http://localhost:8088/households")
        .then(res => res.json())
        .then(setHousehold)
    }

    //uses a fetch call to get into the database, then adds a new household object to the database through the POST method
    const addHousehold = householdObject => {
        return fetch("http://localhost:8088/households", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(householdObject)
        })
        .then(response => response.json())
        .then(getHouseholds)
    }

    //get a specific household by the parameter of an id
    //this is how we make the detailed view for the household and user cards
    const getHouseholdById = (id) => {
        return fetch(`http://localhost:8088/households/${id}`)
            .then(res => res.json())
    }

     //edit a household from the database
     const editHousehold = household => {
        return fetch(`http://localhost:8088/households/${household.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(household)
        })
          .then(getHouseholds)
    }
    
    /*
        You return a context provider which has the
        `households` state, `getHouseholds` function,
        and the `addHousehold` function as keys. This
        allows any child elements to access them.
    */
    return (
        //what we are actually exporting
        <HouseholdContext.Provider value={{
            //these are the things that other components can use
            households, getHouseholds, addHousehold, getHouseholdById, editHousehold, searchTerms, setSearchTerms
        }}>
            {props.children}
        </HouseholdContext.Provider>
    )
}