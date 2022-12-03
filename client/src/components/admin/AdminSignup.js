import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";


const Signup = (props) => {
    const {setTurn} = props
    const [email,setEmail] = useState(null);
    const [name,setName] = useState(null);
    const [password,setPassword] = useState(null);
    const [cfPassword,setCfPassword] = useState(null);
    const [error,setError] = useState(null)

    const encodedToken = window.localStorage.getItem("Token")

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
            "password":email,
            "role":"ADMIN"
        }

        axios.post("http://localhost:8080/register",payLoad,{headers:{Authorization:encodedToken}})
        .then((res) => setTurn(1))
        .catch((err) => console.log(err)) 
    }


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
