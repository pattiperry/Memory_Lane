import React from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

export const NavBar = (props) => {
    return (
        <nav className="navbar bg-dark text-white expand=lg flex-md-nowrap p-0 shadow">
        <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
                <Link style={{ color: '#FFFFFF' }} className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link style={{ color: '#FFFFFF' }} className="nav-link" to="/households">My Family</Link>
            </li>
            <li className="nav-item">
                <Link style={{ color: '#FFFFFF' }} className="nav-link" to="/memories">Memory Index</Link>
            </li>
        </ul>
        </nav>
    )
}