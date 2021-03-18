import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { MemoryContext } from "./MemoryProvider"
import { MemoryCard } from "./MemoryCard"
import "./Memory.css"

//memories will be displayed as hyperlinks,click on a memory title and a memory detail component will appear
export const MemoryList = ({}) => {
  const { getMemories, memories, searchTerms} = useContext(MemoryContext)
  const history = useHistory()

  //since we no longer are always displaying all the memories
  const [filteredMemories, setFiltered] = useState([])

  // empty dependency array, useEffect only runs after first render
  useEffect(()=>{
      getMemories()
  }, [])

  //useEffect dependency array with dependencies--will run if dependency changes state
  //searchTerms will cause a change
  useEffect(() => {
    if (searchTerms !== "") {
      //if the search field is not blank, display matching memories
      const subset = memories.filter(currentMemory => currentMemory.title.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      //if the search field is blank, display all memories
      setFiltered(memories)
    }
  }, [searchTerms, memories]

  )

  return (
      <>
          <h1>Memory Index</h1>

          <button onClick={() => history.push("/memories/create")}>
              ADD NEW MEMORY
          </button>
          <div className="memories">
            {/* {console.log("MemoryList: Render", memories)} */}
              {
                  filteredMemories.map(currentMemory => {
                    //invoking the function MemoryCard
                    //key and memory are properties of an object that get passed as an argument
                      return <MemoryCard key={currentMemory.id} memory={currentMemory} />
                  })
              }
          </div>
      </>
  )
}