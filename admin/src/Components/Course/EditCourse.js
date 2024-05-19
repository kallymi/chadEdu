import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCourse = () => {
    const { id } = useParams();
    const [course, setCourse] = useState({ title: '', category: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
                setCourse(response.data);
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchCourseDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse({
            ...course,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/courses/${id}`, course);
            navigate('/All-courses');
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    return (
        <div>
            <h2>Modifier le cours</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Titre:
                    <input
                        type="text"
                        name="title"
                        value={course.title}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Catégorie:
                    <input
                        type="text"
                        name="category"
                        value={course.category}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Enregistrer les modifications</button>
            </form>
        </div>
    );
};

export default EditCourse;
