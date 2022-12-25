import { React, useState, useRef } from "react";
import { ReactDOM } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./home.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Swal from 'sweetalert2/dist/sweetalert2.js';


export default function Home() {


    const navigate = useNavigate();

    const Swal = require('sweetalert2');

    const successAlert = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sign out',
            showConfirmButton: false,
            timer: 2000
        });
    }

    const signOutUser = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            successAlert();
            navigate('/')
        }).catch((error) => {
            console.log("error", error.message)
        });
    }

    return (

        <>

            <div className="main-for-home" >


                <div className="sign-out-div" >
                    <Button variant="danger" onClick={() => signOutUser()} >Sign out</Button>{' '}
                </div>

                <div className="home-btns-main" >

                    <div className="home-page-btns-div" >

                        <Button variant="outline-primary" className="home-page-btns" onClick={() => navigate('/company')} >Are you a Company?</Button>{' '}
                        <div id="between-btns-text" >
                            or
                        </div>
                        <Button variant="outline-success" className="home-page-btns" onClick={() => navigate('/CompanyDetails')} >Are you finding for tokens?</Button>{' '}

                    </div>
                </div>

            </div>
        </>
    )
}

// export {
//     Home
// }