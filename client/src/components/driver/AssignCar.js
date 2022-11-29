import axios from "axios";
import { useEffect, useState } from "react";

const AssignCar = (props) => {
    const {driverId,setTurn,refreshHandler} = props;
    const [cars,setCars] = useState([])

    useEffect(() => getCars(),[])

    const getCars = ()=>{
        axios.get("http://localhost:8080/cars")
        .then((res) => setCars(res.data))
        .catch((err) => console.log(err))
    }

    const CreateRow = (props) =>{
            const {car} = props;
            return (
                <tr>
                    <td>{car.car_number}</td>
                    <td>{car.capacity}</td>
                    <td><button onClick={() => assignCar(car.id)}>AssignCar</button></td>
                </tr>
            )
    }


    const assignCar = (carId) =>{
        axios.put(`http://localhost:8080/assignDriver/${driverId}/car/${carId}`)
        .then((res) => {setTurn(1); refreshHandler()})
        .catch((err) => console.log(err))
    }

    const carsAvail = cars.map(car => <CreateRow car={car} key={car.id}/>)
    return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Car Number</th>
                            <th>Capacity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carsAvail}
                    </tbody>
                </table>
            </div>

    )
}

export default AssignCar;
