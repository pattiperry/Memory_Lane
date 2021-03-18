import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import {MemoryProvider} from "./memory/MemoryProvider"
import {MemoryList} from "./memory/MemoryList"
import {MemoryDetail} from "./memory/MemoryDetail"
import {MemoryForm} from "./memory/MemoryForm"
import {MemorySearch} from "./memory/MemorySearch"
import {CategoryProvider} from "./category/CategoryProvider"
import {UserProvider} from "./user/UserProvider"

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>

            <MemoryProvider>
                <Route exact path="/memories">
                    <MemorySearch />
                    <MemoryList />
                </Route>
                <Route path= "/memories/detail/:memoryId(\d+)">
                    <MemoryDetail />
                </Route>

                <CategoryProvider>
                    <UserProvider>
                        <Route path="/memories/edit/:memoryId(\d+)">
                            <MemoryForm />
                        </Route> 
                        <Route path="/memories/create">
                            <MemoryForm />
                        </Route>  
                    </UserProvider>
                </CategoryProvider>
            </MemoryProvider>
           

        </>
    )
}