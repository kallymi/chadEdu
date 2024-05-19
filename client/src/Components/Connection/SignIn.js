import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Link } from "react-router-dom";
// import Instance from '../../Services/Instance';
// import config from '../../Services/config.js';
import '../../Assets/Styles/style_page_connection.css';
import image from '../../Assets/Images/logoSite.jpg';
const SignIn = () => {
    const [data, setData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const {data : response} = await axios.post('http://localhost:5000/api/signIn',data)
            console.log(response);
            if (response) {
                const user = response.user;

                if (user) {
                    localStorage.setItem("token", response.token);
                    window.location = "/home";
                }
            } else {
                setError("Réponse invalide du serveur");
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            setError(error);
        }
    };

    return (
        <>
            
            <div className='content'>
                
                <div className='bloc-image'>
                <h2 id='title'>  Merci de bien vouloir vous authentifier</h2>
                    <img src={image} alt="" />
                </div>
                <div className='form-container'>
                    <form onSubmit={handleSubmit} className='form'>
                        <div className='form-group'>
                            <label htmlFor='email' className='label'>
                                Email:
                            </label>
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
                        <div className='form-group'>
                            <label htmlFor='password' className='label'>
                                Mot de passe:
                            </label>
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
                        <button type='submit' className='btn' id='btn-signin'>
                            Se connecter
                        </button>
                    </form>

                    <div className='signup-option'>
                        <p id='new-user'>Vous n'avez pas de compte ?</p>
                        <Link className='signup-link' to='/signup'>
                            Inscrivez-vous
                        </Link>
                    </div>
                </div>
                <div>
                    {error && <h1 className='error-message'>{error.response.data.message}</h1>}
                </div>
            </div>     
        </>

    );
};
export default SignIn; // Assurez-vous d'exporter le composant par défa