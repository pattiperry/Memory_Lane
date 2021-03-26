import React, {useContext} from "react"
import {Link} from "react-router-dom"
import "./Household.css"
import {HouseholdContext} from "./HouseholdProvider"

export const HouseholdCard = ({household}) => {
    const {joinHousehold} = useContext(HouseholdContext)
    
    let userId = localStorage.getItem("memorylane_user")
   
    const handleJoinHousehold = (userId,householdId) => {
        joinHousehold(userId,householdId)
    }

    return (
        <>
        <section className="household">
            <button onClick={() => handleJoinHousehold(userId, household.id)}>
                JOIN HOUSEHOLD
            </button>
            <h3 className="household__name">
                <Link to={`/households/detail/${household.id}`}>
                    {household.name}
                </Link>
            </h3>
            <div className="household__address">{household.address}</div>
            <p>People in household: {household.users.length}</p>
        </section>
        </>
    )
    
}