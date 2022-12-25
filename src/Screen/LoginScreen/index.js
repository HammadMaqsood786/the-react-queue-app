import React, { useState, useEffect, useRef } from "react";
import { ReactDOM } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./login.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { signInWithPopup, storeCompanyData, app, db } from '../../config/firebase';
import { getAuth, FacebookAuthProvider } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2/dist/sweetalert2.js';






export default function LoginPage() {

    const navigate = useNavigate();

    const Swal = require('sweetalert2');

    const successAlert = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully Logged In',
            showConfirmButton: false,
            timer: 2000
        });
    }

    const addUserToDb = (name, email, uid,) => {

        return setDoc(doc(db, "users", uid), { email, name, });

    }

    //This function used to sign in with facebook
    const signInWithFacebook = () => {

        const theProvider = new FacebookAuthProvider();
        const auth = getAuth();

        signInWithPopup(auth, theProvider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                console.log("user", user);
                const name = user.displayName;
                const email = user.email;
                const uid = user.uid;
                addUserToDb(name, email, uid);
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                navigate("/home");
                successAlert();
                // goToHome()

                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);
                console.log("error", error)

                // ...
            });

    }

    return (
        <>

            <div className="main-for-login-page" >
                <h1 id="main-heading" >
                    Queue App
                </h1>

                <p className="special-text" >
                    Welcome to our Queue App we hope this app<br /> will provide you relief you need
                </p>

                <div className="img-div" >
                    <img src="https://img.freepik.com/free-vector/people-standing-store-queue_52683-41810.jpg?size=626&ext=jpg&ga=GA1.2.1514077238.1670510197" className="main-page-image" />
                </div>

                <div className="login-btn-div" >
                    <Button variant="primary" className="login-btn" onClick={signInWithFacebook} >Continue with facebook</Button>
                    {/* {' '} */}
                </div>

            </div>

        </>

    )
}

export {
    // goToHome
}