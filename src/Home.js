import React from "react";
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import About from "./About"
import { useEffect } from "react";
export default function Home() {
    const [oldvalue, setOldvalue] = React.useState(true)
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('oldv'));
        if (items != null) {
            setOldvalue(items);
        }
    }, []);
    function toggle() {
        localStorage.setItem('isA', false)
        localStorage.setItem('oldv', !oldvalue)
        setOldvalue(oldvalue => !oldvalue)
        setIsAbout(false)
    }
    const [isAbout, setIsAbout] = React.useState(false)
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('isA'));
        if (items) {
            setIsAbout(items);
        }
    }, []);
    function toggleAbout() {
        localStorage.setItem('isA', !isAbout)
        setIsAbout(isAbout => !isAbout)
    }
    const [isHome, setIsHome] = React.useState(true)
    function toggleHome() {
        localStorage.setItem('isH', !isHome)
        setIsHome(isHome => !isHome)
    }
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('isH'));
        if (items != null) {
            setIsHome(items);
        }
    }, []);
    return (
        <div >
            <div className="navbar-button">
                <button className="slotted" onClick={toggle}>{oldvalue === false ? "Login" : "Signup"}</button>
                <button className="slotted" onClick={toggleAbout}>About</button>
            </div>
            <div className="main">
                {!isAbout && (oldvalue ? <LoginForm value={isHome} togglehome={toggleHome} /> : <SignupForm value={isHome} togglehome={toggleHome} />)}
                {isAbout && <About />}
            </div>
        </div>
    )
}