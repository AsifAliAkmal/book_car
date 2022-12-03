import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script";
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import './form.scss'


function Login() {
    const [userId, setUserId] = useState(null)
    const [flag, setFlag] = useState(false)
    const [turn, setTurn] = useState(1)

    const clientId = "441414751133-rlcv49m0m5oo7oqvfkkvbmb28g1lfk09.apps.googleusercontent.com";

    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.auth2.init({ clientId: clientId })
        })
    }, [])

    const onLoginSuccess = (res) => {
        const profile = res.profileObj;
        var encodedToken ="Basic " + window.btoa(profile.email+':'+profile.email).toString();
            axios.get("http://localhost:8080/user",
                {headers:{Authorization:encodedToken}}
              )
            .then((res) => {
                                setUserId(res.data.id)
                                window.localStorage.setItem("Token",res.headers.authorization)
                                window.localStorage.setItem("Role",res.data.role)
                                if(!userId)
                                    setFlag(true)
                            })
            .catch((err) => console.log(err))
            window.localStorage.setItem("basicToken",encodedToken)
    };
    if (userId) {
        window.localStorage.setItem("isLoggedIn", true)
        window.localStorage.setItem("userId", userId)
        return <Navigate to="/dashboard" />
    }

    const onLoginFailure = (res) => {
        console.log(res.profileObj)
    };

    const onSignupSuccess = (res) => {
            const profile = res.profileObj
            const payLoad = {
                "name":profile.name,
                "email":profile.email,
                "password":profile.email,
                "role":"USER"
            }

            axios.post("http://localhost:8080/register",payLoad)
            .then((res) => setTurn(1))
            .catch(err => console.log(err))
    }

    const onSignupFailure = (res) => {
        console.log('Signup Failed:', res)
    }

    return (
        <div className='root'>
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
                    <div className='signup-btn'>
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
