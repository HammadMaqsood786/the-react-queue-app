import { React, useState, useRef, useEffect } from "react";
import { ReactDOM } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./company.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { storeCompanyData, uploadImage, getRealtimeCompanyData, db, storage } from "../../config/firebase";
import { addDoc, collection, onSnapshot, getDocs, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js';




function Company() {

    // const dispatch = useDispatch();
    // const theme = useSelector(state => state.theme)

    //This is a react bootstrap modal code
    const [show, setShow] = useState(false);

    const Swal = require('sweetalert2');

    const successAlert = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registered Successfully',
            showConfirmButton: false,
            timer: 2000
        });
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //This is a react bootstrap modal code

    const navigate = useNavigate(); // to navigate the user to other screen on button click

    //Getting the values of modal inputs using useRef()
    const inputElem1 = useRef();
    const inputElem2 = useRef();
    const inputElem3 = useRef();
    const inputElem4 = useRef();
    const inputElemImg = useRef();
    const inputElemClosing = useRef();

    //Getting the company data div 


    async function getCompanyData() {
        const companyName = inputElem1.current.value;
        const since = inputElem2.current.value;
        const time = inputElem3.current.value;
        const closing = inputElemClosing.current.value;
        const address = inputElem4.current.value;
        const image = inputElemImg.current.files[0];
        console.log(image);
        console.log(companyName);
        console.log(since);
        console.log(time);
        console.log(address);
        const imageUrl = await uploadImage(image);
        await storeCompanyData(companyName, since, time, closing, address, imageUrl); //This function store Data to Database
        successAlert();


    }

    // Calling this function to store company data Database

    const storeCompanyData = (companyName, since, time, closing, address, imageUrl) => {

        return addDoc(collection(db, "companyData"), { companyName, since, time, closing, address, imageUrl });

    }

    // ==== This function is used to upload image in firebase storage

    async function uploadImage(image) {
        const storageRef = ref(storage, `images/${image.name}`)
        const snapshot = await uploadBytes(storageRef, image)
        const url = await getDownloadURL(snapshot.ref)
        return url;
    }



    // Firebse function for getting real time data

    const [data, setData] = useState([]);


    useEffect(() => { getAdsFromDb() }, [])

    async function getAdsFromDb() {
        const querySnapshot = await getDocs(collection(db, "companyData"));
        const companyData = [];
        querySnapshot.forEach((doc) => {
            companyData.push({ id: doc.id, ...doc.data() });
        });

        // console.log(companyData)
        setData(companyData)
        return companyData;

    }

    const updateAndNavigate = (id) => {
        localStorage.setItem('id', JSON.stringify(id));
        navigate('/AddToken', { replace: true })
    }

    return (
        <>
            <div className="main-div-for-company" >
                <div className="upper-header" >
                    <h2 className="upper-text" >
                        Select Your Company to add today tokens
                    </h2>
                </div>

                    <div className="upper-div" >
                        <button className="plus-btn" onClick={handleShow} >
                            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" id="plus-btn-image" />
                        </button>

                    </div>

                <div className="main-company-div" >
                    <div className="for-flex" >

                    {data.map((item) =>
                        <div className="company-data-div">
                            <div className="company-div-child1" >
                                <h2 className="comp-names" onClick={() => updateAndNavigate(item.id)} >{item.companyName}</h2>
                            </div>
                        </div>
                    )
                    }
                    </div>



                    <Modal show={show} >
                        <Modal.Header closeButton onClick={handleClose}>
                            <Modal.Title>Register Your Company</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Name of Company</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g Shifa Clinic"
                                        autoFocus
                                        ref={inputElem1}
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Since</Form.Label>
                                    <Form.Control
                                        type="date"
                                        autoFocus
                                        ref={inputElem2}
                                    />
                                    <br />
                                    <Form.Group controlId="formFileMultiple" className="mb-3">
                                        <Form.Label>Drop your certificates (images)</Form.Label>
                                        <Form.Control type="file" multiple ref={inputElemImg} />
                                    </Form.Group>


                                    <Form.Label>Opening Time</Form.Label>
                                    <Form.Control
                                        type="time"
                                        autoFocus
                                        ref={inputElem3}
                                    />

                                    <br />
                                    <Form.Label>Closing Time</Form.Label>
                                    <Form.Control
                                        type="time"
                                        autoFocus
                                        ref={inputElemClosing}
                                    />

                                    <br />
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        autoFocus
                                        ref={inputElem4}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={getCompanyData} >
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </>
    )
}


// function Tokens() {

//     // This function is for adding Token 

//     // const tokenLimit = useRef();
//     // const tokenTime = useRef();

//     // const addTokens = () => {
//     //     const tokenLimitVal = tokenLimit.current.value;
//     //     const tokenTimeVal = tokenTime.current.value;
//     //     console.log(tokenLimitVal);
//     //     console.log(tokenLimitVal)
//     //     addTokensToDb(tokenLimitVal, tokenTimeVal)
//     // }

//     return (
//         <div className="main-div-for-tokens" >
//             <Form>
//                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                     <Form.Label>No of Tokens</Form.Label>
//                     <Form.Control
//                         type="number"
//                         ref={tokenLimit}
//                     />

//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formBasicPassword">
//                     <Form.Label>Time for each token</Form.Label>
//                     <Form.Control type="text" ref={tokenTime} />
//                 </Form.Group>

//                 <Button variant="primary" onClick={addTokens}>
//                     Add tokens
//                 </Button>
//             </Form>
//         </div>
//     )
// }

export default Company;