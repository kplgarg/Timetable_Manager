import React from "react";
import Card from "./Card";
export default function About(){
    return(
        <div className="about">
        <p className="about-heading">WELCOME TO TIMETABLE MANAGER</p>
        <p className="main-heading">IITG SLOT SYSTEM</p>
        <p className="about-paragraph">The idea was originally conceived due to the slot system here at IITG. There are slots A, A1, B etc which have their pre-assigned days and times set in the common timetable. Instructors simply announce their respective slots and the entire timetable for a course gets generated therein. Due to this neat arrangement, scheduling assistant allows the users to easily create their academic schedule and also maintain attendance record.</p>
        <p className="main-heading">ABOUT DEVELOPERS</p>
        <p className="about-paragraph">We are a group of students studying Civil Engineering at Indian Institute of technology, Guwahati. This project has been created with an intention of using a database management system tool along with React to build something that is of actual utility and importance to the user (Our fellow students).</p>
        <div className="social-follows">
        <div className="cards">
        <Card
        imgadd="kapil_garg.jpg"
        devname="KAPIL GARG"
        linkedin="https://www.linkedin.com/in/kapil6530/"
        emailid="gargkapill2001@gmail.com"
        phone="9772724435"
        />
        </div>
        <div className="cards">
        <Card
        imgadd="sanyam_jhang.jpg"
        devname="SANYAM JHANG"
        linkedin="https://www.linkedin.com/in/sanyamjhang9"
        emailid="sanyamjhang9@gmail.com"
        phone="8949977439"
        />
        </div>
        </div>
        </div>
    )
}