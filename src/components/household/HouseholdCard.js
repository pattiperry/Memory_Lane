import React, {useContext} from "react"
import {Link} from "react-router-dom"
import "./Household.css"
import {HouseholdContext} from "./HouseholdProvider"
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

export const HouseholdCard = ({household}) => {
    const {joinHousehold} = useContext(HouseholdContext)
    
    let userId = localStorage.getItem("memorylane_user")
   
    const handleJoinHousehold = (userId,householdId) => {
        joinHousehold(userId,householdId)
    }

    return (
        <>
        <Card className="text-center" style={{ width: '15rem' }} >
        <section className="household">
        <Card.Body>

            

            <Card.Title>
            <h3 className="household__name">
                <Link style={{ color: '#1f7e4f' }} to={`/households/detail/${household.id}`}>
                    {household.name}
                </Link>
            </h3>
            </Card.Title>

            <Card.Text>
            <div className="household__address">{household.address}</div>
            </Card.Text>

            <Card.Text>
            <p>{household.users.length} People Live Here</p>
            </Card.Text>
            
            <Button variant="dark" size="sm"   onClick={() => handleJoinHousehold(userId, household.id)}>
                JOIN HOUSEHOLD
            </Button>

            </Card.Body>
        </section>
        </Card>
        </>
    )
    
}