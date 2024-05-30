import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { GoArrowRight } from "react-icons/go";
import MyNavbar from '../nav';
const ProgramDetails = () => {
    const { id } = useParams();
    const [programDetails, setProgramDetails] = useState(null);

    useEffect(() => {
        const fetchProgramDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/programs/${id}`);
                setProgramDetails(response.data);
            } catch (error) {
                console.error('Error fetching program details:', error);
            }
        };
        fetchProgramDetails();
    }, [id]);

    return (
        <div>
            <MyNavbar/>
            {programDetails && (
                <div className='test' >
                    <h1>{programDetails.title}</h1>
                    <p>{programDetails.description}</p>
                    <h2>Cours :</h2>
                    <div className='container'>
                        {programDetails.courses.map((course, index) => (
                            <div key={index} className='block'>
                                <h2>{course.title}</h2>
                                <a href={`/courses/${course._id}`}>Voir le cours <GoArrowRight/></a>
                            </div>
                        ))}
                        
                    </div>
                    
                </div>
            )}
        </div>
    );
};

export default ProgramDetails;
