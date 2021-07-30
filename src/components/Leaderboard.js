import '../App.css';

import hms from './HMS'
import { useState, React, useEffect } from "react";
import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'
export default function Leaderboard(props){
    var firestore = firebase.firestore();
    
    return(
        <div>
            
            <table className="container">
            <tr>
            <th>Position</th>
                <th>Name</th>
                <th>Time</th>
            </tr>
            {props.leaderBoard ===0?(<div class="lds-ring"><div></div><div></div><div></div><div></div></div>):props.leaderBoard.slice(0, 10).map((e,i)=>{return(
            <tr>
                <td>
                    {i===0?'🏅':null}{i===1 || i===2 ?'🎖':null}{i+1}
                </td>
                <td>
                    {e.name}
                </td>
                <td>
                    {hms(e.time)}
                </td>
            </tr>
            
        )})}
        </table>
        </div>

    )
}
{/* <table>
<tr>
    <th>Position</th>
    <th>Name</th>
    <th>Time</th>
</tr>
<tr>
    <td>1</td>
    <td>Smith</td>
    <td>33</td>
</tr>
<tr>
    <td>2</td>
    <td>Jackson</td>
    <td>44</td>
</tr>
</table>     */}