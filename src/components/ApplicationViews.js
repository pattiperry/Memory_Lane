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
import {UserForm} from "./user/UserForm"
import {HouseholdProvider} from "./household/HouseholdProvider"
import {HouseholdList} from "./household/HouseholdList"
import {HouseholdSearch} from "./household/HouseholdSearch"
import {HouseholdForm} from "./household/HouseholdForm"
import {HouseholdDetail} from "./household/HouseholdDetail"
import {CommentProvider} from "./comment/CommentProvider"
import {CommentForm} from "./comment/CommentForm"
import {RecentlySubmitted} from "./RecenetlySubmitted"

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <MemoryProvider>
                <Route exact path="/">
                    <Home />
                </Route> 
            </MemoryProvider>

            <HouseholdProvider>
                <UserProvider>
                    <Route exact path="/households" >
                        <HouseholdSearch />                    
                        <HouseholdList />
                    </Route>
                    <Route path="/households/create">
                        <HouseholdForm />
                    </Route>
                    
                        <Route path="/users/create/:householdId(\d+)">
                            <UserForm />
                        </Route>
                        {/* householdId is referring to usersId for the userForm */}
                        <Route path="/users/edit/:specificUserId(\d+)">
                            <UserForm />
                        </Route>
                        <Route path="/households/detail/:householdId(\d+)">
                            <HouseholdDetail />
                        </Route>
                    
                    <Route path="/households/edit/:householdId(\d+)">
                        <HouseholdForm />
                    </Route>
                </UserProvider>
            </HouseholdProvider>


            <MemoryProvider>
                <CategoryProvider>
                    <UserProvider>
                        <CommentProvider>
                            <Route exact path="/memories">
                                <MemorySearch />
                                <MemoryList />
                            </Route>
                            <Route path= "/memories/detail/:memoryId(\d+)">
                                <MemoryDetail />
                            </Route>
                            <Route path="/memories/create/:memoryId(\d+)">
                                <CommentForm />
                            </Route> 
                            <Route path="/comments/edit/:memoryId(\d+)">
                                <CommentForm />
                            </Route> 
                        
                            <Route path="/memories/edit/:memoryId(\d+)">
                                <MemoryForm />
                            </Route> 
                            <Route path="/memories/create">
                                <MemoryForm />
                            </Route>  
                        </CommentProvider>
                    </UserProvider>
                </CategoryProvider>
            </MemoryProvider>
           

        </>
    )
}