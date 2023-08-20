import React from "react";
import axios from "axios";
import { useState , useEffect } from "react";
import Data from "./Data";
import { BACKEND_URL } from "./BACKEND_URL";
export default function TimeTableMain() {
    const [isDataa, setIsDataa] = React.useState(Data)
    const [user, setUser] = useState({
        slot: "",
        slotname: "",
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
        slotname: ""
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
        if (user.slot.length < 9 && user.slot.length > 0) {
            axios.post(`${BACKEND_URL}/app/addslot`, user)
                .then(response => {
                    getData()
                })
                .catch(err => {
                    console.log(err)
                })
            setUser({ ...user, "slot": "", "slotname": "" })
        }
        else {
            setUser({ ...user, "slot": "" })
            window.alert("Provide Subject Code Name less than 8 letter")
        }
    }
    const slotdelete = async (e) => {
        e.preventDefault();
        axios.post(`${BACKEND_URL}/app/onedeleteslot`, userr)
            .then(response => {
                getData()
            })
            .catch(err => {
                console.log(err)
            })
        setUserr({ ...userr, "slotname": "" })
    }
    const slotclear = async (e) => {
        e.preventDefault();
        axios.post(`${BACKEND_URL}/app/deleteslot`, p)
            .then(response => {
                getData()
            })
    }

    return (
        <div>
            <div className="timetable-input jugad">
                <input placeholder="slotname" className="slotname" name="slot" onChange={handleInputChange} value={user.slot}></input>
                <select className="slotname" onChange={handleInputChange}
                    value={user.slotname} name="slotname">
                    <option value="">--</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                    <option value="A1">A1</option>
                    <option value="B1">B1</option>
                    <option value="C1">C1</option>
                    <option value="D1">D1</option>
                    <option value="E1">E1</option>
                    <option value="F1">F1</option>
                    <option value="G1">G1</option>
                    <option value="AL1">AL1</option>
                    <option value="AL2">AL2</option>
                    <option value="AL3">AL3</option>
                    <option value="AL4">AL4</option>
                    <option value="AL5">AL5</option>
                    <option value="ML1">ML1</option>
                    <option value="ML2">ML2</option>
                    <option value="ML3">ML3</option>
                    <option value="ML4">ML4</option>
                    <option value="ML5">ML5</option>
                </select>
                <button className="slotname slotted" onClick={slotupdate}>Add slot</button>
                <select className="slotname" onChange={handleInput}
                    value={userr.slotname} name="slotname">
                    <option value="">--</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                    <option value="A1">A1</option>
                    <option value="B1">B1</option>
                    <option value="C1">C1</option>
                    <option value="D1">D1</option>
                    <option value="E1">E1</option>
                    <option value="F1">F1</option>
                    <option value="G1">G1</option>
                    <option value="AL1">AL1</option>
                    <option value="AL2">AL2</option>
                    <option value="AL3">AL3</option>
                    <option value="AL4">AL4</option>
                    <option value="AL5">AL5</option>
                    <option value="ML1">ML1</option>
                    <option value="ML2">ML2</option>
                    <option value="ML3">ML3</option>
                    <option value="ML4">ML4</option>
                    <option value="ML5">ML5</option>
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
                        <tr>
                            <td id="dayOfWeek">Monday</td>
                            <td id="CT" className="lecture" >{isDataa[2].slot === "" ? isDataa[9].slot : isDataa[2].slot}</td>
                            <td id="A" className="lecture" >{isDataa[0].slot === "" ? isDataa[14].slot : isDataa[0].slot}</td>
                            <td id="B" className="lecture" >{isDataa[1].slot === "" ? isDataa[14].slot : isDataa[1].slot}</td>
                            <td id="D" className="lecture" >{isDataa[3].slot === "" ? isDataa[14].slot : isDataa[3].slot}</td>
                            <td id="F" className="lecture" >{isDataa[5].slot}</td>
                            <td id="A1" className="lecture">{isDataa[7].slot === "" ? isDataa[19].slot : isDataa[7].slot}</td>
                            <td id="B1" className="lecture">{isDataa[8].slot === "" ? isDataa[19].slot : isDataa[8].slot}</td>
                            <td id="D1" className="lecture">{isDataa[10].slot === "" ? isDataa[19].slot : isDataa[10].slot}</td>
                            <td id="F1" className="lecture">{isDataa[12].slot}</td>
                        </tr>
                        <tr>
                            <td id="dayOfWeek">Tueday</td>
                            <td id="ET" className="lecture">{isDataa[4].slot === "" ? isDataa[11].slot : isDataa[4].slot}</td>
                            <td id="A" className="lecture">{isDataa[0].slot === "" ? isDataa[15].slot : isDataa[0].slot}</td>
                            <td id="C" className="lecture">{isDataa[2].slot === "" ? isDataa[15].slot : isDataa[2].slot}</td>
                            <td id="D" className="lecture">{isDataa[3].slot === "" ? isDataa[15].slot : isDataa[3].slot}</td>
                            <td id="F" className="lecture">{isDataa[5].slot}</td>
                            <td id="A1" className="lecture">{isDataa[7].slot === "" ? isDataa[20].slot : isDataa[7].slot}</td>
                            <td id="C1" className="lecture">{isDataa[9].slot === "" ? isDataa[20].slot : isDataa[9].slot}</td>
                            <td id="D1" className="lecture">{isDataa[10].slot === "" ? isDataa[20].slot : isDataa[10].slot}</td>
                            <td id="F1" className="lecture">{isDataa[12].slot}</td>
                        </tr>
                        <tr>
                            <td id="dayOfWeek">Wednesday</td>
                            <td id="BT" className="lecture">{isDataa[1].slot === "" ? isDataa[8].slot : isDataa[1].slot}</td>
                            <td id="A" className="lecture">{isDataa[0].slot === "" ? isDataa[16].slot : isDataa[0].slot}</td>
                            <td id="C" className="lecture">{isDataa[2].slot === "" ? isDataa[16].slot : isDataa[2].slot}</td>
                            <td id="E" className="lecture">{isDataa[4].slot === "" ? isDataa[16].slot : isDataa[4].slot}</td>
                            <td id="G" className="lecture">{isDataa[6].slot}</td>
                            <td id="A1" className="lecture">{isDataa[7].slot === "" ? isDataa[21].slot : isDataa[7].slot}</td>
                            <td id="C1" className="lecture">{isDataa[9].slot === "" ? isDataa[21].slot : isDataa[9].slot}</td>
                            <td id="E1" className="lecture">{isDataa[11].slot === "" ? isDataa[21].slot : isDataa[11].slot}</td>
                            <td id="G1" className="lecture">{isDataa[13].slot}</td>
                        </tr>
                        <tr>
                            <td id="dayOfWeek">Thursday</td>
                            <td id="DT" className="lecture">{isDataa[3].slot === "" ? isDataa[10].slot : isDataa[3].slot}</td>
                            <td id="B" className="lecture">{isDataa[1].slot === "" ? isDataa[17].slot : isDataa[1].slot}</td>
                            <td id="C" className="lecture">{isDataa[2].slot === "" ? isDataa[17].slot : isDataa[2].slot}</td>
                            <td id="E" className="lecture">{isDataa[4].slot === "" ? isDataa[17].slot : isDataa[4].slot}</td>
                            <td id="G" className="lecture">{isDataa[6].slot}</td>
                            <td id="B1" className="lecture">{isDataa[8].slot === "" ? isDataa[22].slot : isDataa[8].slot}</td>
                            <td id="C1" className="lecture">{isDataa[9].slot === "" ? isDataa[22].slot : isDataa[9].slot}</td>
                            <td id="E1" className="lecture">{isDataa[11].slot === "" ? isDataa[22].slot : isDataa[11].slot}</td>
                            <td id="G1" className="lecture">{isDataa[13].slot}</td>
                        </tr>
                        <tr>
                            <td id="dayOfWeek">Friday</td>
                            <td id="AT" className="lecture">{isDataa[0].slot === "" ? isDataa[7].slot : isDataa[0].slot}</td>
                            <td id="B" className="lecture">{isDataa[1].slot === "" ? isDataa[18].slot : isDataa[1].slot}</td>
                            <td id="D" className="lecture">{isDataa[3].slot === "" ? isDataa[18].slot : isDataa[3].slot}</td>
                            <td id="F" className="lecture">{isDataa[5].slot === "" ? isDataa[18].slot : isDataa[5].slot}</td>
                            <td id="G" className="lecture">{isDataa[6].slot}</td>
                            <td id="B1" className="lecture">{isDataa[8].slot === "" ? isDataa[23].slot : isDataa[8].slot}</td>
                            <td id="D1" className="lecture">{isDataa[10].slot === "" ? isDataa[23].slot : isDataa[10].slot}</td>
                            <td id="F1" className="lecture">{isDataa[12].slot === "" ? isDataa[23].slot : isDataa[12].slot}</td>
                            <td id="G1" className="lecture">{isDataa[13].slot}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}