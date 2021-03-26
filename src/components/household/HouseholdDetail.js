import React, { useContext, useEffect, useState } from "react"
import {HouseholdContext} from "./HouseholdProvider"
import "./Household.css"
import { useParams, useHistory } from "react-router-dom"
import { UserCard } from "../user/UserCard"
import { UserContext } from "../user/UserProvider"


export const HouseholdDetail = () => {
  const {getHouseholdById, deleteHousehold} = useContext(HouseholdContext)
  const {getUserById} = useContext(UserContext) 
	const [household, setHousehold] = useState({})
  const [user, setUser] = useState({})

  //useParams allows the app to read a parameter from the URL
	const {householdId} = useParams()

  const history = useHistory();

  //reach out into the world and get it
  useEffect(() => {
    let userId = localStorage.getItem("memorylane_user")
    console.log(userId)
   
    getUserById(userId).then(setUser)

    .then(()=>
      getHouseholdById(householdId))
      .then((householdObjectFromAPI) => 
        setHousehold(householdObjectFromAPI)
      )}, [])

  //defining a variable that will be referenced in the return as a  delete button
  const handleDelete = () => {
        
   if( window.confirm("Are you sure you want to delete this household?")){
   
    deleteHousehold(householdId)
    .then(()=> {
      history.push("/households")
    })
     
  }
  }
   
  return (
    <>
 
      <section className="household">
        <h3 className="household__name">{household.name}</h3>
      
      {/* this ternary operator only allows the edit button for the household card to be visible to the users that belong in that household(the householdId on the user object matches the householdId)  */}
        {user.householdId === +householdId ?
          <button onClick={() => {
            history.push(`/households/edit/${household.id}`)
          }}>Edit</button>
          : <> </> }

        <button onClick={() => {
                history.push(`/users/create/${household.id}`)
              }}>Add Family Member</button>

        <button onClick={handleDelete }>DELETE HOUSEHOLD</button>
        
        {/* the ? below is called optional chaining, you have to do this when using nested properties to not break the code of an empty object*/}
        <div className="current_users">Family Members: {household.users?.map(currentuser=> {
          return < UserCard 
          key={currentuser.id} 
          user={currentuser} 
          />
        })}</div>
        
        
      </section>
      </>
   
  )
}
