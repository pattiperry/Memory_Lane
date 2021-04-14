import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const dob = useRef()
    const phone = useRef()
    const candy = useRef()
    const dessert = useRef()
    const food = useRef()
    const drink = useRef()
    const place = useRef()
    const color = useRef()
    const season = useRef()
    const movie = useRef()
    const music = useRef()
    const scent = useRef()
    const hobby = useRef()
    const verifyPassword = useRef()
    const conflictDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`https://walk-down-memory-lane-api.herokuapp.com/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        e.preventDefault()


        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("https://walk-down-memory-lane-api.herokuapp.com/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            name: `${firstName.current.value} ${lastName.current.value}`,
                            phone: phone.current.value,
                            dob: dob.current.value,
                            candy: candy.current.value,
                            dessert: dessert.current.value,
                            food: food.current.value,
                            drink: drink.current.value,
                            place: place.current.value,
                            color: color.current.value,
                            season: season.current.value,
                            movie: movie.current.value,
                            music: music.current.value,
                            scent: scent.current.value,
                            hobby: hobby.current.value
                        })
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("memorylane_user", createdUser.id)
                                history.push("/")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
        
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Memory Lane</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="dob"> Date of Birth </label>
                    <input ref={dob} type="date" name="dob" className="form-control" placeholder="Date of Birth" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email </label>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="phone"> Phone Number </label>
                    <input ref={phone} type="tel" name="phone" className="form-control" placeholder="Phone Number" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="candy"> Favorite Candy </label>
                    <input ref={candy} type="text" name="candy" className="form-control" placeholder="Favorite Candy" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="dessert"> Favorite Dessert </label>
                    <input ref={dessert} type="text" name="dessert" className="form-control" placeholder="Favorite Dessert" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="food"> Favorite Food/Restaurant </label>
                    <input ref={food} type="text" name="food" className="form-control" placeholder="Favorite Food/Restaurant" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="drink"> Favorite Drink </label>
                    <input ref={drink} type="text" name="drink" className="form-control" placeholder="Favorite Drink" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="hobby"> Favorite Hobby/Past-time </label>
                    <input ref={hobby} type="text" name="hobby" className="form-control" placeholder="Favorite Hobby/Past-time" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="place"> Favorite Place To Go </label>
                    <input ref={place} type="text" name="place" className="form-control" placeholder="Favorite Place To Go" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="season"> Favorite Season of the Year </label>
                    <input ref={season} type="text" name="season" className="form-control" placeholder="Favorite Season of the Year" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="movie"> Favorite Show/Movie </label>
                    <input ref={movie} type="text" name="movie" className="form-control" placeholder="Favorite Show/Movie" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="music"> Favorite Music/Musician </label>
                    <input ref={music} type="text" name="music" className="form-control" placeholder="Favorite Music/Musician" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="scent"> Favorite Scent </label>
                    <input ref={scent} type="text" name="scent" className="form-control" placeholder="Favorite Scent" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="color"> Favorite Color </label>
                    <input ref={color} type="text" name="color" className="form-control" placeholder="Favorite Color" required />
                </fieldset>
                


                <fieldset>
                    <button type="submit"> Sign in </button>
                </fieldset>
            </form>
        </main>
    )
}

