import React, { useState } from 'react';
import axios from "axios";

function NewProgram() {
    const [programData, setProgramData] = useState({
        title: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProgramData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/programs', programData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(programData)
            alert("'Programme ajouté avec succès !'")
            window.location = "/All-programs"
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="container">
            <h2>Ajouter un programme</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Titre du programme:</label>
                    <input type="text" id="title" name="title" value={programData.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={programData.description} onChange={handleChange} required></textarea>
                </div>
                <button type="submit">Ajouter le programme</button>
            </form>
        </div>
    );
}

export default NewProgram;
