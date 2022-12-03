import {Link, Navigate} from "react-router-dom";
import Logout from "./form/Logout";

import "./landingPage.scss"

const Landingpage = () => {
    const role = window.localStorage.getItem("Role")

    return (
        <div className="landing-page">
            {role === "USER" && <Link style={{textDecoration:"none"}} to="/user"><button>User Dashboard</button></Link>}
            {role === "ADMIN" && <Link style={{textDecoration:"none"}} to="/admin"><button>Admin Dashboard</button></Link>}
        </div>

    )
}

export default Landingpage;
