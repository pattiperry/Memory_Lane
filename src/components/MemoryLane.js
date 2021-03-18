import React from "react"
import {Route, Redirect} from "react-router-dom"
import {ApplicationViews} from "./ApplicationViews"
import { NavBar } from "./navbar/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./MemoryLane.css";

//Declare and export MemoryLane
export const MemoryLane = () => (
    <>
      <Route
        render={() => {
        //if localstorage contains a key of "memorylane_user"
        //display NavBar and ApplicationViews
          if (localStorage.getItem("memorylane_user")) {
            return (
              <>
                <NavBar />
                <ApplicationViews />
              </>
            );
          } else {
              //if local storage does not contain "memorylane_user" key
              //redirect to login path
            return <Redirect to="/login" />;
          }
        }}
      />
  
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </>
  );