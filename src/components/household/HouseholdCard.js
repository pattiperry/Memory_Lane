import React from "react"
import {Link} from "react-router-dom"
import "./Household.css"

export const HouseholdCard = ({household}) => (
    <>
    <section className="household">
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