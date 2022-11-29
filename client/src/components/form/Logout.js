import React, { useEffect, useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import { gapi } from "gapi-script";
import { Navigate } from 'react-router-dom';

const Logout = () => {
    const [logout, setLogout] = useState(false)

    const clientId = "441414751133-rlcv49m0m5oo7oqvfkkvbmb28g1lfk09.apps.googleusercontent.com";
    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.auth2.init({ clientId: clientId })
        })
    }, [])

    const onSignoutSuccess = () => {
        console.clear();
        localStorage.clear();
        sessionStorage.clear();
        setLogout(true)
    };

    if (logout) {
        return <Navigate to="/" />
    }


    return (
        <GoogleLogout
            clientId={clientId}
            buttonText="Sign Out"
            onLogoutSuccess={onSignoutSuccess}
        >
        </GoogleLogout>
    )
}

export default Logout
