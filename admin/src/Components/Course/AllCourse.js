import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Assets/Styles/styles-classes.css';
import { useNavigate } from 'react-router-dom';

function AllCourse() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleDelete = async (courseId) => {
        try {
            await axios.delete(`http://localhost:5000/api/courses/${courseId}`);
            setCourses(courses.filter(course => course._id !== courseId));
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const handleEdit = (courseId) => {
        navigate(`/edit-course/${courseId}`);
    };
    const HandleNew =  () =>{
        navigate('/NewCourse');
    };
    const HandleRedirect =  () =>{
        navigate('/home');
    };
    return (
        <div className='racine'>
            <h2>Liste des cours</h2>
            <button onClick={HandleRedirect}>Revenir</button>
            <button onClick={HandleNew}> Ajouter un nouveau Cours</button>
            <div className='class-parent'>
                {courses.map(course => (
                    <div key={course._id} className='class-block'>
                        <h2>{course.title}</h2>
                        <p>{course.category}</p>
                        <button onClick={() => handleEdit(course._id)}>Modifier</button>
                        <button id='delete' onClick={() => handleDelete(course._id)}>Supprimer</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllCourse;
