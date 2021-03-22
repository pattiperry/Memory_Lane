import React, { useContext, useEffect, useState } from "react"
import {HouseholdContext} from "./HouseholdProvider"
import "./Household.css"
import { useParams, useHistory } from "react-router-dom"
import { UserCard } from "../user/UserCard"



export const HouseholdDetail = () => {
    const { getHouseholdById } = useContext(HouseholdContext)
   
	const [household, setHousehold] = useState({})
    
    //useParams allows the app to read a parameter from the URL
	const {householdId} = useParams()
	const history = useHistory();

    //reach out into the world and get it
  useEffect(() => {
    console.log(householdId)
    getHouseholdById(householdId)
    .then((householdObjectFromAPI) => {
      setHousehold(householdObjectFromAPI)
    })
    }, [])

 

    
  return (
    <>
    <section className="household">
      <h3 className="household__name">{household.name}</h3>
      
      <button onClick={() => {
        history.push(`/households/edit/${household.id}`)
      }}>Edit</button>

       <button onClick={() => {
       history.push(`/users/create`)
      }}>Add Family Member</button>

      {/* the ? below is called optional chaining, you have to do this when using nested properties to not break the code of an empty object*/}
      <div className="current_users">Family Members: {household.users?.map(currentuser=> {
        return < UserCard key={currentuser.id} user={currentuser}/>
      })}</div>
      
      
    </section>
    </>
  )
}