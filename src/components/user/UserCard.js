import React, { useContext, useEffect, useState } from "react"
import {useParams, useHistory} from "react-router-dom"
import {UserContext} from "./UserProvider"
import "./User.css"
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

export const UserCard = ({user}) => {
    const{getUserById} = useContext(UserContext)
    const [currentUser, setCurrentUser] = useState({})
    
    const {householdId} = useParams()
    const history = useHistory()

    useEffect(()=> {
        let userId = localStorage.getItem("memorylane_user")
        console.log(userId)

       getUserById(userId).then(setCurrentUser)
         .then(()=> {
             
         })
     }, [])


    return (
        <Card>
        <section className="user">
            <Card.Body className="user_detail">
                {currentUser.householdId === +householdId ?
                <Button variant="dark" onClick={() => {
                        history.push(`/users/edit/${user.id}`)
                    }}>Edit</Button >
                    : <> </> }
                <Card.Title><h3 className="user__name">{user.name}</h3></Card.Title>

                <Card.Text className="user_email">Email: {user.email}</Card.Text>
                <Card.Text className="user_phone">Phone Number: {user.phone}</Card.Text>
                <Card.Text className="user_dob">Birthday: {user.dob}</Card.Text>
                <Card.Text className="user_candy">Favorite Candy: {user.candy}</Card.Text>
                <Card.Text className="user_dessert">Favorite Dessert: {user.dessert}</Card.Text>
                <Card.Text className="user_food">Favorite Food/Restaurant: {user.food}</Card.Text>
                <Card.Text className="user_drink">Favorite Drink: {user.drink}</Card.Text>
                <Card.Text className="user_color">Favorite Color: {user.color}</Card.Text>
                <Card.Text className="user_scent">Favorite Scent: {user.scent}</Card.Text>
                <Card.Text className="user_place">Favorite Place: {user.place}</Card.Text>
                <Card.Text className="user_season">Favorite Season: {user.season}</Card.Text>
                <Card.Text className="user_movie">Favorite Movie/TV Show: {user.movie}</Card.Text>
                <Card.Text className="user_music">Favorite Music/Musician: {user.music}</Card.Text>
                <Card.Text className="user_hobby">Favorite Hobby/Past Time: {user.hobby}</Card.Text>
            </Card.Body>
        </section>
        </Card>
    )
    
}