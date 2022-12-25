import { React, useRef, useState, useEffect, } from 'react';
import "./addToken.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { db, auth } from "../../config/firebase";
import { collection, getDocs, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { Await, Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js';


function AddTheToken() {

    // Getting the company data

    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const Swal = require('sweetalert2');

    const companyID = JSON.parse(localStorage.getItem("id"));
    console.log(companyID);

    const successAlert = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tokens Added Successfully',
            showConfirmButton: false,
            timer: 2000
        });
    }

    useEffect(() => {
        getCompanyDataFromDb();
    }, [])

    async function getCompanyDataFromDb() {
        const querySnapshot = await getDocs(collection(db, "companyData"));
        const companyData = [];
        querySnapshot.forEach((doc) => {
            companyData.push({ id: doc.id, ...doc.data() });
        });

        setData(companyData)
        return companyData;

    }

    // console.log(data);
    // This function is for adding Token 
    console.log(data)
    const tokenLimit = useRef();
    const currToken = useRef();
    const tokenTime = useRef();



    const addTokens = () => {
        const tokenLimitVal = tokenLimit.current.value;
        const currTokenVal = currToken.current.value;
        const tokenTimeVal = tokenTime.current.value;
        console.log(tokenLimitVal);
        console.log(currTokenVal);
        console.log(tokenLimitVal);
        addTokensToDb(tokenLimitVal, currTokenVal, tokenTimeVal);
        successAlert();
        navigate('/company');
    }

    // Adding tokens to DB

    const addTokensToDb = async (tokenLimitVal, currTokenVal, tokenTimeVal) => {
        // const uid = auth.currentUser.uid;
        // let companyID = data.map((item) => item.id);
        // companyID = companyID.toString();

        // console.log("This is company ID", companyID);
        // console.log("id", uid);
        // return setDoc(doc(db, "tokens", `${companyID}`), { tokenLimitVal, tokenTimeVal });
        // addDoc(collection(db, "token"), { tokenLimitVal, tokenTimeVal});
        const companyRef = doc(db, "companyData", companyID);
        // const companyRef = db.collection("companyData").doc(companyID);

        await updateDoc(companyRef, {
            todayToken: tokenLimitVal,
            currentToken: currTokenVal,
            tokenTime: tokenTimeVal
        })


    }

    return (
        <div className="main-div-for-tokens" >
            <div className="tokens-div" >
                <div className='token-child' >
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>No of Tokens</Form.Label>
                            <Form.Control
                                type="number"
                                ref={tokenLimit}
                            />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Start from</Form.Label>
                            <Form.Control type="text" ref={currToken} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Time for each token</Form.Label>
                            <Form.Control type="text" ref={tokenTime} />
                        </Form.Group>

                        <Button variant="primary" onClick={addTokens}>
                            Add tokens
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default AddTheToken;