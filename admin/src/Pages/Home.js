
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiAccountCircleLine } from "react-icons/ri";
import image from '../Assets/Images/logo.jpg'
import '../Assets/Styles/style-home.css'
import axios from 'axios';

function Dashboard() {
    // const [userCount, setUserCount] = useState(0);
    // const [classCount, setClassCount] = useState(0);

    const [userCount, setUserCount] = useState(0);
    const[classCount, setClassCount]= useState(0);
    const[programCount, setProgramCount]= useState(0);
    const[courseCount, setCourseCount]= useState(0);
    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/count');
                setUserCount(response.data.count);
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre d\'utilisateurs:', error);
            }
        };
        const fetchClassCount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/classesCount');
                setClassCount(response.data.count);
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de classes:', error);
            }
        };
        const fetchProgramCount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/programsCount');
                setProgramCount(response.data.count);
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de cours:', error);
            }
        };
        const fetchCourseCount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/courseCount');
                setCourseCount(response.data.count);
            } catch (error) {
                console.error('Erreur lors de la récupération du nombre de cours:', error);
            }
        };

        fetchUserCount();
        fetchClassCount();
        fetchProgramCount();
        fetchCourseCount();
    }, []);

    const handleClose = () => {
        localStorage.removeItem("token");
        window.location = "/";
    };

    return (
        <div className='dashboard'>
            <div className="dashboard-nav">
                <nav className="navbar">
                    <div className="container">
                        <div className="logo-container">
                            <img className='logo' src={image} alt="logo" />
                            <span id="brand">Dashboard</span>
                        </div>
                        <ul className="nav-links">
                            <li><Link to="/NewCourse">New Course</Link></li>
                            <li><Link to="/NewProgram">New Program</Link></li>
                            <li><Link to="/All-courses">All Course</Link></li>
                            <li><Link to="/All-programs">All Program</Link></li>
                            <li><Link to="/AddCourseToProgram">Add Course To Program</Link></li>
                            <li><Link to="/NewClass">New Class</Link></li>
                            <li><Link to="/Allclass">Voir tous les Classes</Link></li>
                            <li><Link to="/AddProgramToClass">Add Program To Class</Link></li>
                            <li><Link to="/DeleteProgram">Supprimer un Program</Link></li>
                            <li><Link to="#" onClick={handleClose}><RiAccountCircleLine /> Se Déconnecter</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <main className="main">
                <h2>Home Admin</h2>
                {/* <p> Ensemble dans une seule page</p> */}
                <div className='main-content'>
                    <div className='main-bloc'>
                        <p>Utilisateurs:</p>    
                        <p>Nous avons un nombre grandissant 
                            pour lequel <br/> nous comptons vraiment une mieux fidéliser </p>
                        <span>{userCount}</span>
                    </div>
                    <div className='main-bloc'>
                        <p>Nos classes sont essentiellement pour les lycée</p>
                        <p>Nombre de classes</p>
                        <span>{classCount}</span>
                    </div>  
                    <div className='main-bloc'>
                        <p>Nos cours sont essentiellement pour les lycéens</p>
                        <p>Nombre de cours </p>
                        <span>{courseCount}</span>
                    </div>  
                    <div className='main-bloc'>
                        <p>Nos Programmes sont essentiellement pour les lycéens</p>
                        <p>Nombre de programmes </p>
                        <span>{programCount}</span>
                    </div> 
                </div>
                
            </main>
        </div>
    );
}

export default Dashboard;
