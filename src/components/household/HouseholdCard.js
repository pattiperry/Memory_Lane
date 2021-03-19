import React from "react"
import "./Household.css"

export const HouseholdCard = ({household}) => (
    <>
    <section className="household">
        <h3 className="household__name">{household.name}</h3>
        <div className="household__address">{household.address}</div>
    </section>
    </>
)