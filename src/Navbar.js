import React, { useEffect, useState } from 'react'
import './Navbar.css'

function Navbar() {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            }
            else {
                handleShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll");
        }

    }, [])

    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img className="nav_logo"
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Netflix logo" />
            <img className="nav_avatar"
                src="https://placeimg.com/640/480/any"
                alt="Acc logo" />
        </div>
    )
}

export default Navbar
