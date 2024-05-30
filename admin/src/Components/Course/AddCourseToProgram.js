import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddCourseToProgram() {
    const [programs, setPrograms] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

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

        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError('Erreur lors de la récupération des cours');
            }
        };

        fetchPrograms();
        fetchCourses();
    }, []);

    const addCourseToProgram = async () => {
        if (!selectedProgram || !selectedCourse) {
            setError('Veuillez sélectionner un programme et un cours');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/programs/add-course', {
                programId: selectedProgram,
                courseId: selectedCourse
            });
            console.log(response.data);
            setMessage('Cours ajouté au programme avec succès');
            setError('');
        } catch (error) {
            console.error('Error adding course to program:', error);
            setError('Erreur lors de l\'ajout du cours au programme');
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Ajouter un cours à un programme</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>Programme:</label>
                <select value={selectedProgram} onChange={(e) => setSelectedProgram(e.target.value)}>
                    <option value="">Sélectionner un programme</option>
                    {programs.map(program => (
                        <option key={program._id} value={program._id}>{program.title}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Cours:</label>
                <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                    <option value="">Sélectionner un cours</option>
                    {courses.map(course => (
                        <option key={course._id} value={course._id}>{course.title}</option>
                    ))}
                </select>
            </div>
            <button onClick={addCourseToProgram}>Ajouter le cours au programme</button>
        </div>
    );
}

export default AddCourseToProgram;
