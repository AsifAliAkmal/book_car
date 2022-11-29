import { useState } from "react"
import { Link } from "react-router-dom"
import AdminSignup from "./AdminSignup"

const AdminLanding = () => {
    const [turn, setTurn] = useState(1)
    return (
        <div>
            {turn === 1 && <>
                <div>
                <Link to="/drivers" >Driver DashBoard</Link>
                </div>
                <div>
                <Link to="/cars">Car DashBoard</Link>
                </div>
                <button onClick={() => setTurn(2)} >Add Admin</button>
                <div>
                <button><Link to="/dashboard">Home</Link></button>
                </div>
            </>
            }
            {turn === 2 && <AdminSignup setTurn={setTurn} />}
        </div>


    )
}

export default AdminLanding