//imports the main react library and two functions that are exports
import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
//context stores a certain kind of data to be used in the application 
//if you create a dataprovider then you need a createContext
export const MemoryContext = createContext()

// This component establishes what data can be used.
export const MemoryProvider = (props) => {
    //memories is the variable given-holds the state of the component
    //setMemories is the function to update/change the variable/memories
    //the useState function will hold and set the array of memories
    const [memories, setMemories] = useState([])

    //searchTerms is the variable declared
    //setSearchTerms is the function to update the variable searchTerms
    //the useState hook will hold and set the string of searchTerms
    const [searchTerms, setSearchTerms] = useState("")

    //fetches all the info on memories from the database
    const getMemories = () => {
        return fetch("http://localhost:8088/memories")
        .then(res => res.json())
        .then(setMemories)
    }

    //uses a fetch call to get into the database, then adds a new memory object to the database through the POST method
    const addMemory = memoryObject => {
        return fetch("http://localhost:8088/memories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(memoryObject)
        })
        .then(response => response.json())
    }

    //get a specific memory by the parameter of an id
    //this is how we make the detailed view for the memory and user cards
    const getMemoryById = (id) => {
        return fetch(`http://localhost:8088/memories/${id}?_expand=user`)
            .then(res => res.json())
    }

    //delete a memory from the database
    const deleteMemory = memoryId => {
        return fetch(`http://localhost:8088/memories/${memoryId}`, {
            method: "DELETE"
        })
            .then(getMemories)
    }

    //edit a memory from the database
    const editMemory = memory => {
        return fetch(`http://localhost:8088/memories/${memory.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(memory)
        })
          .then(getMemories)
    }

    
    /*
        You return a context provider which has the
        `memories` state, `getMemories` function,
        and the `addMemory` function as keys. This
        allows any child elements to access them.
    */
    return (
        //what we are actually exporting
        <MemoryContext.Provider value={{
            //these are the things that other components can use
            memories, getMemories, addMemory, getMemoryById, deleteMemory, editMemory, searchTerms, setSearchTerms
        }}>
            {props.children}
        </MemoryContext.Provider>
    )
}