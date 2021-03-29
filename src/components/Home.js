import React from "react";
import { RecentlySubmitted } from "./RecenetlySubmitted";


export const Home = ({memory}) => {
    return(
    <>
        <h2>Memory Lane</h2>
        <div>Leader Board:</div>
        
        <p>Family Tree</p>
        {/* <div className="recently_submitted_memories">
      {<RecentlySubmitted key={memory} memory={memory} />}</div> */}
    </>
    )
    
}