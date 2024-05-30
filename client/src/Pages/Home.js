import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import image from '../Assets/Images/image1.jpg';
import logo from "../Assets/Images/logoSite.jpg";
import image1 from "../Assets/Images/image_ME.png";
import image2 from "../Assets/Images/onecs.jpg";
import image3 from "../Assets/Images/thilam.jpg";
import image4 from "../Assets/Images/Academie.png";
import image5 from "../Assets/Images/sacre coeur.jpg"
import image6 from "../Assets/Images/fortlamy.jpg";
import image7 from "../Assets/Images/hec.jpg";

import '../Assets/Styles/Home.css'
import '../App.css'
import ClassesList from '../Components/Class/ClassesList';
import { RiAccountCircleLine } from "react-icons/ri";
function Home() {
    const handleClose = () => {
        localStorage.removeItem("token")
        window.location = "/"
    }
    return (
        <>
            <Navbar className='navbar' bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home"> <img src={logo} alt="" id='logo' /> </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#Acueil">Acueil</Nav.Link>
                        <Nav.Link href="#Class">Classes</Nav.Link>
                        <Nav.Link href="#Statistiques">Statistiques</Nav.Link>
                        <Nav.Link id='deconnexion' onClick={handleClose} > <RiAccountCircleLine/> Se Deconnecter </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <div Id='Acueil' className='bloc1' >
                <div className=''>
                    <h2 > Bienvenue dans notre plateforme de e-learnig
                        on espère que vous trouverez les meilleurs cours et exercices pour vous 
                        entrainer  </h2>
                </div>
                <div>
                <img src={image} alt="Image d'accueil" />
                    <h3> Dans cette plateforme qui se veut être une </h3>
                </div>
            </div>

            {/* <!-- Section Statistiques --> */}
            <section href="#Statistiques" id="Statistiques">
                <h2>Statistiques: Quelques chiffres pour vous donnez
                    une aperçue de l'impact de notre plateforme </h2>
                <div className="Statistiques-grid">
                    <div className="stat-item">
                        <h3>Apprenants</h3>
                        <p>Nombre d'étudiants inscrits</p>
                    </div>
                    <div  className="stat-item">
                        <h3>Enseignants</h3>
                        <p>Nombre d'enseignants disponibles</p>
                    </div>
                    <div className="stat-item">
                        <h3>Cours</h3>
                        <p>Nombre total de cours disponibles</p>
                    </div>
                    
                </div>
                <button id='btn-statistiques'> Voir plus de details</button>
            </section>
            <div id='Class'><ClassesList/></div>
            {/* <!-- Section Partenaires --> */}
            <section id='Partenaires' className='partenaire'>
            <h2>Les différets écoles et institutions de l'état qui nous font confiance</h2>
                <div className='partenaire-content'>
                    
                    <div>
                        <img src={image1} alt="" />
                        <img src={image2} alt="" />
                        <img src={image5} alt="" />
                        <img src={image3} alt="" />
                        <img src={image4} alt="" />
                        <img src={image6} alt="" />
                        <img src={image7} alt="" />
                    </div>    
                </div>
            </section>
            {/* <!-- Footer --> */}
            <footer>
                <img id='logo-footer' src={logo} alt="" />
                <h2> chadedu La plateforme pour vous perfectionner</h2>
                <div className='footer'>
                    <div className="footer-info">
                        <p>Adresse: 200 Rue de la concorde, N'Djaména, Tchad</p>
                        <p>Téléphone: +235 66 66 00 01</p>
                        <p>Email: info@chadedu.td</p>
                    </div>
                    <div className="footer-links">
                        <a href="#">Conditions d'utilisation</a>
                        <a href="#">Politique de confidentialité</a>
                        {/* <!-- Ajouter d'autres liens de navigation si nécessaire --> */}
                    </div>

                    
                </div>
                <p>Copyright 2024 chadedu.td</p>    
            </footer>
            
        </>
    );
}

// export default OffcanvasExample;
export default Home;