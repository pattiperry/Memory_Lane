//imports the main react library and two functions that are exports
import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
//context stores a certain kind of data to be used in the application 
//if you create a dataprovider then you need a createContext
export const CategoryContext = createContext()

// This component establishes what data can be used.
export const CategoryProvider = (props) => {
    //categories is the variable given-holds the state of the component
    //setCategories is the function to update/change the variable/categories
    //the useState function will hold and set the array of categories
    const [categories, setCategories] = useState([])

    //searchTerms is the variable declared
    //setSearchTerms is the function to update the variable searchTerms
    //the useState hook will hold and set the string of searchTerms
    const [searchTerms, setSearchTerms] = useState("")

    //fetches all the info on categories from the database
    const getCategories = () => {
        return fetch('https://walk-down-memory-lane-api.herokuapp.com/categories')
        .then(res => res.json())
        .then(setCategories)
    }

    //uses a fetch call to get into the database, then adds a new memory object to the database through the POST method
    const addCategory = categoryObject => {
        return fetch('https://walk-down-memory-lane-api.herokuapp.com/categories', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(categoryObject)
        })
        .then(response => response.json())
    }

    //get a specific memory by the parameter of an id
    //this is how we make the detailed view for the memory and user cards
    const getCategoryById = (id) => {
        return fetch(`https://walk-down-memory-lane-api.herokuapp.com/categories/${id}`)
            .then(res => res.json())
    }

    
    /*
        You return a context provider which has the
        `categories` state, `getCategories` function,
        and the `addCategory` function as keys. This
        allows any child elements to access them.
    */
    return (
        //what we are actually exporting
        <CategoryContext.Provider value={{
            //these are the things that other components can use
            categories, getCategories, addCategory, getCategoryById,  searchTerms, setSearchTerms
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}