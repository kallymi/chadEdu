const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assurez-vous que 'User' est bien le nom de votre modèle d'utilisateur
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class', // Assurez-vous que 'Class' est bien le nom de votre modèle de classe
        required: true
    },
    registrationDate: {
        type: Date,
        default: Date.now
    }
    // Autres champs spécifiques à l'inscription
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
