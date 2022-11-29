import {Link, Navigate} from "react-router-dom";
import Logout from "./form/Logout";


const Landingpage = () => {
    return (
        <div>
            <button><Link to="/user">User</Link></button>
            <button><Link to="/admin">Admin</Link></button>
            <div>
                <Logout />
            </div>
        </div>

    )
}

export default Landingpage;
