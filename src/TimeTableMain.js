import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Data from "./Data";
import { BACKEND_URL } from "./BACKEND_URL";
export default function TimeTableMain() {
    const [isDataa, setIsDataa] = React.useState(Data)
    const [user, setUser] = useState({
        slot: "",
        index: "",
        user_id: JSON.parse(localStorage.getItem('user_id')).data
    })
    const p = {
        user_id: JSON.parse(localStorage.getItem('user_id')).data
    }
    let name, value;
    const handleInputChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }
    const [userr, setUserr] = useState({
        user_id: JSON.parse(localStorage.getItem('user_id')).data,
        index: ""
    })
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUserr({ ...userr, [name]: value });
    }
    useEffect(() => {
        let urll = `${BACKEND_URL}/app/getdata/` + JSON.parse(localStorage.getItem('user_id')).data
        const aaa = axios.get(urll)
        aaa.then(res => {
            setIsDataa(res.data)
        })
    }, []);
    const getData = () => {
        let urll = `${BACKEND_URL}/app/getdata/` + JSON.parse(localStorage.getItem('user_id')).data
        const aaa = axios.get(urll)
        aaa.then(res => {
            setIsDataa(res.data)
        })
    }
    const slotupdate = async (e) => {
        e.preventDefault();
        if (user.slot.length < 9 && user.slot.length > 0 && user.index != '') {
            axios.post(`${BACKEND_URL}/app/addslot`, user)
                .then(response => {
                    getData()
                })
                .catch(err => {
                    console.log(err)
                })
            setUser({ ...user, "slot": "", "index": "" })
        }
        else {
            setUser({ ...user, "slot": "" })
            window.alert("Provide Subject Code Name less than 8 letter")
        }
    }
    const slotdelete = async (e) => {
        e.preventDefault();
        if (userr.index != '') {
            axios.post(`${BACKEND_URL}/app/onedeleteslot`, userr)
                .then(response => {
                    getData()
                })
                .catch(err => {
                    console.log(err)
                })
            setUserr({ ...userr, "index": "" })
        }
    }
    const slotclear = async (e) => {
        e.preventDefault();
        axios.post(`${BACKEND_URL}/app/deleteslot`, p)
            .then(response => {
                getData()
            })
    }
    const tt = [
        [7, 19, 0, 5, 6, 8, 10, 12, 17, 18, 20, 22],
        [9, 21, 1, 5, 7, 8, 10, 13, 17, 19, 20, 22],
        [6, 18, 2, 5, 7, 9, 11, 14, 17, 19, 21, 23],
        [8, 20, 3, 6, 7, 9, 11, 15, 18, 19, 21, 23],
        [5, 18, 4, 6, 8, 10, 11, 16, 18, 20, 22, 23]
    ]
    const day = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]
    function helper(e) {
        return (
            <tr>
                <td id="dayOfWeek">{day[e]}</td>
                <td className="lecture" >{isDataa[tt[e][0]].slot === "" ? isDataa[tt[e][1]].slot : isDataa[tt[e][0]].slot}</td>
                <td className="lecture" >{isDataa[tt[e][2]].slot != "" ? isDataa[tt[e][2]].slot : isDataa[tt[e][3]].slot}</td>
                <td className="lecture" >{isDataa[tt[e][2]].slot != "" ? isDataa[tt[e][2]].slot : isDataa[tt[e][4]].slot}</td>
                <td className="lecture" >{isDataa[tt[e][2]].slot != "" ? isDataa[tt[e][2]].slot : isDataa[tt[e][5]].slot}</td>
                <td className="lecture" >{isDataa[tt[e][6]].slot}</td>
                <td className="lecture" >{isDataa[tt[e][7]].slot != "" ? isDataa[tt[e][7]].slot : isDataa[tt[e][8]].slot}</td>
                <td className="lecture" >{isDataa[tt[e][7]].slot != "" ? isDataa[tt[e][7]].slot : isDataa[tt[e][9]].slot}</td>
                <td className="lecture" >{isDataa[tt[e][7]].slot != "" ? isDataa[tt[e][7]].slot : isDataa[tt[e][10]].slot}</td>
                <td className="lecture" >{isDataa[tt[e][11]].slot}</td>
            </tr>
        )
    }
    return (
        <div>
            <div className="timetable-input jugad">
                <input placeholder="slotname" className="slotname" name="slot" onChange={handleInputChange} value={user.slot}></input>
                <select className="slotname" onChange={handleInputChange}
                    value={user.index} name="index">
                    <option value="">--</option>
                    <option value="5">A</option>
                    <option value="6">B</option>
                    <option value="7">C</option>
                    <option value="8">D</option>
                    <option value="9">E</option>
                    <option value="10">F</option>
                    <option value="11">G</option>
                    <option value="17">A1</option>
                    <option value="18">B1</option>
                    <option value="19">C1</option>
                    <option value="20">D1</option>
                    <option value="21">E1</option>
                    <option value="22">F1</option>
                    <option value="23">G1</option>
                    <option value="12">AL1</option>
                    <option value="13">AL2</option>
                    <option value="14">AL3</option>
                    <option value="15">AL4</option>
                    <option value="16">AL5</option>
                    <option value="0">ML1</option>
                    <option value="1">ML2</option>
                    <option value="2">ML3</option>
                    <option value="3">ML4</option>
                    <option value="4">ML5</option>
                </select>
                <button className="slotname slotted" onClick={slotupdate}>Add slot</button>
                <select className="slotname" onChange={handleInput}
                    value={userr.index} name="index">
                    <option value="">--</option>
                    <option value="5">A</option>
                    <option value="6">B</option>
                    <option value="7">C</option>
                    <option value="8">D</option>
                    <option value="9">E</option>
                    <option value="10">F</option>
                    <option value="11">G</option>
                    <option value="17">A1</option>
                    <option value="18">B1</option>
                    <option value="19">C1</option>
                    <option value="20">D1</option>
                    <option value="21">E1</option>
                    <option value="22">F1</option>
                    <option value="23">G1</option>
                    <option value="12">AL1</option>
                    <option value="13">AL2</option>
                    <option value="14">AL3</option>
                    <option value="15">AL4</option>
                    <option value="16">AL5</option>
                    <option value="0">ML1</option>
                    <option value="1">ML2</option>
                    <option value="2">ML3</option>
                    <option value="3">ML4</option>
                    <option value="4">ML5</option>
                </select>
                <button className="slotname slotted" onClick={slotdelete}>Delete slot</button>
                <button className="slotname slotted" onClick={slotclear}>Clear All</button>
            </div>
            <div className="table-center tablecolor">
                <table className="table">
                    <thead>
                        <tr className="colorheading">
                            <th>Day / Time</th>
                            <th>8:00 - 8:55</th>
                            <th>9:00 - 9:55</th>
                            <th>10:00 - 10:55</th>
                            <th>11:00 - 11:55</th>
                            <th>12:00 - 12:55</th>
                            <th>2:00 - 2:55</th>
                            <th>3:00 - 3:55</th>
                            <th>4:00 - 4:55</th>
                            <th>5:00 - 5:55</th>
                        </tr>
                    </thead>
                    <tbody>
                        {helper(0)}
                        {helper(1)}
                        {helper(2)}
                        {helper(3)}
                        {helper(4)}
                    </tbody>
                </table>
            </div>

        </div>
    )
}