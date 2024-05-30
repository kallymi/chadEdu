// src/components/Navbar.js
import React from 'react';
import './nav.css';
import logo1 from '../Assets/Images/logoSite.jpg';
const Navbar = () => {
    
    return (
        <nav className="navbar">
            <div className="navbar-brand"> <img src={logo1} alt="" /> </div>
            <ul className="navbar-links">
                <li><a href="/home" >Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="/">Se Déconnecter</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;