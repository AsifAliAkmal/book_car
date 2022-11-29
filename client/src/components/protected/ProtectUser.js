import { Navigate, Outlet } from "react-router-dom";

const ProtectUser = (props) => {
    const {user} = props
    return (user.role === "user")? <Outlet />:<Navigate to="/"/>
}

export default ProtectUser;
