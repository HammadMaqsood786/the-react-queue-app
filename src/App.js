
// import './App.css';
import { LoginPage } from './Screen/LoginScreen';
import { Home } from "./Screen/HomeScreen"
import { signInWithFacebook } from "./config/firebase.js";
import { useState } from 'react';
import Router from './config/router';
import store from './store'
import { Provider } from 'react-redux'

function App() {

  return (

    <>
      <Provider store={store} >
        <Router />
      </Provider>
    </>
  );
}

export default App;
