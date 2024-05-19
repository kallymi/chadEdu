// 

import React, { useState } from 'react';
import axios from "axios";
// import { Link } from "react-router-dom";

const SignIn = () => {
    const [data, setData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/signIn', data);
            if (response) {
                const user = response.data.user;

                if (user) {
                    localStorage.setItem("token", response.data.token);
                    if (user.role === 0) {
                        setError("Vous n'avez pas accès.");
                    } else {
                        window.location = "/home";
                    }
                }
            } else {
                setError("Réponse invalide du serveur");
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            setError(error.message);
        }
    };

    return (
        <div className='layout-signin'>
            <div>
                <h2>Bienvenu dans la page admin</h2>
            </div>
            <div className='form-signin'>
                <form onSubmit={handleSubmit}>
                    <div className='parent-form-input'>
                        <label htmlFor='email'>Email:</label>
                        <input
                            className='input'
                            type='email'
                            name='email'
                            id='email'
                            value={data.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='parent-form-input'>
                        <label htmlFor='password'>Mot de passe:</label>
                        <input
                            className='input'
                            type='password'
                            name='password'
                            id='password'
                            value={data.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className='btn-form-connection' id='btn-signin'>
                        Se connecter
                    </button>
                </form>

                
            </div>
            <div>
                {error && <h1 style={{ color: 'red' }}>{error}</h1>}
            </div>
        </div>
    );
};
export default SignIn;
