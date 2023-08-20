import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
export default function Card(props) {
    return (
        <div className="dev-card">
            <img src={`./images/${props.imgadd}`} alt={props.devname}
                className="developer"
            />
            <p className="developer-name">{props.devname}</p>
            <div className="social-icon">
                <a href={props.linkedin}>
                    <FontAwesomeIcon className="icons blue" icon={faLinkedin} />
                </a>
                <a href={`mailto:${props.emailid}`}>
                    <FontAwesomeIcon className="icons golden" icon={faEnvelope} />
                </a>
                <a href={`tel:+${props.phone}`}>
                    <FontAwesomeIcon className="icons blue" icon={faPhone} />
                </a>
            </div>
        </div>
    )
}