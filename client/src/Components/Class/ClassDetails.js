import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GoArrowRight } from "react-icons/go";

const ClassDetails = () => {
    const { id } = useParams();
    const [classDetails, setClassDetails] = useState(null);
    const [programsDetails, setProgramsDetails] = useState([]);

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/classes/${id}`);
                setClassDetails(response.data);
                const programsDetails = await Promise.all(response.data.programs.map(async (program) => {
                    const programResponse = await axios.get(`http://localhost:5000/api/programs/${program}`);
                    return programResponse.data;
                }));
                setProgramsDetails(programsDetails);
            } catch (error) {
                console.error('Error fetching class details:', error);
            }
        };
        fetchClassDetails();
    }, [id]);

    return (
        <div className='principal-class'>
            {classDetails && (
                <div>
                <h1>{classDetails.name}</h1>
                <p>{classDetails.description}</p>
                <h2>Programmes :</h2>
                <div className="programs-container">
                    {programsDetails.map((program, index) => (
                    <div key={index} className="class-block">
                        <h2>Titre du programme : {program.title}</h2>
                        <p>Nombre de Cours : {program.courses.length}</p>
                        <Link to={`/programs/${program._id}`}>En savoir plus <GoArrowRight/></Link>
                    </div>
                    ))}
                </div>
                <Link to={'/home'}> Revenir</Link>
            </div>
            
            )}
        </div>
    );
};

export default ClassDetails;
