import React from "react";
import TimeTableMain from "./TimeTableMain";
import AttendenceMain from "./AttendenceMain";
import TodayMain from "./TodayMain";
import { useEffect } from "react";
import { BASE_URL } from "./BASE_URL";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
export default function TimeTableNavbar() {
    const [isActive, setIsActive] = React.useState(1)
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('p'));
        if (items) {
            setIsActive(items);
        }
    }, []);
    function logout() {
        googleLogout();
        localStorage.clear()
        let url = BASE_URL;
        
        window.location.replace(url);
       
    }
    const tt = () => {
        localStorage.setItem("p", 1)
        setIsActive(1)
    }
    const td = () => {
        localStorage.setItem("p", 3)
        setIsActive(3)
    }
    const at = () => {
        localStorage.setItem("p", 2)
        setIsActive(2)
    }
    return (
        <div className="classs">
            <div className="navbar-button">
                <button className="slotted" onClick={logout}>Log Out</button>
            </div>
            <div className="timetablenavbar">
                <div className="navbar-home-button">
                     <button onClick={tt} className="timetable slotted" value="timetable" {...isActive === 1 && { style: { backgroundColor: 'white' } }}> TimeTable</button>
                    <button onClick={at} className="attendence slotted" value="attendence" {...isActive === 2 && { style: { backgroundColor: 'white' } }}>Attendence</button>
                    <button onClick={td} className="today slotted" value="today" {...isActive === 3 && { style: { backgroundColor: 'white' } }}>Today</button>
                </div>
                {isActive === 1 && <TimeTableMain />}
                {isActive === 2 && <AttendenceMain />}
                {isActive === 3 && <TodayMain />}
            </div>
        </div>
    )
}