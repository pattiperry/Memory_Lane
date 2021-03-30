import React, { useContext, useEffect, useState } from "react"
import { MemoryContext } from "./memory/MemoryProvider"
import { MemoryCard } from "./memory/MemoryCard"



export const RecentlySubmitted = ({}) => {
  // This state changes when `getMemories()` is invoked below
  const { memories, getMemories } = useContext(MemoryContext)
    const [sortedMemories, setSortedMemories] = useState([])

  //useEffect - reach out to the world for something
  //gets the API call for the comments
  useEffect(() => {
      getMemories()   

  }, [])


  useEffect(() => {
    //sorts the memories by the most recent date they were submitted or edited
    let sortMemories = memories.sort((a, b) => new Date (b.timeStamp) - new Date (a.timeStamp))

    //only allows 5 of the submitted memories to show
    setSortedMemories(sortMemories.slice(0,5))
  }, [memories])

  
  return (
    <>
    <h1>Recently Submitted Memories</h1>

    <div className="sorted_memories">
      {
        sortedMemories.map(memory => {
            //invoking the function MemoryCard
            //key and memory are properties of an object that gets passed as an argument 
          return <MemoryCard key={memory} memory={memory} />
        })
    }
    </div>
    </>
  )
}