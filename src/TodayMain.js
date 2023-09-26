import React from "react";
import Data from "./Data";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { BACKEND_URL } from "./BACKEND_URL";
export default function TodayMain() {
    let weekday = new Date().getDay() - 1
    const [isDataa, setIsDataa] = React.useState(Data)
    const getData = () => {
        let urll = `${BACKEND_URL}/app/getdata/` + JSON.parse(localStorage.getItem('user_id')).data
        axios.get(urll).then(res => {
            setIsDataa(res.data)
        }).catch(err => console.log(err))
    }
    getData()
    function classDone(event) {
        const jugad = {
            user_id: JSON.parse(localStorage.getItem('user_id')).data,
            index: event.target.id
        }
        axios.post(`${BACKEND_URL}/app/addtaken`, jugad)
            .then(response => {
            })
            .catch(err => {
                console.log(err)
            })
    }
    function classunDone(event) {
        const jugad = {
            user_id: JSON.parse(localStorage.getItem('user_id')).data,
            index: event.target.id
        }
        axios.post(`${BACKEND_URL}/app/adduntaken`, jugad)
            .then(response => {
            })
            .catch(err => {
                console.log(err)
            })
    }
    const tt = [
        [7, 19, 0, 5, 6, 8, 10, 12, 17, 18, 20, 22],
        [9, 21, 1, 5, 7, 8, 10, 13, 17, 19, 20, 22],
        [6, 18, 2, 5, 7, 9, 11, 14, 17, 19, 21, 23],
        [8, 20, 3, 6, 7, 9, 11, 15, 18, 19, 21, 23],
        [5, 18, 4, 6, 8, 10, 11, 16, 18, 20, 22, 23]
    ]
    const timing = ["8.00-8.55", "8.00-8.55", "9.00-12.00", "9.00-9.55", "10.00-10.55", "11.00-11.55", "12.00-12.55", "2.00-5.00", "2.00-2.55", "3.00-3.55", "4.00-4.55", "5.00.5.55"]
    function renderClass() {
        let jj=-1;
        return tt[weekday].map((daata) => {
            jj++;
            return (
                isDataa[daata].slot !== "" &&
                <div className="class-taken" id={daata}>
                    <div className="subject-code">{isDataa[daata].slot.toUpperCase()}</div>
                    <p>{timing[jj]}</p>
                    {isDataa[daata].isAble === false && <div className="social-icon" >
                        <FontAwesomeIcon className="icons done" icon={faCheck} onClick={classDone} id={daata} value={isDataa[daata].slot.toUpperCase()} />
                    </div>}
                    {isDataa[daata].isAble === true && <div className="social-icon" >
                        <FontAwesomeIcon className="icons done doned" icon={faXmark} onClick={classunDone} id={daata} value={isDataa[daata].slot.toUpperCase()} />
                    </div>}
                </div>
            )
        })
    }
    function renderHoliday() {
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        return (
            <div>
                <h1 className="holiday">{weekday} {date}</h1>
                <div className="render-image-holiday">
                    <img src="./images/holiday.jpg" alt="Have A good day" className="images-holiday"></img>
                </div>
            </div>
        )
    }
    return (
        <div>
            {weekday === "6" || weekday === "-1" ? renderHoliday() : renderClass()}
        </div>)
}