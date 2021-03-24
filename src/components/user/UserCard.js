import React, { useContext, useEffect } from "react"
import {useParams, useHistory} from "react-router-dom"
import {HouseholdContext} from "../household/HouseholdProvider"
import {UserContext} from "./UserProvider"
import "./User.css"

export const UserCard = ({user}) => {

    // const{getHouseholdById, editUser} = useContext(HouseholdContext)
    // const{getUserById} = useContext(UserContext)

    // const[userId, setUserId] = useState([])
    // const[household, setHousehold] = useState([])
    
    // const {householdId} = useParams()
    // const history = useHistory()

    // useEffect(()=> {
    //     let userId = localStorage.getItem("memorylane_user")
    //     console.log(userId)

    //     getUserById(userId).then(setUserId)
    //     .then(()=> {
    //         getHouseholdById(householdId).then(setHousehold)
    //     })
    // }, [])


    return (
        <section className="user">
                {/* {user.householdId === +householdId ?
                <button onClick={() => {
                        history.push(`/households/edit/${household.id}`)
                    }}>Edit</button>
                    : <> </> } */}

                <h3 className="user__name">{user.name}</h3>
                <p className="user_email">Email: {user.email}</p>
                <p className="user_phone">Phone Number: {user.phone}</p>
                <p className="user_dob">Birthday: {user.dob}</p>
                <p className="user_candy">Favorite Candy: {user.candy}</p>
                <p className="user_dessert">Favorite Dessert: {user.dessert}</p>
                <p className="user_food">Favorite Food/Restaurant: {user.food}</p>
                <p className="user_drink">Favorite Drink: {user.drink}</p>
                <p className="user_color">Favorite Color: {user.color}</p>
                <p className="user_scent">Favorite Scent: {user.scent}</p>
                <p className="user_place">Favorite Place: {user.place}</p>
                <p className="user_season">Favorite Season: {user.season}</p>
                <p className="user_movie">Favorite Movie/TV Show: {user.movie}</p>
                <p className="user_music">Favorite Music/Musician: {user.music}</p>
                <p className="user_hobby">Favorite Hobby/Past Time: {user.hobby}</p>
            
            </section>
    )
    
}