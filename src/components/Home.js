import React, {useContext, useEffect }from "react";
import { RecentlySubmitted } from "./RecenetlySubmitted";
import {UserContext} from "./user/UserProvider"
import Jumping from "../images/jumpingman.png"
import {Image} from "react-bootstrap"
import Falling from "../images/falling.png"
import Running from "../images/running.png"
import "./Home.css"
import FirstPlaceGif from "../gifs/firstplace.gif"
import ThirdPlaceGif from "../gifs/thirdplace.gif"
import SecondPlaceGif from "../gifs/secondplace.gif"

export const Home = ({memory}) => {
    const {users, getUsers} = useContext(UserContext)

    useEffect(() => {       
        getUsers()
        
    }, [])

    //creates a new array to map through the users and get their names and the number of memories they've submitted
    const newUserArray = users.map(u => {
        return (
            {"name": u.name, "memoriesLength": u.memories?.length}
        )
    })
    
    //sorts through the newUserArray and puts them in descending order from the users who submitted the most memories to the users who submitted the least
   const topUsers = newUserArray.sort((a,b)=> b.memoriesLength - a.memoriesLength).slice(0,3)
    
   //assigned variable names to the top three users who've submitted memories
    const firstPlace = topUsers[0]?.name
    const secondPlace = topUsers[1]?.name
    const thirdPlace = topUsers[2]?.name

    
    
    return(
        <>
            <h1 className="header page_title">Welcome to Memory Lane</h1>
            <section className="leader_section">
                {/* <h2 >Who Can Submit the Most??</h2> */}
                <div className="leaderboard_image ">
                    {/* <Image src={Jumping}  thumbnail /> */}
                    <h2 className="leader_place"  >First Place</h2>
                    <img src={FirstPlaceGif} width={400} height={250} alt="loading..."/>
                    
                    <h3 className="leader_place">{firstPlace}</h3>
                    <p className="submitted_total">{topUsers[0]?.memoriesLength} Memories Submitted </p>
                </div>
            
                <div className="leaderboard_image ">
                    {/* <Image src={Running} thumbnail /> */}
                    <h2 className="leader_place" >Second Place</h2>
                    <img src={SecondPlaceGif} width={400} height={250} alt="loading..." />
                    <h3 className="leader_place" >{secondPlace}</h3>
                    <p className="submitted_total" >{topUsers[1]?.memoriesLength} Memories Submitted</p>
                </div>
            
                <div className="leaderboard_image ">
                    {/* <Image src={Falling} thumbnail /> */}
                    <h2 className="leader_place" >Third Place</h2>
                    <img src={ThirdPlaceGif} width={400} height={250} alt="loading..." />
                    <h3 className="leader_place">{thirdPlace}</h3>
                    <p className="submitted_total" >{topUsers[2]?.memoriesLength} Memories Submitted</p>
                </div>
            
            </section>
            
    
            <div className="recently_submitted_memories">
          {<RecentlySubmitted key={memory} memory={memory} />}</div>
        </>
        )
        
    }