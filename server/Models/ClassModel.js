const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    programs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program',
    }],
    price: {
        type: Number,
        required: true
    }

    // Autres champs spécifiques à la classe
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
