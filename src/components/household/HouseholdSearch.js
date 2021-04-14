import React, { useContext } from "react"
import { HouseholdContext } from "./HouseholdProvider"
import "./Household.css"

export const HouseholdSearch = () => {
  const { setSearchTerms } = useContext(HouseholdContext)

  return (
    <>
      
      <input type="text"
        className="input--wide search rounded"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search by household name... " />
    </>
  )
}