import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

import ShowCar from "./ShowCar"
import AddCar from "./AddCar"


const CarLanding = () => {

    const [cars, setCars] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [turn, setTurn] = useState(1)

    const refreshHandler = () => {
        setRefresh(!refresh)
    }

    useEffect(() => getAllCar(), [refresh])

    const getAllCar = () => {
        axios.get("http://localhost:8080/cars")
            .then((res) => setCars(res.data))
            .catch(err => console.log(err))
    }


    return (
        <div>
            {turn === 1 &&
                <>
                    <div>
                        <button onClick={() => setTurn(2)}>Show Car</button>
                    </div>
                    <div>
                        <button onClick={() => setTurn(3)}>Add Car</button>
                    </div>
                </>

            }
            {turn === 2 &&
                <ShowCar cars={cars} refreshHandler={refreshHandler} setTurn={setTurn} />
            }
            {turn === 3 &&
                <AddCar refreshHandler={refreshHandler} setTurn={setTurn} />
            }
            <div>
                        <button>
                            <Link to="/admin">Home</Link>
                        </button>
                    </div>

        </div>

    )
}

export default CarLanding
