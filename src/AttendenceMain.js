import React from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { BACKEND_URL } from "./BACKEND_URL";
export default function AttendenceMain() {
    let urll = `${BACKEND_URL}/app/getdata/` + JSON.parse(localStorage.getItem('user_id')).data
    const [code, setCode] = useState([])
    const [percent, setPercent] = useState([])
    useEffect(() => {
        const newcode = [];
        const newpercent = []
        const getData = async () => {
            const aaa = await axios.get(urll)
            const bbb = await aaa.data
            for (let i = 0; i < bbb.length; i++) {
                if (bbb[i].slot !== "") {
                    newcode.push(bbb[i].slot);
                    newpercent.push(Math.floor(100 * (bbb[i].classAttend / bbb[i].classTotal)))
                }
            }
            setCode(newcode)
            setPercent(newpercent)
        }
        getData()
    }, [])
    return (
        <div className='attandance'>
            <div className="container-fluid mb-5">
                <Chart
                    type="bar"
                    width={1200}
                    height={640}
                    series={[
                        {
                            name: "Percentage Class Attend",
                            data: percent,

                        },
                    ]}

                    options={{
                        colors: ['#ff1c1c', '#FFB399', '#3dfce3', '#fd70ff', '#00B3E6', '#E6B333', '#3366E6', '#00ff2f', '#99FF99', '#B34D4D', '#80B300', '#E6B3B3', '#ff9d0a', '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC'],

                        theme: { mode: "light" },
                        xaxis: {
                            tickPlacement: "on",
                            categories: code,
                            title: {
                                position: 'bottom',
                                text: "Course Name/Code",
                                style: { color: "Black", fontSize: 25 },
                            },
                            labels: {
                                show: true,
                                rotate: -45,
                                rotateAlways: true,
                                minHeight: 100,
                                maxHeight: 180,
                                formatter: (val) => {
                                    return `${val}`;
                                },
                                style: { fontSize: "18", colors: ["000000"] },
                            },

                        },

                        yaxis: {
                            min: 0,
                            max: 100,
                            labels: {
                                formatter: (val) => {
                                    return `${val}`;
                                },
                                style: { fontSize: "15", colors: ["blue"] },
                            },
                            title: {
                                text: "Percentage",
                                style: { color: "Black", fontSize: 15 },
                            },
                        },
                        legend: {
                            show: false
                        },
                        dataLabels: {
                            formatter: (val) => {
                                return `${val}`;
                            },
                            style: {
                                colors: ["red"],
                                fontSize: 15,
                            },

                        },
                        plotOptions: {
                            bar: {
                                distributed: true
                            }
                        },
                        chart: {
                            toolbar: {
                                show: false
                            },
                            width: '100%'


                        },


                    }}
                ></Chart>
            </div>
        </div>
    )
}
