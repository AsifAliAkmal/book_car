import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Landinpage from "./Landingpage";
import ProtectedRoutes from './protected/ProtectedRoutes';
import DriverLanding from './driver/DriverLanding';
import User from "./user/User"
import AdminLanding from "./admin/AdminLanding"
import CarLanding from "./car/CarLanding"
import Login from "./form/Login"

const CarBookingRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<ProtectedRoutes />}>
                        <Route path="/dashboard" element={<Landinpage  />} />
                        <Route path="/user" element={<User />} />
                        <Route path="/admin" element={<AdminLanding />} />
                        <Route path="/cars" element={<CarLanding />} />
                        <Route path="/drivers" element={<DriverLanding />} />
                </Route>

            </Routes>
        </Router>
    )
}

export default CarBookingRouter;