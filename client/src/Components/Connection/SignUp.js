// import React from 'react'

// function SignUp() {
//     return (
//         <div>SignUp</div>
//     )
// }


// export default SignUp

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../Assets/Styles/style_page_connection.css'
const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        numberPhone: '',
        password: '',
        confirmPassword: ''
    });
    
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const response = await axios.post('http://localhost:5000/api/signUp', formData);
            console.log(response);
            // Rediriger vers la page de connexion après une inscription réussie
            navigate('/');
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            setError(error.response.data.message); // Display error message from server
        }
    };
    return (
        <div className='content'>
            <div className='bloc'>
                <form onSubmit={handleSubmit}>
                    <div className='parent-form-input'>
                    <label htmlFor='firstName'>Nom:</label>
                        <input
                            className='input'
                            type='firstName'
                            name='firstName'
                            id='firstName'
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='bloc'>
                    <label htmlFor='lastName'>Prenom:</label>
                        <input
                            className='input'
                            type='lastName'
                            name='lastName'
                            id='lastName'
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='bloc'>
                    <label htmlFor='numberPhone'>Contact:</label>
                        <input
                            className='input'
                            type='numberPhone'
                            name='numberPhone'
                            id='numberPhone'
                            value={formData.numberPhone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='bloc'>
                        <label htmlFor='email'>Email:</label>
                        <input
                            className='input'
                            type='email'
                            name='email'
                            id='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='bloc'>
                        <label htmlFor='password'>Mot de passe:</label>
                        <input
                            className='input'
                            type='password'
                            name='password'
                            id='password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='bloc'>
                        <label htmlFor='confirmPassword'>Confirmer le mot de passe:</label>
                        <input
                            className='input'
                            type='password'
                            name='confirmPassword'
                            id='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className='btn' id='btn-signup'>
                        S'inscrire
                    </button>
                </form>

            </div>
            <div>
                {error && <h1 style={{ color: 'red' }}>{error}</h1>}
            </div>
        </div>
    );
};

export default SignUp;
