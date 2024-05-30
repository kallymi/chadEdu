import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Assets/Styles/styles-classes.css';
import { useNavigate } from 'react-router-dom';
function AllPrograms() {
    const [programs, setPrograms] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/programs');
                setPrograms(response.data);
            } catch (error) {
                console.error('Error fetching programs:', error);
            }
        };

        fetchPrograms();
    }, []);

    const handleDelete = async (programId) => {
        try {
            alert('Classe ajoutée avec succès !');
            await axios.delete(`http://localhost:5000/api/programs/${programId}`);
            setPrograms(programs.filter(program => program._id !== programId));
            console.log('Programme supprimé avec succès !');
        } catch (error) {
            console.error('Erreur lors de la suppression du programme:', error);
        }
    };

    const handleEdit = (programId) => {
        // Rediriger l'utilisateur vers la page de modification du programme
        // Ou afficher un formulaire de modification dans un modal
        navigate(`/edit-program/${programId}`);
    };
    const HandleNew =  () =>{
        navigate('/NewProgram');
    };
    const HandleRedirect =  () =>{
        navigate('/home');
    };
    return (
        <div className='racine'>
            <h2>Liste des programmes</h2>
            <button onClick={HandleRedirect}>Revenir</button>
            <button onClick={HandleNew}> Ajouter un nouveau Programme</button>
            <div className='class-parent'>
                {programs.map(program => (
                    program.title && program.description && (
                        <div className='class-block' key={program._id}>
                            <h3>{program.title}</h3>
                            <p>{program.description}</p>
                            <p>{program.discipline}</p>
                            <button onClick={() => handleEdit(program._id)}>Modifier</button>
                            <button id='delete' onClick={() => handleDelete(program._id)}>Supprimer</button>
                            
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}

export default AllPrograms;
