import React, { Component } from "react"
import { Link } from "react-router-dom"
//import "bootstrap/dist/css/bootstrap.min.css"

export const NavBar = (props) => {
    return (
        <nav className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">
        <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
                <Link className="nav-link" to="/">Memory Lane</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/family">Family Members</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/index">Memory Index</Link>
            </li>
        </ul>
        </nav>
    )
}