import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";


const Signup = (props) => {
    const {role="user",url="/"} = props
    const [email,setEmail] = useState(null);
    const [name,setName] = useState(null);
    const [password,setPassword] = useState(null);
    const [cfPassword,setCfPassword] = useState(null);
    const [error,setError] = useState(null)
    const [flag,setFlag] = useState(false)

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!name){
            setError("Please Enter Full Name")
            return;
        }
        if(!email){
            setError("Please Enter Email")
            return;
        }

        if(password !== cfPassword){
            setError("Password and Confirm Password does not match!");
            return;
        }

        const payLoad = {
            "name" : name,
            "email":email,
            "password":password,
            "role":role
        }

        axios.post("http://localhost:8080/register",payLoad)
        .then((res) => setFlag(true))
        .catch((err) => console.log(err)) 
    }

    if(flag)
        return <Navigate to={url} />

    return(
        <div>
            <form>
                <div>
                    <label>Username</label>
                    <input type="text" placeholder="Enter Full Name" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" onChange={(e) => setCfPassword(e.target.value)}/>
                </div>
                <div>
                    {error && <p style={{color:"red"}}>{error}</p>}
                </div>
                <div>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    )



}

export default Signup;