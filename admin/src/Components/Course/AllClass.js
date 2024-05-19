import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Assets/Styles/styles-classes.css'
function AllClasses() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/classes');
                setClasses(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des classes:', error);
            }
        };

        fetchClasses();
    }, []);

    return (
        <div>
            <h2>Liste des classes</h2>
            <a href={'/NewClass'}> AJouter une classe</a>
            <a href={'/home'}>Revenir</a>
            <div className='class-parent'>
                {classes.map(classe => (
                    <div key={classe._id} className='class-block'>
                        <h2>{classe.name}</h2>  
                        <p>{classe.description}</p>
                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default AllClasses;
