import axios from "axios"

const ShowCar = (props) => {
    const {cars,refreshHandler,setTurn,encodedToken} = props
    const removeCar = (carId) =>{
            axios.delete(`http://localhost:8080/removeCar/${carId}`, {headers:{Authorization:encodedToken}})
            .then((res) => refreshHandler())
            .catch(err => console.log(err))
    }

    const CreateRow = (props) => {
        const {car} = props
        return(
            <tr>
                <td>{car.car_number}</td>
                <td>{car.capacity}</td>
                <td>{car.is_booked?"Book":"Not Booked"}</td>
                <td><button onClick={() => removeCar(car.id)}>Remove</button></td>
            </tr>
        )
    }

    const carsAvail = cars.map(car => <CreateRow car = {car} key={car.id}/>)

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Car Number</th>
                        <th>Capacity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {carsAvail}
                </tbody>
            </table>
            <button onClick={()=>setTurn(1)}>Back</button>
        </div>
    )

}

export default ShowCar
