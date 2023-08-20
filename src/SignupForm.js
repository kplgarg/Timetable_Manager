import React from "react";
import { useState } from "react";
import axios from "axios";
import validator from 'validator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { BACKEND_URL } from "./BACKEND_URL";
import { BASE_URL } from "./BASE_URL";
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
export default function SignupForm(props) {
    const [isflag, setIsflag] = useState(false)
    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmpassword: "",
    })
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
        let test2 = validate(user.confirmpassword);
        let test3 = validator.isEmail(user.email);
        if (test1 && test2 && test3) {
            axios.post(`${BACKEND_URL}/app/signup`, user)
                .then(response => {
                    let url1 = BASE_URL;
                    let url = url1 + '/timetable';
                    // console.log(response.data)
                    if (response.data === 123) {
                        setIsflag(true)
                        //window.alert("Please provide correct data!!")
                        window.location.replace(url1)
                    }
                    else if (response.data === 124) {
                        window.alert("You have already account!!")
                        window.location.replace(url1)
                    }
                    else {
                        localStorage.setItem('user_id', JSON.stringify(response))
                        window.location.replace(url)
                    }
                })


            setUser({
                fname: "",
                lname: "",
                email: "",
                password: "",
                confirmpassword: "",
            }
            )
        }
        else {
            setIsflag(true)
            //window.alert("Provide Correct Data")
        }
    }
    const [eye, setEye] = useState({
        typing: "password",
        eyee: "false",
        ctyping: "password",
        ceyee: "false"
    })
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
    const handleEye = (e) => {
        const kya = e.currentTarget.getAttribute("id");
        if (kya === "true") {
            setEye({ ...eye, typing: "text", eyee: "true" })
            function defaa() {
                setEye({ ...eye, typing: "password", eyee: "false" })
                clearTimeout()
            }
            setTimeout(defaa, 1000)

        }
        else if (kya === "false") {
            setEye({ ...eye, typing: "password", eyee: "false" })
        } else if (kya === "ctrue") {
            setEye({ ...eye, ctyping: "text", ceyee: "true" })
            function defaa() {
                setEye({ ...eye, ctyping: "password", ceyee: "false" })
                clearTimeout()
            }
            setTimeout(defaa, 1000)
        }
        else if (kya === "cfalse") {
            setEye({ ...eye, ctyping: "password", ceyee: "false" })
        }
    }
    const handlesocial = (e) => {
        const searchurl = e.currentTarget.getAttribute("id");
        window.open(`${BASE_URL}/auth${searchurl}`, "_self")
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
                            // console.log(decoded);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        theme="filled_blue"
                        size="medium"
                        text="signup_with"
                        shape="circle"
                        logo_alignment="center"
                    /></GoogleOAuthProvider>

            </div>

            <div className="middle">
                <div className="line"></div>
                <div className="or">OR</div>
            </div>
            <div className="login-form right">
                <form >
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="fname">First name:</label>
                                </td>
                                <td>
                                    <input type="text" id="fname" name="fname" placeholder="First Name" onChange={handleInput}
                                        value={user.fname} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="lname">Last Name:</label></td>
                                <td>
                                    <input type="text" id="lname" name="lname" placeholder="Last Name" onChange={handleInput}
                                        value={user.lname} />
                                </td>
                            </tr>
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
                                    <input type={eye.typing} id="password" name="password" placeholder="Password" onChange={handleInput}
                                        value={user.password} autoComplete="on" />
                                    {eye.eyee === "false" && <div className="eye" id="true" onClick={handleEye}>
                                        <FontAwesomeIcon icon={faEye} className="eyes" />
                                    </div>}
                                    {eye.eyee === "true" && <div className="eye" id="false" onClick={handleEye} >
                                        <FontAwesomeIcon icon={faEyeSlash} className="eyes" />
                                    </div>}
                                </td>

                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="confirmpassword">Confirm Password:</label>
                                </td>
                                <td>
                                    <input type={eye.ctyping} id="confirmpassword" name="confirmpassword" placeholder="Confirm Password" onChange={handleInput}
                                        value={user.confirmpassword} autoComplete="on" />
                                    {eye.ceyee === "false" && <div className="eye" id="ctrue" onClick={handleEye}>
                                        <FontAwesomeIcon icon={faEye} className="eyes" />
                                    </div>}
                                    {eye.ceyee === "true" && <div className="eye" id="cfalse" onClick={handleEye} >
                                        <FontAwesomeIcon icon={faEyeSlash} className="eyes" />
                                    </div>}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {isflag && <p className="wrong">Please Provide Correct Data!!</p>}
                    <button type="submit" className="entry slotted" onClick={postData} >Signup</button>
                </form>
            </div>
        </div>
    )
}