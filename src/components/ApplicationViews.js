import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import {UserCard} from "./user/UserCard"
import {MemoryCard} from "./memory/MemoryCard"

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>

            <Route path="/users">
                <UserCard />
            </Route>

            <Route path="/memories">
                <MemoryCard />
            </Route>

        </>
    )
}