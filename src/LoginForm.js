import React from "react";
import { useState } from "react";
import axios from "axios";
import validator from 'validator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { BACKEND_URL } from "./BACKEND_URL";
import { BASE_URL } from "./BASE_URL";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin} from '@react-oauth/google';
import jwt_decode from "jwt-decode";
export default function LoginForm(props) {
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [isflag, setIsflag] = useState(false)
    let name, value;

    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }
    const validate = (value) => {

        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            return true
        } else {
            return false
        }
    }
    const postData = async (e) => {
        e.preventDefault();
        // const reg = '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/';
        let test1 = validate(user.password);
        let test3 = validator.isEmail(user.email);
        if (test1 && test3) {
            axios.post(`${BACKEND_URL}/app/login`, user)
                .then(response => {
                    let url = BASE_URL;
                    if (!response.data) {
                        setIsflag(true)
                        window.location.replace(url)
                    }
                    else {
                        localStorage.setItem('user_id', JSON.stringify(response))
                        window.location.replace(url + '/timetable')
                    }
                })
            setUser({
                email: "",
                password: "",
            })
        }
        else {
            setIsflag(true)
        }
    }
    const postData1 = async (e) => {
            axios.post(`${BACKEND_URL}/app/logingoogle`, e)
                .then(response => {
                    let url = BASE_URL;
                    if (!response.data) {
                        setIsflag(true)
                        window.location.replace(url)
                    }
                    else {
                        localStorage.setItem('user_id', JSON.stringify(response))
                        window.location.replace(url + '/timetable')
                    }
                })
    }
    const [eye, setEye] = useState({
        typing: "password",
        eyee: "false"
    })
    const handleEye = (e) => {
        const kya = e.currentTarget.getAttribute("id");
        if (kya === "true") {
            setEye({ typing: "text", eyee: "true" })
            function defaa() {
                setEye({ typing: "password", eyee: "false" })
                clearTimeout()
            }
            setTimeout(defaa, 1000)
        }
        else {
            setEye({ typing: "password", eyee: "false" })
        }
    }
    const handlesocial = (e) => {
        const searchurl = e.currentTarget.getAttribute("id");
        window.open(`${BASE_URL}/auth${searchurl}`, "_self")
    }
    const Forgotten = (e) => {
        window.location.replace('/forgot')
    }
    return (
        <div className="outer">
            <div className="left">
                    <GoogleOAuthProvider
                    clientId="593765057771-4a0pga9vl18hd345egc48tbmp4lchft3.apps.googleusercontent.com">
        <GoogleLogin
            onSuccess={credentialResponse => {
                var decoded = jwt_decode(credentialResponse.credential);
                postData1(decoded);
            console.log(decoded);
        }}
        onError={() => {
            console.log('Login Failed');
        }}
        theme="filled_blue"
        size="medium"
        // text="signup_with"
        shape="circle"
        logo_alignment= "center"
        /></GoogleOAuthProvider>
            </div>
            <div className="middle">
                <div className="line"></div>
                <div className="or">OR</div>
            </div>
            <div className="login-form">
                <form>
                    <table >
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="email">Email:</label>
                                </td>
                                <td>
                                    <input type="text" id="email" name="email" placeholder="abc123@.com" onChange={handleInput}
                                        value={user.email} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="password">Password:</label>
                                </td>
                                <td>
                                    <input
                                        type={eye.typing} id="password" name="password" placeholder="Password" onChange={handleInput}
                                        value={user.password} autoComplete="on" />
                                    {eye.eyee === "false" && <div className="eye" id="true" onClick={handleEye}>
                                        <FontAwesomeIcon icon={faEye} className="eyes" />
                                    </div>}
                                    {eye.eyee === "true" && <div className="eye" id="false" onClick={handleEye} >
                                        <FontAwesomeIcon icon={faEyeSlash} className="eyes" />
                                    </div>}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {isflag && <p className="wrong">Incorrect Data!!</p>}
                    <div className="forgot" onClick={Forgotten}>Forgot Password?</div>
                    <button type="submit" className="entry slotted" onClick={postData}>Login</button>
                </form>
            </div>
        </div>
    )
}