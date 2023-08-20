import React from "react";
import { Routes, Route } from "react-router-dom"
import Home from "./Home";
import TimeTable from "./TimeTable"
import Forgot from "./Forgot";
export default function App() {
    return (
        <main>
        <Routes>
            <Route path="/" element={<Home/>} exact />
            <Route path="/timetable" element={<TimeTable/>} />
            <Route path="/forgot" element={<Forgot/>} />
        </Routes>
        </main>
    )
}