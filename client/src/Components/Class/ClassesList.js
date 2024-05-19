import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ClassesStyle.css';
import { GoArrowRight } from "react-icons/go";
const ClassesList = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/classes');
                setClasses(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='tester'>
            <h1>Nos classes</h1>
            <div className="grid-container">
                {classes.map((cls) => (
                    <div key={cls._id} className="class-block">
                        <h2>{cls.name}</h2>
                        <p>{cls.description}</p>
                        <p id='price'>Prix : {cls.price} FCFA</p>
                        <p>Nombre de Programmes : {cls.programs.length}</p>
                        <Link to={`/classes/${cls._id}`}>En savoir plus <GoArrowRight/></Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassesList;
