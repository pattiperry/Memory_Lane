import React, { useContext } from "react"
import { MemoryContext } from "./MemoryProvider"
import "./Memory.css"


export const MemorySearch = () => {
  const { setSearchTerms } = useContext(MemoryContext)

  return (
    <>
     
      <input type="text"
        className="input--wide search rounded "
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search for a memory " />
    </>
  )
}