import React, { useState } from 'react';
import axios from "axios";

function NewClass() {
    const [classData, setClassData] = useState({
        name: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClassData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/classes', classData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(classData)
            if (response.status === 201) {
                console.log('Classe ajoutée avec succès !');
            } else {
                console.error('Erreur lors de l\'ajout de la classe');
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="container">
            <h2>Ajouter une classe</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nom de la classe:</label>
                    <input type="text" id="name" name="name" value={classData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={classData.description} onChange={handleChange} required></textarea>
                </div>
                <button type="submit">Ajouter la classe</button>
            </form>
            <a href={'/AllClass'}>Voir tous les classes</a>
        </div>
    );
}

export default NewClass;
