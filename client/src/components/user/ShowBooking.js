import React, { useState, useEffect } from "react";
import axios from "axios";


const ShowBooking = (props) => {
    const {bookings,refreshHandler,setTurn,encodedToken} = props

    const handleCancleClick = (id) => {
        axios.put(`http://localhost:8080/cancleBooking/${id}`,{},{headers:{Authorization:encodedToken}})
            .then(res => refreshHandler())
    }

    const CreateRow = ({ booking }) => {
        return (
                <tr>
                    <td>{booking.car_number}</td>
                    <td>{booking.capacity}</td>
                    <td><button onClick={() => handleCancleClick(booking.id)}>Cancle Booking</button></td>
                </tr>
        )
    }

    const tdata = bookings.map(booking =>
        <CreateRow booking={booking} key={booking.id}/>)

    return (<div>
        <h2>Bookings:</h2>
        <table>
            <thead>
                <tr>
                    <th>Car Number</th>
                    <th>Capacity</th>
                </tr>
            </thead>
            <tbody>
                {tdata}
            </tbody>
        </table>
        <button onClick={() => setTurn(1)}>Back</button>
    </div>)
}

export default ShowBooking;

