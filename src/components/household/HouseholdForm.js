import React, { useContext, useEffect, useState } from "react"
import { HouseholdContext } from "../household/HouseholdProvider"
import "./Household.css"
import { useHistory, useParams } from 'react-router-dom';

export const HouseholdForm = () => {
    const { addHousehold, getHouseholdById, editHousehold, getHouseholds } = useContext(HouseholdContext)
       
    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
    */


    //Define the initial state of the form inputs with useState()
    const [household, setHousehold] = useState({})
    //wait for data before button is active
    const[isLoading, setIsLoading] = useState(true)
    const {householdId} = useParams()
    const history = useHistory()

    
    //Reach out to the world,get households state on initialization.
    //if householdId is in the URL, getHouseholdById
    useEffect(() => {
        getHouseholds().then(() => {
          if (householdId){
            getHouseholdById(householdId)
            .then(household => {
                setHousehold(household)
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
      const newHousehold = { ...household }
      /* household is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newHousehold[event.target.id] = event.target.value
      // update state
      setHousehold(newHousehold)
    }


    const handleClickSaveHousehold = (event) => {
      event.preventDefault()
          //disable the button - no extra clicks
          setIsLoading(true);
          if (householdId){
            //PUT - update
            
            editHousehold({
                id: household.id,
                name: household.name,
                address: household.address
            })
            .then(() => history.push(`/households`))
          }else {
            //POST - add
          
            addHousehold({
                name: household.name,
                address: household.address

            })
            //after a new household object is created this will take you back to the updated list of all households
            .then(() => history.push("/households"))
          }
        
      }

      return (
        <>
        <main className="container-fluid">
            <div className="mt-2">
              <h2 className="householdForm__title">New Household</h2>
            </div>
            <section>
              <form className="householdForm p-2" onSubmit={handleClickSaveHousehold}>
                <fieldset className="col-6">
                    <label htmlFor="name">Name:</label>
                    <input 
                      type="text" 
                      id="name" 
                      onChange={handleControlledInputChange} 
                      required 
                      autoFocus 
                      className="form-control" 
                      placeholder="Name" 
                      defaultValue={household.name}/>
                </fieldset>

                <fieldset className="col-6">
                    <label htmlFor="text">Address:</label>
                    <input 
                      type="text" 
                      id="address" 
                      onChange={handleControlledInputChange} 
                      required 
                      autoFocus 
                      className="form-control textarea rows={5}" 
                      placeholder="Text" 
                      defaultValue={household.address}/>
                </fieldset>

                <fieldset>
                  <button
                    className="btn btn-primary"
                    disabled={isLoading}
                    type="submit">
                      {householdId ? <>Save Household</> : <>Add Household</>}
                  </button>
                </fieldset>
              </form>
            </section>
          </main>
        </>
      )
  }