import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from "gapi-script";
import { Navigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
    const [user, setUser] = useState(null)
    const [flag, setFlag] = useState(false)
    const [turn, setTurn] = useState(1)

    const clientId = "441414751133-rlcv49m0m5oo7oqvfkkvbmb28g1lfk09.apps.googleusercontent.com";

    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.auth2.init({ clientId: clientId })
        })
    }, [])

    const onLoginSuccess = (res) => {
        axios.get(`http://localhost:8080/login/${res.profileObj.email}`)
            .then((res) => {
                setUser(res.data)
                if (!user)
                    setFlag(true)
            })
            .catch(err => console.log(err))
    };
    if (user) {
        window.localStorage.setItem("isLoggedIn", true)
        window.localStorage.setItem("user", JSON.stringify(user))
        return <Navigate to="/dashboard" />
    }

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignupSuccess = (res) => {
        const payLoad = {
            "name": res.profileObj.name,
            "email": res.profileObj.email,
            "password": res.profileObj.name,
            "role": "user"
        }

        axios.post("http://localhost:8080/register", payLoad)
            .then((res) => setTurn(1))
            .catch(err => console.log(err))
    }

    const onSignupFailure = (res) => {
        console.log('Signup Failed:', res)
    }

    return (
        <div>
            {turn === 1 &&
                <>
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Sign In"
                        onSuccess={onLoginSuccess}
                        onFailure={onLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    ></GoogleLogin>
                    {flag && <p style={{ color: 'red' }}>Please Signup Email does not exist</p>}
                    <div>
                        <button onClick={() => setTurn(2)}>Sign Up</button>
                    </div>

                </>}

            {turn === 2 &&
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign Up"
                    onSuccess={onSignupSuccess}
                    onFailure={onSignupFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                ></GoogleLogin>
            }

        </div>
    );
}
export default Login;
