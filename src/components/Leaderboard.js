import '../App.css';

import hms from './HMS'
import {React} from "react";

import 'firebase/firestore'
import 'firebase/auth'
export default function Leaderboard(props){

    
    return(
        <div>
            
            <table className="container">
            <tr>
            <th>Position</th>
                <th>Name</th>
                <th>Time</th>
            </tr>
            {props.leaderBoard ===0?(<div className="lds-ring"><div></div><div></div><div></div><div></div></div>):props.leaderBoard.slice(0, 10).map((e,i)=>{return(
            <tr key={i}>
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