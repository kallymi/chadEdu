import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Assets/Styles/styles-classes.css'
function AllClasses() {
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();
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

    const handleDelete = async (classeId) => {
        try {
            await axios.delete(`http://localhost:5000/api/classes/${classeId}`);
            setClasses(classes.filter(classe => classe._id !== classeId));
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const handleEdit = (classeId) => {
        navigate(`/edit-classe/${classeId}`);
    };
    const HandleNew =  () =>{
        navigate('/NewClass');
    };
    const HandleRedirect =  () =>{
        navigate('/home');
    };
    return (
        <div className='racine'>
            <h2>Liste des classes</h2>
            <button onClick={HandleRedirect}>Revenir</button>
            <button onClick={HandleNew}> Ajouter un nouveau Classe</button>
            <div className='class-parent'>
                {classes.map(classe => (
                    <div key={classe._id} className='class-block'>
                        <h2>{classe.name}</h2>  
                        <p>{classe.description}</p>
                        <button onClick={() => handleEdit(classe._id)}>Modifier</button>
                        <button id='delete' onClick={() => handleDelete(classe._id)}>Supprimer</button>
                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default AllClasses;
