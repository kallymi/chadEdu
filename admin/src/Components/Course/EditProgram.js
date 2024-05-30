import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProgram = () => {
    const { id } = useParams();
    const [program, setProgram] = useState({ title: '', discipline: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProgramDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/programs/${id}`);
                setProgram(response.data);
            } catch (error) {
                console.error('Error fetching program details:', error);
            }
        };

        fetchProgramDetails();
    }, [id]);

    const handleChange = (e) => {
        const { names, value } = e.target;
        setProgram({
            ...program,
            [names]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/programs/${id}`, program);
            navigate('/All-programs');
        } catch (error) {
            console.error('Error updating classe:', error);
        }
    };

    return (
        <div>
            <h2>Modifier le Programme</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Titre:
                    <input
                        type="text"
                        name="title"
                        value={program.title}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Discipline:
                    <input
                        type="text"
                        name="category"
                        value={program.discipline}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Enregistrer les modifications</button>
            </form>
        </div>
    );
};

export default EditProgram;
