import React from 'react';
import axios from 'axios';

function ProgramItem({ program, onDelete }) {
    if (!program) {
        return null; // ou un composant de chargement ou un message d'erreur
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/programs/${program._id}`);
            onDelete(program._id);
            console.log('Programme supprimé avec succès !');
        } catch (error) {
            console.error('Erreur lors de la suppression du programme:', error);
        }
    };

    return (
        <div>
            <h3>{program.title} - {program.description}</h3>
            <button onClick={handleDelete}>Supprimer</button>
        </div>
    );
}

export default ProgramItem;
