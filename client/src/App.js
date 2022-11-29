import React,{useStata} from 'react';
import CarBookingRouter  from "./components/CarBookingRouter";
import Logout from './components/form/Logout';

const App = () => {
  return(
    <div>
      {/* <Logout /> */}
      <CarBookingRouter />
    </div>
    
  )
}

export default App;
