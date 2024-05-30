// src/components/Navbar.js
import React from 'react';
import './navbar.css';
import logo1 from '../../Assets/Images/logoSite.jpg';

const NavbarAuth = () => {
    
    return (
        <div className='principalNav'>
            <nav className="navbar">
                <div className="navbar-brand"> <img src={logo1} alt="" /> </div>
                <ul className="navbar-links">
                    <li><a href="/signup">S'Inscrire</a></li>
                    <li><a href="/">Se conneter</a></li>
                </ul>
                
            </nav>
            <div className='text-detail'>
                    <h2>Merci de vous authentifier.</h2>
                    <p> authentifiez vous vous pour accèder à votre plateforme de e-learning avec Chadedu pour continuer votre meilleure experience.</p>
            </div>
        </div>
    );
};

export default NavbarAuth;