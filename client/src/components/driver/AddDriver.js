import axios from "axios"
import { useState } from "react"


const AddDriver = (props) =>{
    const {setTurn,refreshHandler} = props
    const [name,setName] = useState(null)
    const [number,setNumber] = useState(null)
    const [error,setError] = useState(null)

    const handleSubmit = () => {
            
            if(!name){
                setError("Enter the name")
                return ;
            }

            if(!number){
                setError("Enter the number")
                return ;
            }

            const payLoad = {
                "name" : name,
                "phone_number":number
            }

            axios.post("http://localhost:8080/addDriver",payLoad)
            .then((res) => {setTurn(1); refreshHandler()})
            .catch((err) => setError(err))
    }



    return (
        <div>
            <form>
                <div>
                <label>Name</label>
                <input type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                <label>Contact Number</label>
                <input type="text" placeholder="Contct Number" onChange={(e) => setNumber(e.target.value)}/>
                </div>
                <div>
                    {error && <p style={{color:"red"}}>{error}</p>}
                </div>
                <div>
                    <button type="submit"  onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddDriver