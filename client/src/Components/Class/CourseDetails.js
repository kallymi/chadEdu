import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../Assets/Styles/course_style.css'
const CourseDetails = () => {
    const { id } = useParams();
    const [courseDetails, setCourseDetails] = useState(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
                setCourseDetails(response.data);
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };
        fetchCourseDetails();
    }, [id]);

    return (
        <div>
            {courseDetails && (
                <div className='course-title'>
                    <h1 id='title'>{courseDetails.title}</h1>
                    <p>{courseDetails.description}</p>
                    {/* <h2>Vidéos :</h2> */}
                    <ul>
                        {courseDetails.videos.map((video, index) => (
                            <li key={index}>
                                <h3>{video.title}</h3>
                                <video controls>
                                    <source src={video.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </li>
                        ))}
                    </ul>
                    
                    {/* <h2>Images pour mieux comprendre le cours :</h2> */}
                    <ul>
                        {courseDetails.images.map((image, index) => (
                            <li key={index}>
                                <img src={image.url} alt={image.title} />
                            </li>
                        ))}
                    </ul>
                    {/* <h2>Contenu Textuel :</h2> */}
                    <p>{courseDetails.textContent}</p>
                    {/* <h2>Évaluations :</h2> */}
                    <ul>
                        {courseDetails.evaluations.map((evaluation, index) => (
                            <li key={index}>
                                <h3>{evaluation.title}</h3>
                                <ul>
                                    {evaluation.questions.map((question, qIndex) => (
                                        <li key={qIndex}>
                                            <p>{question.question}</p>
                                            <ul>
                                                {question.options.map((option, oIndex) => (
                                                    <li key={oIndex}>{option}</li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CourseDetails;
