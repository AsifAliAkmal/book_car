import { Navigate, Outlet } from "react-router-dom"

const ProtectAdmin = (props) => {
    const {user} = props

    return (user.role === "admin")?<Outlet />:<Navigate to="/" />
}

export default ProtectAdmin