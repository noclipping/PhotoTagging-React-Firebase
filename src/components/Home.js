
import '../App.css';
import Leaderboard from "./Leaderboard";
import { useState, React, useEffect } from "react";
import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'




export default function Home(){
    
    const [localLeaderBoard, setLeaderBoard] = useState(0)

    useEffect(e=>{fireBaseRetrieve()},[])


    async function fireBaseRetrieve() {
        const snapshot = await firebase.firestore().collection('leaderBoard').get()
        let retrievedBoard = snapshot.docs.map(doc => doc.data())
        let newBoard = retrievedBoard.sort((a,b)=>{
            return a.time - b.time;
          })

        setLeaderBoard(newBoard)
    }

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
