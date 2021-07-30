
import '../App.css';

import { useState, React, useEffect } from "react";
import firebase from "firebase";
import Link from './Link.png'
import goldenStar from './goldenStar.png'
import 'firebase/firestore'
import 'firebase/auth'
import '../App.css'

export default function StartScreen(props){

    const imageStyles={
        width:200,
        height:200,
    }
    const centering={
        textAlign:'center',
        margin: 'auto',
        border: '3px solid white',
        padding: '10px',
        backgroundColor:'black'
      }
    const captainFalcon = 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Captain_Falcon_character_portrait.png/220px-Captain_Falcon_character_portrait.png'

    
    return(
        <div style={centering}>
            <img img alt='Link'style={imageStyles} src={Link}/>
            <img img alt='Falcon'style={imageStyles} src={captainFalcon}/>
            <img img alt='Star'style={imageStyles} src={goldenStar}/>
            <p style={{color:'white'}}>FIND THESE CHARACTERS!</p>
            <br/>
            <button style={{justifyContent:'center'}} className='startButton' onClick={props.Start}>START</button>
        </div>
    )
}