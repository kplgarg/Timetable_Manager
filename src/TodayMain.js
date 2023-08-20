import React from "react";
import TodayData from "./TodayData";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck ,faXmark } from '@fortawesome/free-solid-svg-icons';
import { BACKEND_URL } from "./BACKEND_URL";
export default function TodayMain() {
    let weekday = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][new Date().getDay()]
    const [isDataa, setIsDataa] = React.useState(TodayData)
    const getData = () => {
        let urll = `${BACKEND_URL}/app/getdataa/` + JSON.parse(localStorage.getItem('user_id')).data
        axios.get(urll).then(res => {
            setIsDataa(res.data)
        }).catch(err => console.log(err))
    }
    getData()
    const ress = {
        user_id: JSON.parse(localStorage.getItem('user_id')).data,
    }
    function reseter() {
        axios.post(`${BACKEND_URL}/app/reseter`, ress)
            .then(response => {
                console.log("reseted")
                //console.log("reseted")
            })
            .catch(err => {
                console.log(err)
            })

    }
    // reseter()
    setTimeout(reseter, 86400000)
    function classDone(event) {
        const jugad = {
            user_id: JSON.parse(localStorage.getItem('user_id')).data,
            slotname: event.target.id

        }
        axios.post(`${BACKEND_URL}/app/addtaken`, jugad)
            .then(response => {
                //getData()
            })
            .catch(err => {
                console.log(err)
            })
    }
    function classunDone(event) {
            const jugad = {
                user_id: JSON.parse(localStorage.getItem('user_id')).data,
                slotname: event.target.id

            }
            axios.post(`${BACKEND_URL}/app/adduntaken`, jugad)
                .then(response => {
                    //getData()
                })
                .catch(err => {
                    console.log(err)
                })
    }

    function renderClass() {
        return isDataa.map((daata) => {
            return (
                daata.slot !== "" &&
                <div className="class-taken" id={daata.slotname}>
                    <div className="subject-code">{daata.slot.toUpperCase()}</div>
                    <p>{daata.timing}</p>
                    {daata.isDisabled === "false" && <div className="social-icon" >
                        <FontAwesomeIcon className="icons done" icon={faCheck} onClick={classDone} id={daata.slotname} value={daata.slot.toUpperCase()}  />
                    </div>}
                    {daata.isDisabled === "true" && <div className="social-icon" >
                        <FontAwesomeIcon className="icons done doned" icon={faXmark} onClick={classunDone} id={daata.slotname} value={daata.slot.toUpperCase()} />
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
            {weekday === "SUNDAY" || weekday === "SATURDAY" ? renderHoliday() : renderClass()}
        </div>)
}