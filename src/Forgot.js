import React from "react";
import { useState } from "react";
import axios from "axios";
import validator from 'validator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { BACKEND_URL } from "./BACKEND_URL";
import { BASE_URL } from "./BASE_URL";
export default function Forgot(props) {
    const [user, setUser] = useState({
        email: "",
        otp: "",
        password: "",
        confirmpassword: ""
    })
    const [issend, setSend] = useState(false)

    let name, value;

    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }
    const [isflag, setIsflag] = useState(false)
    const postData = async (e) => {
        e.preventDefault();
        if (user.otp.length > 0) {
            let test1 = validate(user.confirmpassword)
            let test2 = validate(user.password)
            let test3 = (user.password === user.confirmpassword)
            if (test1 && test2 && test3) {
                axios.post(`${BACKEND_URL}/app/otpsend`, user)
                    .then(response => {
                        console.log("done")
                        window.alert("SUccessfully Changed")
                        window.location.replace(BASE_URL)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            else {
                window.alert("provide correct data")
            }
        }
        else if (issend === true && user.otp.length === 0) {
            window.alert("Provide OTP")
        }
        else {
            resendOTP(e)
        }


    }
    const resendOTP = (e) => {
        axios.post(`${BACKEND_URL}/app/sendotp`, user)
            .then(response => {
                console.log(response.data)
                if (response.data === "NODATA") {
                    setIsflag(true)
                } else {
                    setSend(true)
                    window.alert("OTP sended")
                }
            })
            .catch(err => {
                console.log(err)
            })
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

    const [eye, setEye] = useState({
        typing: "password",
        eyee: "false",
        ctyping: "password",
        ceyee: "false"
    })
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

    return (
        <div className="login-form main middle middy ">
            <form>
                <table >
                    <thead>
                        <tr>
                            <td>
                                <label htmlFor="email">Email:</label>
                            </td>
                            <td>
                                <input type="text" id="email" name="email" placeholder="abc123@.com" onChange={handleInput}
                                    value={user.email} />
                            </td>
                        </tr>

                    </thead>
                    {issend && <tbody>
                        <tr>
                            <td>
                                <label htmlFor="otp">OTP:</label>
                            </td>
                            <td>
                                <input type="text" id="otp" name="otp" placeholder="1234" onChange={handleInput}
                                    value={user.otp} />
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
                        <tr>
                            <td>
                                <label htmlFor="confirmpassword">Confirm Password</label>
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
                        <p className="resend" onClick={resendOTP}>Resend Otp</p>
                    </tbody>
                    }
                </table>
                {isflag && <p className="wrong">Incorrect Data!!</p>}
                <button type="submit" className="entry slotted resteer" onClick={postData}>Reset Password</button>
            </form>
            <a href="/" className="homee">Back to home</a>
        </div>
    )
}