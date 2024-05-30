import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GoArrowRight } from "react-icons/go";
import MyNavbar from '../nav';
const ClassDetails = () => {
    const { id } = useParams();
    const [classDetails, setClassDetails] = useState(null);
    const [programsDetails, setProgramsDetails] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/classes/${id}`);
                setClassDetails(response.data);

                // Assuming the programs are part of the class response
                const programsDetails = await Promise.all(response.data.programs.map(async (programId) => {
                    try {
                        const programResponse = await axios.get(`http://localhost:5000/api/programs/${programId}`);
                        return programResponse.data;
                    } catch (programError) {
                        console.error(`Error fetching program ${programId} details:`, programError);
                        return null; // Ignore individual program fetch errors
                    }
                }));
                setProgramsDetails(programsDetails.filter(program => program !== null)); // Filter out null results
            } catch (error) {
                console.error('Error fetching class details:', error);
                setError('Erreur lors de la récupération des détails de la classe.');
            }
        };
        fetchClassDetails();
    }, [id]);

    return (
        <div className='principal-class'>
            <MyNavbar/>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {classDetails ? (
                <div className='test'>
                    <h1>{classDetails.name}</h1>
                    <p>{classDetails.description}</p>
                    <h2>Programmes :</h2>
                    <div className="container">
                        {programsDetails.map((program, index) => (
                            <div key={index} className="block">
                                <h2>Titre du programme : {program.title}</h2>
                                <p>Nombre de Cours : {program.courses.length}</p>
                                <Link to={`/programs/${program._id}`}>En savoir plus <GoArrowRight/></Link>
                            </div>
                        ))}
                    </div>
                    <Link to={'/home'}> Revenir</Link>
                </div>
            ) : (
                <p>Chargement des détails de la classe...</p>
            )}
        </div>
    );
};

export default ClassDetails;
