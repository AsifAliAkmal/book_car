import axios from "axios";
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";

const SearchBook = (props) =>{
    const {userId,setTurn,refreshHandler} = props

    const [flag,setFlag] = useState(true)
    const [cars,setCars] = useState([])
    const [capacity,setCapacity] = useState(null)

    

    const getCarByCapcity = () => {
            axios.get(`http://localhost:8080/carByCapacity/${capacity}`)
            .then((res) => setCars(res.data))
            .catch(err => console.log(err))

            setFlag(false)
    } 

    const bookCar = (carId) => {
            axios.put(`http://localhost:8080/bookCar/${carId}/user/${userId}`)
            .then((res) => {setTurn(1); refreshHandler()})
    }

    const CreateRow = (props) => {
        const {car} = props;
        return(
            <tr>
                <td>{car.car_number}</td>
                <td>{car.capacity}</td>
                <td><button onClick={() => bookCar(car.id)}>Book</button></td>
            </tr>
        )

    }

    const carsAvail = cars.map(car => <CreateRow car={car}  key={car.id}/>)

    return (
        <div>
            {flag && 
                <form>
                    <label>Capacity</label>
                    <input type="number" placeholder="capacity" onChange={(e) => setCapacity(e.target.value)}/>
                    <button type="submit" onClick={getCarByCapcity}>GetCar</button>
                </form>
            }
            {!flag && 
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
                    <tfoot>
                        <button onClick={() => setTurn(1)}>Home</button>
                    </tfoot>
                </table>
                }
        </div>
    )


}

export default SearchBook