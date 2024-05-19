import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddCourseToProgram() {
    const [programs, setPrograms] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/programs');
                setPrograms(response.data);
            } catch (error) {
                console.error('Error fetching programs:', error);
            }
        };

        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchPrograms();
        fetchCourses();
    }, []);

    const addCourseToProgram = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/program/${selectedProgram}/add-course/${selectedCourse}`);
            console.log(response.data);
            // Gérer la réponse du serveur
        } catch (error) {
            console.error('Error adding course to program:', error);
        }
    };

    return (
        <div>
            <h2>Ajouter un cours à un programme</h2>
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
