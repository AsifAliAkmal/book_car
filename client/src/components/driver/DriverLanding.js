import axios from "axios";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom"

import DisplayDriver from "./DisplayDriver";

const DriverLanding = () => {
    const [driver,setDriver] = useState([]);
    const [refresh,setRefresh] = useState(false);



    useEffect(() => {
        getAllDrivers();
    },[refresh])

    const getAllDrivers = () =>{
        axios.get("http://localhost:8080/drivers")
        .then((res) => {setDriver(res.data)})
        .catch(err => console.log(err))
    }

    

    const refreshHandler = ()=>{
        console.log("Hello World")
        setRefresh(!refresh)
    }

    return (
        <div>
            <DisplayDriver drivers={driver} refreshHandler={refreshHandler} />
            <button>
                <Link to="/admin">Home</Link>
            </button>
        </div>
    )

}

export default DriverLanding;