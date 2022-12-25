import { React, useEffect, useState } from 'react';
import './companyDetails.css';
import { db } from "../../config/firebase";
import { getDocs, collection, doc, updateDoc, increment, getDoc, onSnapshot } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { getIdToken } from 'firebase/auth';
import Swal from 'sweetalert2/dist/sweetalert2.js';


function TheCompanies() {

    const [data, setData] = useState([]);
    const [detail, setDetail] = useState("");


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

    const details = (compData) => {
        localStorage.setItem('compData', JSON.stringify(compData));
        // console.log("The Company Data", compData);
        setDetail("detail set");
    }

    return (
        <>
            {detail === "" &&
                <div className='main-div-for-comp-details' >

                    <div className='upper-header' >
                        <h2 className='upper-text' >
                            Select Company to buy your token
                        </h2>
                    </div>

                    <div className='for-margin' >

                        {data.map((item, index) =>

                            <div className='main-for-companies' >
                                <div className='companies-inner' >
                                    <h2 className='comp-names' >
                                        {item.companyName}
                                    </h2>
                                    <Button variant="primary" onClick={() => details(data[index])} >Details</Button>{' '}
                                </div>
                            </div>

                        )
                        }
                    </div> :

                </div>
            }

            {detail === "detail set" &&
                <CompanyDetailsComp />
            }
        </>
    )

}

function CompanyDetailsComp() {

    const [theData, setTheData] = useState([]);
    const [tokenInfo, setTokenInfo] = useState(true);

    const Swal = require('sweetalert2');

    const tokenError = () => {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No more tokens left',
            showConfirmButton: false,
            timer: 2000
        });
    }

    const companiesData = JSON.parse(localStorage.getItem("compData"));

    const companyName = companiesData.companyName;
    const since = companiesData.since;
    const openingTime = companiesData.time;
    const closingTime = companiesData.closing;
    const address = companiesData.address;
    const id = companiesData.id;

    const [totalToken, setTotalToken] = useState("");
    const [yourToken, setYourToken] = useState("");
    const [avgTime, setAvgTime] = useState("");

    const getToken = async (id) => {

        if (totalToken < yourToken) {
            tokenError();
        } else {
            const ref = doc(db, "companyData", id);

            //This function is used to increment in document field
            await updateDoc(ref, {
                currentToken: increment(1)
            });
            setTokenInfo(false);
            realtimeData();
            console.log("Your Token", yourToken)
            console.log("Avg Time", avgTime)
            console.log("Remaining Time", remainingTime)
        }

    }

    const remainingTime = avgTime * yourToken;


    const realtimeData = onSnapshot(doc(db, "companyData", id), (doc) => {

        setTotalToken(doc.data().todayToken);
        setYourToken(doc.data().currentToken);
        setAvgTime(doc.data().tokenTime);


    });


    return (
        <>
            {tokenInfo ?
                <div className="company-details-div" >
                    <div className='company' >
                        <div className='childs' >
                            <h1>Details</h1>
                        </div>

                        <div className='childs' >
                            <h3 className='comp-details' >Name: {companyName}</h3>
                        </div>

                        <div className='childs' >
                            <h3 className='comp-details'  >Since: {since}</h3>
                        </div>

                        <div className='childs' >
                            <h3 className='comp-details'  >Opening Time: {openingTime}</h3>
                        </div>

                        <div className='childs' >
                            <h3 className='comp-details'  >Closing Time: {closingTime}</h3>
                        </div>

                        <div className='childs' >
                            <h3 className='comp-details'  >Address: {address}</h3>
                        </div>

                        <div className='childs' >

                            <Button variant="dark" className='buy-token-btn' onClick={() => getToken(id)} >Buy Token</Button>

                        </div>
                    </div>

                </div>
                :

                <div className='token-info-parent' >
                    <div className="token-info-main" >

                        <div className='token-child' >
                            <h3>Your Token Info</h3>
                        </div>

                        <div className='token-child' >
                            <h4>Total tokens: {totalToken}</h4>
                        </div>

                        <div className='token-child' >
                            <h4>Your token: {yourToken}</h4>
                        </div>

                        <div className='token-child' >
                            <h4>Current tokens: 8</h4>
                        </div>

                        <div className='token-child' >
                            <h4>Time remaining: {remainingTime} minutes</h4>
                        </div>

                        <Button variant="dark" >Cancel Token</Button>
                    </div>
                </div>
            }
        </>

    )
}

export default TheCompanies;