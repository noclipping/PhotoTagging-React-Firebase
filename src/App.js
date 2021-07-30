import { React, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'
import Nav from "./components/NavBar";
import Home from './components/Home'
import Play from './components/Play'


const config = {
  apiKey: "AIzaSyDniQaOioilx0ELmIbx4j5cWx59EQAws_4",
  authDomain: "wheres-waldo-5c012.firebaseapp.com",
  projectId: "wheres-waldo-5c012",
  storageBucket: "wheres-waldo-5c012.appspot.com",
  messagingSenderId: "651022757732",
  appId: "1:651022757732:web:8e760ebcfc61e8a7b4d471"
};
firebase.initializeApp(config);
function App() {

  const firestore = firebase.firestore();

  const [currentUser, setCurrentUser] = useState()
  const [signedIn, setSignedIn] = useState(false)
  useEffect(()=>{

   const signInStatus = JSON.parse(localStorage.getItem("signInStatus"));
   firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user)
      console.log('a user is signed in', user)
    } else {
      setCurrentUser(user)
      console.log('no user is signed in')
    }
  });
  },[])
  function upperUserFunc(){
    console.log('FUCK')
  }
  return (
    <div className="App">
    <Router>
      
      <Nav user={firebase.auth().currentUser}/>
      <Switch>
        <Route exact path="/" render={(props) => <Home />}/>
      </Switch>
      <Switch>
        <Route exact path="/play" render={(props)=>(<Play {...props} user = {currentUser}upperUserFunc={upperUserFunc}/>)}/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
