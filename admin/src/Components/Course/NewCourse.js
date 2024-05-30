import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../Assets/Styles/style-new-course.css';
const NewCourse = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        videos: [{ title: '', url: '' }],
        evaluations: [{ title: '', questions: [{ question: '', options: [''], correctAnswerIndex: 0 }] }],
        images: [{ title: '', url: '' }],
        textContent: ''
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleVideoChange = (e, index) => {
        const { name, value } = e.target;
        const videos = [...formData.videos];
        videos[index][name] = value;
        setFormData(prevState => ({
            ...prevState,
            videos
        }));
    };

    const handleAddVideo = () => {
        setFormData(prevState => ({
            ...prevState,
            videos: [...prevState.videos, { title: '', url: '' }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/courses', formData);
            if (response.status === 201) {
                console.log('Cours ajouté avec succès !');
                alert('Cours ajoutée avec succès !');
                window.location = '/All-courses';
                setFormData({
                    title: '',
                    category: '',
                    description: '',
                    videos: [{ title: '', url: '' }],
                    evaluations: [{ title: '', questions: [{ question: '', options: [''], correctAnswerIndex: 0 }] }],
                    images: [{ title: '', url: '' }],
                    textContent: ''
                });
                
                navigate('/All-courses'); 
            } else {
                console.error('Erreur lors de l\'ajout du cours');
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };
    

    const handleAddEvaluation = () => {
        setFormData(prevState => ({
            ...prevState,
            evaluations: [...prevState.evaluations, { title: '', questions: [{ question: '', options: [''], correctAnswerIndex: 0 }] }]
        }));
    };
    const handleAddImage = () => {
        setFormData(prevState => ({
            ...prevState,
            images: [...prevState.images, { title: '', url: '' }]
        }));
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Titre du cours:</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="category">Catégorie:</label>
                <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
            </div>
            {/* Ajoutez des champs pour les vidéos */}
            <div>
                <h3>Vidéos</h3>
                {formData.videos.map((video, index) => (
                    <div key={index}>
                        <input type="text" name="title" value={video.title} onChange={(e) => handleVideoChange(e, index)} placeholder="Titre de la vidéo" />
                        <input type="text" name="url" value={video.url} onChange={(e) => handleVideoChange(e, index)} placeholder="URL de la vidéo" />
                    </div>
                ))}
                <button type="button" onClick={handleAddVideo}>Ajouter une vidéo</button>
            </div>
            {/* Images */}
            <div>
                <h3>Images</h3>
                {formData.images.map((image, index) => (
                    <div key={index}>
                        <input type="text" name={`images[${index}].title`} value={image.title} onChange={handleChange} placeholder="Titre de l'image" />
                        <input type="text" name={`images[${index}].url`} value={image.url} onChange={handleChange} placeholder="URL de l'image" />
                    </div>
                ))}
                <button type="button" onClick={handleAddImage}>Ajouter une image</button>
            </div>
            {/* Évaluations */}
            <div>
                <h3>Évaluations</h3>
                {formData.evaluations.map((evaluation, index) => (
                    <div key={index}>
                        <input type="text" name={`evaluations[${index}].title`} value={evaluation.title} onChange={handleChange} placeholder="Titre de l'évaluation" />
                        {/* Ajoutez des champs pour les questions de l'évaluation si nécessaire */}
                        <h4>Questions</h4>
                        {evaluation.questions.map((question, qIndex) => (
                            <div key={qIndex}>
                                <input type="text" name={`evaluations[${index}].questions[${qIndex}].question`} value={question.question} onChange={handleChange} placeholder="Question" />
                                {/* Ajoutez des champs pour les options et l'index de la réponse correcte si nécessaire */}
                            </div>
                        ))}
                        {/* <button type="button" onClick={() => handleAddQuestion(index)}>Ajouter une question</button> */}
                    </div>
                ))}
                <button type="button" onClick={handleAddEvaluation}>Ajouter une évaluation</button>
            </div>

            {/* Ajoutez d'autres champs pour les évaluations, les images, etc. */}
            <button type="submit">Ajouter le cours</button>
        </form>
    );
};

export default NewCourse;
