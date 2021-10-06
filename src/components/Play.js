import '../App.css';
import StartScreen from "./startScreen";
import { useState, React, useEffect } from "react";
import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'
import CharMenu from "./CharMenu";
import pic from './pierre-roussel-n64phone.jpg'
import hms from './HMS.js'

export default function Play(props){
    const foundCharsObj = { 
        Link:false,
        captainFalcon:false,
        goldenStar: false
    }

    const [foundChars, setFoundChars] = useState(foundCharsObj)
    const [playing,setPlaying] = useState(false)
    const [show,setShow]=useState({display:'none'})
    const [mouseX,setMouseX] = useState(20)
    const [mouseY,setMouseY] = useState(20)
    const [won, setWon] = useState(false)
    const [winTime, setWinTime] = useState(0)
    const picStyle = {
        height:2800,
        margin: 'auto',
        width: '50%',
    }
    // a bunch of firestore stuff below. very epic.
    var firestore = firebase.firestore();
    let docRef = firestore.doc('users/Guest')
    if(props.user){
        docRef = firestore.doc(`users/${props.user.uid}`)
    }
    useEffect(()=>{
        firebase.app().auth().onAuthStateChanged((user)=>{
            setPlaying(false)
            setWon(false)
        }) 
     },[])
    // called everytime the game is started
    function Start(){
        
        setPlaying(true)

        docRef.set({
            startTime: Date.now()/1000
        }).then(()=>{

            
        })
    }

    function updateLeaderboard(userid,username,time){
        let newObj = {}
        newObj['name']= username
        newObj['time']=time
        firestore.collection("leaderBoard").doc(userid).set(newObj)
        .then(() => {
            console.log("Time sent to leaderboard!");
        })
        .catch((error) => {
            console.error("Error sending to leaderboard: ", error);
        });
    }


    function clickEvent(e) {
        // e = Mouse click event.
        // relative X and relative Y are  relative to the cursors position within the current window rectangle, taking scroll into account.
        //this is used for finding the location of the cursor and placing the menu
        var relativeX = e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        var relativeY = e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

      
        // below x/y is the ACTUAL position across all clients
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left; //x position within the element.
        var y = e.clientY - rect.top;  //y position within the element.
        // console.log("X : " + x + " | Y : " + y + ".");
        setMouseX(x);
        setMouseY(y);
        setShow({left:relativeX,top:relativeY,position:'absolute'})
      }

      function closeMenu(){
          setShow({display:'none'})
      }
      function checkLocation(char){
        let CharLocation = firestore.doc(`characterLocations/${char}`)
        let user = firestore.doc(`users/Guest`)
        if(props.user){ user = firestore.doc(`users/${props.user.uid}`)}

        let username = 'Guest';
        if(props.user){ username = props.user.displayName;}
            CharLocation.get().then(doc=>{
                if(doc && doc.exists){
                    const charData = doc.data();
                    
                    if(mouseX > charData.x1 && mouseX < charData.x2 ){
                        if(mouseY > charData.y1 && mouseY < charData.y2 ){

                            setFoundChars(prev=>{
                                prev[char]=true
                                return prev
                            })

                            // vvv --- checks if every character has been found
                           if(Object.entries(foundChars).every(e=>e[1]===true)){

                            user.get().then(doc=>{
                                if(doc && doc.exists){
                                    let userInfo = doc.data()
                                    let endTimeSeconds = Date.now()/1000-userInfo.startTime
                                    setWinTime(hms(endTimeSeconds))

                                    updateLeaderboard(userInfo.uid,username,endTimeSeconds)
                                    

                                }
                            })
                            setPlaying(false)
                            setWon(true)
                            setFoundChars(foundCharsObj)
                            document.body.scrollTop = 0; // For Safari
                            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                           }
                        }
                    }
                }
            })
          setShow({display:'none'})
      }



return(
        <div style={picStyle}>
        <p style={won?{color:'white',textAlign:'center'}:{display:'none'}}>Congratulations! You've found all the characters with a time of <x style={{color:'#54ff5a'}}>{winTime}</x>! </p>
        <p style={won?{color:'white',textAlign:'center'}:{display:'none'}}>Press Start to play again!</p>
        <CharMenu show={show} foundChars={foundChars} closeMenu={closeMenu} checkLocation={checkLocation}  left={mouseX} top={mouseY}/>
        {playing?<img style={{}}src={pic} alt="Pic" onClick={clickEvent} />:<StartScreen Start={Start}/>}
        
        </div>
    )
}