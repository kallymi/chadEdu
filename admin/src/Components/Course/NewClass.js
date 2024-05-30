import React, { useState } from 'react';
import axios from 'axios';

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
        console.log('Data to be sent:', classData);
        try {
            const response = await axios.post('http://localhost:5000/api/classes', classData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response:', response);
            alert('Classe ajoutée avec succès !');
            window.location = '/AllClass';
        } catch (error) {
            console.error('Erreur:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container">
            <h2>Ajouter une classe</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nom de la classe:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={classData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={classData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Prix:</label>
                    <textarea
                        id="price"
                        name="price"
                        value={classData.price}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Ajouter la classe</button>
            </form>
            <a href={'/AllClass'}>Voir tous les classes</a>
        </div>
    );
}

export default NewClass;
