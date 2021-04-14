import React, { useContext, useEffect, useState } from "react"
import {HouseholdContext} from "./HouseholdProvider"
import "./Household.css"
import { useParams, useHistory } from "react-router-dom"
import { UserCard } from "../user/UserCard"
import { UserContext } from "../user/UserProvider"
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

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
      <Card style={{ width: '80rem' }} className="household_detail">
      <section className="household_on_detail_page">
        <Card.Title>
        <h3 className="household__name">{household.name}</h3>
        </Card.Title>

      {/* this ternary operator only allows the edit button for the household card to be visible to the users that belong in that household(the householdId on the user object matches the householdId)  */}
        {user.householdId === +householdId ?
          <Button variant="dark" onClick={() => {
            history.push(`/households/edit/${household.id}`)
          }}>Edit</Button >
          : <> </> }

        <Button variant="dark" onClick={() => {
                history.push(`/users/create/${household.id}`)
              }}>Add Family Member</Button >

        <Button variant="dark" onClick={handleDelete }>DELETE HOUSEHOLD</Button >
        
        {/* the ? below is called optional chaining, you have to do this when using nested properties to not break the code of an empty object*/}
        <div className="current_users">{household.users?.map(currentuser=> {
          return < UserCard 
          key={currentuser.id} 
          user={currentuser} 
          />
        })}</div>
        
        
      </section>
      </Card>
      </>
   
  )
}
