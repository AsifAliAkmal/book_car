import axios from "axios"
import { useState } from "react"

const AddCar = (props) => {
    const {refreshHandler,setTurn} = props

    const [carNumber,setCarNumber] = useState(null)
    const [capacity,setCapacity] = useState(null)
    const [error,setEroor] = useState(null)


    const handleSubmit = () => {
            if(!carNumber){
                setEroor("Please enter car number")
                return ;
            }
            if(!capacity){
                setEroor("Please enter car capacity")
                return ;
            }
            const payLoad = {
                "car_number":carNumber,
                "capacity":capacity,
                "is_booked":false
            }

            axios.post("http://localhost:8080/addCar",payLoad)
            .then(res=>{refreshHandler();setTurn(1)})
            .catch(err =>console.log(err))
    }

    return(
        <div>
            <form>
                <div>
                    <label>Car Number</label>
                    <input type="text" placeholder="car number" onChange={(e) => setCarNumber(e.target.value)} />
                </div>
                <div>
                    <label>Capacity</label>
                    <input type="number" placeholder="capacity" onChange={(e) => setCapacity(e.target.value)} />
                </div>
                <div>{error && <p style={{color:"red"}}>{error}</p>}</div>
                <div>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddCar
