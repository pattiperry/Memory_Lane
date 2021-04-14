import React, { useContext, useEffect, useState } from "react"
import {useHistory} from "react-router-dom"
import { HouseholdContext } from "./HouseholdProvider"
import { HouseholdCard } from "./HouseholdCard"
import "./Household.css"
import Button from 'react-bootstrap/Button'

export const HouseholdList = () => {
  // This state changes when `getHouseholds()` is invoked below
  const { households, getHouseholds, searchTerms } = useContext(HouseholdContext)
  const [filteredHouseholds, setFiltered] = useState([])
  const history = useHistory()

  //useEffect - reach out to the world for something
  //gets the API call for the households
  useEffect(() => {
    // console.log("HouseholdList: useEffect - getHouseholds")
    getHouseholds()

  }, [])
  //the empty brackets are a dependency array;

  // useEffect dependency array with dependencies - will run if dependency changes (state)
  // searchTerms will cause a change
  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching households
      const subset = households.filter(currentHousehold => currentHousehold.name.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      // If the search field is blank, display all households
      setFiltered(households)
    }
  }, [searchTerms, households])

  return (
    <>
    <h1 className="page_title">Households</h1>
        <Button variant="dark" onClick={() => history.push("/households/create")}>
            ADD NEW HOUSEHOLD
        </Button>
    <div className="households">
      {/* {console.log("HouseholdList: Render", households)} */}
      {
        filteredHouseholds.map(currentHousehold => {
            //invoking the function HouseholdCard
            //key and hosuehold are properties of an object that gets passed as an argument 
          return <HouseholdCard key={currentHousehold.id} household={currentHousehold} />
        })
      }
    </div>
    </>
  )
}