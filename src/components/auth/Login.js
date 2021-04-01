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
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
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
                    <h2 className="logIn_subtitle"><em>Life is a journey, make the most of it.</em> </h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> </label>
                        <input ref={email} type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <Button variant="dark" type="submit">
                            Sign in
                        </Button >
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link style={{ color: '#000000' }}  to="/register">Click here to create an account.</Link>
            </section>
        </main>
    )
}

