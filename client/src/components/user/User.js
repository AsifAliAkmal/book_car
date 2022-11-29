import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";

import ShowBooking from "./ShowBooking"
import SearchBooking from "./SearchBooking"



const User = () => {
    const [refresh, setRefresh] = useState(false)
    const [turn, setTurn] = useState(1)
    const [bookings, setBookings] = useState([])

    const user = JSON.parse(window.localStorage.getItem("user"))

    useEffect(() => getBooking(), [refresh])

    const refreshHandler = () => {
        setRefresh(!refresh);
    }

    const getBooking = () => {
        axios.get(`http://localhost:8080/getBookedCar/${user.id}`)
            .then((res) => setBookings(res.data))
    }





    return (
        <div>
            {turn === 1 && <>
                <button onClick={() => setTurn(2)}>Show Booking</button>
                <button onClick={() => setTurn(3)}>Search&Book</button>
                <button><Link to="/dashboard">Home</Link></button>
            </>
            }
            {turn === 2 &&
               <ShowBooking bookings={bookings} refreshHandler={refreshHandler} setTurn={setTurn}/>

            }
            {turn === 3 &&
                    <SearchBooking  userId={user.id} refreshHandler={refreshHandler} setTurn={setTurn} />
            }
        </div>
    )
}

export default User