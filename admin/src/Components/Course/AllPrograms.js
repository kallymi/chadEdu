import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllPrograms() {
    const [programs, setPrograms] = useState([]);

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
    };

    return (
        <div>
            <h2>Liste des programmes</h2>
            <div className='class-parent'>
                {programs.map(program => (
                    program.title && program.description && (
                        <div className='class-block' key={program._id}>
                            <h3>{program.title}</h3>
                            <p>{program.description}</p>
                            <button onClick={() => handleDelete(program._id)}>Supprimer</button>
                            <button onClick={() => handleEdit(program._id)}>Modifier</button>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}

export default AllPrograms;
