import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import '../App.css';
import Leaderboard from "./Leaderboard";
import { useState, React, useEffect } from "react";
import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'

import CharMenu from "./CharMenu.js";


export default function Home(){
    
    const [localLeaderBoard, setLeaderBoard] = useState(0)

    useEffect(e=>{fireBaseRetrieve()},[])

    var firestore = firebase.firestore();
    let LinkLocation = firestore.doc('characterLocations/Link')

    async function fireBaseRetrieve() {
        const snapshot = await firebase.firestore().collection('leaderBoard').get()
        console.log(snapshot.docs)
        let retrievedBoard = snapshot.docs.map(doc => doc.data())
        let newBoard = retrievedBoard.sort((a,b)=>{
            console.log('ass')
            return a.time - b.time;
          })
        console.log(retrievedBoard,'retrieved')
        console.log(newBoard,'new')
        console.log(typeof(newBoard[0].time))

        setLeaderBoard(newBoard)
    }
    // function fireBaseUpdate(){
    //     leaderBoard.update({
    //         games:'cock'
    //     })
    // }
    return(
        <div>
            <p style={{textAlign:'center',color:'white',fontSize:'20px',backgroundColor:'black',border:'solid',borderColor:'grey',padding:'20px'}}> In this game, you left click on the locations of the characters presented to you (Link, C.Falcon, Mario Star) and choose the correct choice from the dropdown menu!
                Below is the leaderboard, try and complete the game fast enough to land a spot in the top 10! Press the "Play" tab to begin.
            </p>
            <h1 style={{textAlign:'center',color:'white',fontSize:'20px',paddingTop:'20px'}}>LEADERBOARD</h1>
            <hr/>
            <Leaderboard leaderBoard={localLeaderBoard} />
        </div>
    )
}
// okay ,perhaps we can loop over the leaderboard, pass the key value pairs to a row creating component within a table, and that will be like a map using a object for loop!?