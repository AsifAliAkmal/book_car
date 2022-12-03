import React,{useStata} from 'react';
import CarBookingRouter  from "./components/CarBookingRouter";
import Logout from './components/form/Logout';

const App = () => {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn")

  return(
    <div>
      <CarBookingRouter />
      <div style={{position:'absolute',right:'4%',top:'2%'}}>
        {isLoggedIn && <Logout />}
      </div>
    </div>
    
  )
}

export default App;
