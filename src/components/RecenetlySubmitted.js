import React, { useContext, useEffect, useState } from "react"
import { MemoryContext } from "./memory/MemoryProvider"
import { MemoryCard } from "./memory/MemoryCard"



export const RecentlySubmitted = ({}) => {
  // This state changes when `getMemories()` is invoked below
  const { memories, getMemories } = useContext(MemoryContext)
//   const [currentComment, setCurrentComment] = useState({})

  //useEffect - reach out to the world for something
  //gets the API call for the comments
  useEffect(() => {
    getMemories() 

  }, [])

  
  return (
    <>
    <h1>Recently Submitted Memories</h1>

    <div className="memories">
      {
        memories.map(memory => {
            //invoking the function MemoryCard
            //key and memory are properties of an object that gets passed as an argument 
          return <MemoryCard key={memory} memory={memory} />
        })
    }
    </div>
    </>
  )
}