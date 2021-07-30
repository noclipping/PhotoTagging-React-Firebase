import { useState, React, useEffect } from "react";
import '../App.css';
import Link from './Link.png'
import Star from './goldenStar.png'
export default function CharMenu(props){

    const captainFalcon = 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Captain_Falcon_character_portrait.png/220px-Captain_Falcon_character_portrait.png'

    const [defaultStyle, setStyle] = useState({display:'none'})
    function handleLinkClick(character){
        props.checkLocation('Link')
    }
    function handleFalconClick(character){
        props.checkLocation('captainFalcon')
    }
    function handleStarClick(character){
        console.log(props.foundChars,'ass')
        props.checkLocation('goldenStar')
    }
    
    
    return(
        
        <div class="vertical-menu" style={props.show}>
            <a class="active" onClick={props.closeMenu} style={{cursor:'pointer'}}>Close</a>
            <a style={props.foundChars.Link?{display:'none'}:{cursor:'pointer'}} onClick={handleLinkClick}>Link<img alt='Link' style = {{height:'20px',width:'20px'}}src={Link}></img></a>
            <a style={props.foundChars.captainFalcon?{display:'none'}:{cursor:'pointer'}} onClick={handleFalconClick}>Captain Falcon <img alt='Falcon' style = {{height:'20px',width:'20px'}}src={captainFalcon}></img> </a>
            <a style={props.foundChars.goldenStar?{display:'none'}:{cursor:'pointer'}} onClick={handleStarClick}>Golden Star <img alt='Star' style = {{height:'20px',width:'20px'}}src={Star}></img></a>
        </div>
    )
}