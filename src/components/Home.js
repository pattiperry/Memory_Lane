import React, {useContext }from "react";
import { RecentlySubmitted } from "./RecenetlySubmitted";
import {UserContext} from "./user/UserProvider"

export const Home = ({memory}) => {
    const {users} = useContext(UserContext)

    const newUserArray = users.map(u => {
        return (
            {"name": u.name, "memoriesLength": u.memories?.length}
        )
    })
    
    const topUsers = newUserArray.sort((a,b)=> b.memoriesLength - a.memoriesLength).slice(0,5)
    
    return(
    <>
        <h1>Welcome to Memory Lane</h1>
        <div>Leader Board:{topUsers}</div>
        
        
        <div className="recently_submitted_memories">
      {<RecentlySubmitted key={memory} memory={memory} />}</div>
    </>
    )
    
}