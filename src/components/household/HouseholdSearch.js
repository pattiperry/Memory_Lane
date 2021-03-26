import React, { useContext } from "react"
import { HouseholdContext } from "./HouseholdProvider"
import "./Household.css"

export const HouseholdSearch = () => {
  const { setSearchTerms } = useContext(HouseholdContext)

  return (
    <>
      Household search:
      <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search by household name... " />
    </>
  )
}