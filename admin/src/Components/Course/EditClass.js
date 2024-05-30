import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditClasse = () => {
    const { id } = useParams();
    const [classe, setClasse] = useState({ name: '', description: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClasseDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/classes/${id}`);
                setClasse(response.data);
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchClasseDetails();
    }, [id]);

    const handleChange = (e) => {
        const { names, value } = e.target;
        setClasse({
            ...classe,
            [names]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/classes/${id}`, classe);
            navigate('/AllClass');
        } catch (error) {
            console.error('Error updating classe:', error);
        }
    };

    return (
        <div>
            <h2>Modifier la Classe</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="title"
                        value={classe.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        name="category"
                        value={classe.description}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Prix:
                    <input
                        type="Number"
                        name="category"
                        value={classe.price}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Enregistrer les modifications</button>
            </form>
        </div>
    );
};

export default EditClasse;
