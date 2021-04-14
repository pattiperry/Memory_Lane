import React, { useRef } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import "./Login.css"
import Button from 'react-bootstrap/Button'

export const Login = props => {
    const email = useRef()
    const password = useRef()
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`https://walk-down-memory-lane-api.herokuapp.com/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false )
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("memorylane_user", exists.id)
                    history.push("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 className="logIn_title">Memory Lane</h1>
                    <h2 className="logIn_subtitle style={{ color: '#1f7e4f' }}"><em>Memory is a way of holding on to the things you love, the things you are, the things you never want to lose. 
                        <h2>-Kevin Arnold</h2></em> </h2>
                    <fieldset className="logIn_emailfield">
                        <label htmlFor="inputEmail"> </label>
                        <input ref={email} type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset className= "logIn_button">
                        <Button variant="dark" type="submit">
                            Sign in
                        </Button >
                    </fieldset>
                    <fieldset className="link--register">
                <Link style={{ color: '#000000' }}  to="/register">Click here to create an account.</Link>
            </fieldset>
                </form>
            </section>
            
        </main>
    )
}

