import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";

import ShowBooking from "./ShowBooking"
import SearchBooking from "./SearchBooking"

import "./user.scss"

const User = () => {
    const [refresh, setRefresh] = useState(false)
    const [turn, setTurn] = useState(1)
    const [bookings, setBookings] = useState([])

    const encodedToken = window.localStorage.getItem("Token")

    const userId = window.localStorage.getItem("userId")
    console.log(userId)

    useEffect(() => getBooking(), [refresh])

    const refreshHandler = () => {
        setRefresh(!refresh);
    }

    const getBooking = () => {
        axios.get(`http://localhost:8080/getBookedCar/${userId}`, { headers: { Authorization: encodedToken } })
            .then((res) => setBookings(res.data))
    }

    return (
        <div class="user-root">
            {turn === 1 && <>
                <div>
                    <button onClick={() => setTurn(2)}>Show Booking</button>
                </div>
                <div>
                    <button onClick={() => setTurn(3)}>Search&Book</button>
                </div>
                <div>
                    <Link style={{textDecoration:"none"}} to="/dashboard"><button>Home</button> </Link>
                </div>
            </>
            }
            {turn === 2 &&
                <ShowBooking bookings={bookings} refreshHandler={refreshHandler} setTurn={setTurn} encodedToken={encodedToken} />

            }
            {turn === 3 &&
                <SearchBooking userId={userId} refreshHandler={refreshHandler} setTurn={setTurn} encodedToken={encodedToken} />
            }
        </div>
    )
}

export default User