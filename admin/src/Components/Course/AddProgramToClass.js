import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Assets/Styles/style-add-Program-to-class.css'; // Assurez-vous que le chemin est correct
import { useNavigate } from 'react-router-dom';

function AddProgramToClass() {
    const [programs, setPrograms] = useState([]);
    const [classes, setClasses] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/programs');
                setPrograms(response.data);
            } catch (error) {
                console.error('Error fetching programs:', error);
                setError('Erreur lors de la récupération des programmes');
            }
        };

        const fetchClasses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/classes');
                setClasses(response.data);
            } catch (error) {
                console.error('Error fetching classes:', error);
                setError('Erreur lors de la récupération des classes');
            }
        };
        
        fetchPrograms();
        fetchClasses();
    }, []);

    const addProgramToClass = async () => {
        if (!selectedClass || !selectedProgram) {
            setError('Veuillez sélectionner une classe et un programme');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5000/api/classes/add-program', {
                classId: selectedClass,
                programId: selectedProgram
            });
            console.log(response.data);
            setMessage('Programme ajouté à la classe avec succès');
            setError('');
        } catch (error) {
            console.error('Error adding program to class:', error); // Ajoutez ce log
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('Erreur lors de l\'ajout du programme à la classe');
            }
            setMessage('');
        }
    };
    const HandleNew =  () => {
        navigate('/AllClass');
    };

    const HandleRedirect =  () => {
        navigate('/home');
    };
    return (
        <div className='racine'>
            <h2>Ajouter un programme à une classe</h2>
            <button onClick={HandleRedirect}>Revenir</button>
            <button onClick={HandleNew}>Voir les classes</button>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className='parent'>
                <label>Classe:</label>
                <select 
                    style={{ color: 'black', backgroundColor: 'white' }} 
                    value={selectedClass} 
                    onChange={(e) => setSelectedClass(e.target.value)}
                >
                    <option value="">Sélectionner une classe</option>
                    {classes.map(classe => (
                        <option key={classe._id} value={classe._id}>{classe.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Programme:</label>
                <select 
                    style={{ color: 'black', backgroundColor: 'white' }} 
                    value={selectedProgram} 
                    onChange={(e) => setSelectedProgram(e.target.value)}
                >
                    <option value="">Sélectionner un programme</option>
                    {programs.map(program => (
                        <option key={program._id} value={program._id}>{program.title}</option>
                    ))}
                </select>
            </div>
            <button onClick={addProgramToClass}>Ajouter le programme à la classe</button>
        </div>
    );
}

export default AddProgramToClass;
