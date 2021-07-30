import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import '../App.css';

import { useState, React, useEffect } from "react";
import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'


export default function Nav(props) {

  const [currentUser, setCurrentUser] = useState()

    const defaultPic='https://images.unsplash.com/photo-1583487554710-4e733a880266?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=705&q=80'
      const provider = new firebase.auth.GoogleAuthProvider()
    useEffect(()=>{
       firebase.app().auth().onAuthStateChanged((user)=>{
           setCurrentUser(user);
       }) 
    },[])
    const authWithGoogle = () => {
        firebase.auth().signInWithPopup(provider).then(result=>{
            let user = result.user;
            console.log(user)
        }).catch(e=>{return 'Error with authenticating google',e })
    }
    const signOut= () =>{
        firebase.app().auth().signOut().then(result=>{
      
            console.log(result)
        }).catch(
            console.log('Signout unsuccessful')
        )
    }

    const buttonStyle = {
      display:"block",
    float:"right",
    backgroundColor: 'green',
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    cursor:'pointer'
  }
  return (
    <ul className="topnav">
      <Link to="/PhotoTagging-React-Firebase/">
        <li style={{position:'absolute',left:20,top:20,fontSize:'30px', padding:'0', margin:'0'}}>🕵</li>
      </Link>
      
      <Link to="/PhotoTagging-React-Firebase/">
        <li>Home</li>
      </Link>
      
      <Link to="/PhotoTagging-React-Firebase/play">
        <li>Play</li>
      </Link>
      
      <li style={{color:'white',float:'right'}}>{props.user?props.user.displayName:'Guest'} </li>
      <img style={{width:50,height:50,display:'block',float:'right'}}src={props.user?props.user.photoURL:defaultPic} alt="user pic"/>
      {props.user?<button style={{...buttonStyle, backgroundColor:'darkred'}} onClick={signOut}>Signout</button>:<button style={buttonStyle} onClick ={authWithGoogle}>Login</button>}
      
    </ul>
  );
}
