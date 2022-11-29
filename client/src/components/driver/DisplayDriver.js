import axios from "axios";
import { useState } from "react"
import AssignCar from "./AssignCar";
import AddDriver from "./AddDriver";


const DisplayDriver = (props) => {
        
        const {drivers,refreshHandler} = props

        const [turn,setTurn] = useState(1);
        const [cars,setCars] = useState([])
        const [driverId,setDriveId] = useState(null)

        const removeDriver = (id) => {
            axios.delete(`http://localhost:8080/removeDriver/${id}`)
            .then(res => refreshHandler())
            .catch(err => console.log(err))
        }

        const CreateRow = (props) =>{
            const {driver} = props
            return (
                <tr>
                    <td>{driver.name}</td>
                    <td>{driver.phone_number}</td>
                    <td><button onClick={() => removeDriver(driver.id)}>Remove</button></td>
                    <td><button onClick={() => {handleClick(driver.cars)}}>Display Cars</button></td>
                    <td><button onClick={() => {assignCar(driver.id)}}>Assign Car</button></td>
                </tr>
            )
        }

        const assignCar = (driverId) => {
                setDriveId(driverId);
                setTurn(3)
        }

        const handleClick = (cars) => {
            setTurn(2);
            setCars(cars)
        }
       
        const CreateCar = (props) =>{ 
            const {car} = props
            return (
                <tr>
                    <td>{car.car_number}</td>
                    <td>{car.capacity}</td>
                </tr>
            )
        }

        const driversAvail = drivers.map((driver) => 
        <CreateRow driver={driver} key={driver.id} />
        )

        const carsAvail = cars.map(car => <CreateCar car={car} key={car.id}/>)

        return(
            <div>
                {turn === 1 &&<>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {driversAvail}
                    </tbody>
                </table>
                <button onClick={() => setTurn(4)}>Add Driver</button></>}
                {turn === 2 && 
                <>
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
                <button onClick={() =>setTurn(1)}>Go Back</button>
                </>
                }
                {turn === 3 && <AssignCar driverId={driverId} setTurn={setTurn} refreshHandler={refreshHandler}/>
                }
                {turn === 4 && <AddDriver setTurn={setTurn}  refreshHandler={refreshHandler}/>}
            </div>
        )
}

export default DisplayDriver
