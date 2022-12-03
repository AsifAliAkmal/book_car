import { useState } from "react"
import { Link } from "react-router-dom"
import AdminSignup from "./AdminSignup"

import "./admin.scss"

const AdminLanding = () => {
    const [turn, setTurn] = useState(1)
    return (
        <div className="admin">
            {turn === 1 && <>
                <div>
                <Link to="/drivers" ><button>Driver DashBoard</button></Link>
                </div>
                <div>
                <Link to="/cars"><button>Car DashBoard</button></Link>
                </div>
                <button onClick={() => setTurn(2)} >Add Admin</button>
                <div>
                <Link to="/dashboard"><button>Home</button></Link>
                </div>
            </>
            }
            {turn === 2 && <AdminSignup setTurn={setTurn} />}
        </div>


    )
}

export default AdminLanding