// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { setDoc, collection, addDoc, getFirestore, doc, onSnapshot } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import { goToHome } from "../Screen/LoginScreen";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAtKdSPIfkluAv8h0JoUj1DEABeQk49jQ",
  authDomain: "queue-app-21d22.firebaseapp.com",
  projectId: "queue-app-21d22",
  storageBucket: "queue-app-21d22.appspot.com",
  messagingSenderId: "316235758173",
  appId: "1:316235758173:web:179558ab7634ffeadfabb4",
  measurementId: "G-E2H4ZJ6JT7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const provider = new FacebookAuthProvider();

const auth = getAuth();

const db = getFirestore(app);

const storage = getStorage(app);

// const navigate = useNavigate();

// const storage = getStorage(app);

// function testing() {
//   const cityRef = doc(db, 'cities', 'BJ');
//   setDoc(cityRef, { capital: true }, { merge: true });
//   console.log("The Function runs successfully")
// }

// const signInWithFacebook = () => {

//   const theProvider = new FacebookAuthProvider();
//   const auth = getAuth();

//   signInWithPopup(auth, theProvider)
//     .then((result) => {
//       // The signed-in user info.
//       const user = result.user;
//       console.log("user", user);
//       const name = user.displayName;
//       const email = user.email;
//       const uid = user.uid;
//       addUserToDb(name, email, uid);
//       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//       const credential = FacebookAuthProvider.credentialFromResult(result);
//       const accessToken = credential.accessToken;
//       // goToHome()

//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = FacebookAuthProvider.credentialFromError(error);
//       console.log("error", error)

//       // ...
//     });

// }

// Image upload function

// async function uploadImage(image) {
//   const storageRef = ref(storage, `images/${image.name}`)
//   const snapshot = await uploadBytes(storageRef, image)
//   const url = await getDownloadURL(snapshot.ref)
//   return url;
// }


//Store user data in firestore
// const addUserToDb = (name, email, uid,) => {

//   return setDoc(doc(db, "users", uid), { email, name, });

// }



// const storeCompanyData = (companyName, since, time, address, imageUrl) => {

//   return addDoc(collection(db, "companyData"), { companyName, since, time, address, imageUrl });

// }



// function getRealtimeCompanyData(callback) {
//   //2
//    onSnapshot(collection(db, "companyData"), async (querySnapshot) => {
//     const companyData = [];

//     querySnapshot.forEach((doc) => {
//       companyData.push({ id: doc.id, ...doc.data() })
      
//     });

//     await callback(companyData);
//     // console.log("the data of company", companyData)
//     //3
//     // callback(companyData)
//   })
// }

// const addTokensToDb = (tokenLimitVal, tokenTimeVal) => {
//   const uid = auth.currentUser.uid;
//   console.log("id", uid);
//   return setDoc(doc(db, "companyData", uid ), { tokenLimitVal, tokenTimeVal });

// }


export {
  auth,
  app,
  db,
  storage,
  signInWithPopup,
  FacebookAuthProvider,

}