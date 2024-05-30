const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    discipline: String,
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
    // Autres champs spécifiques au programme
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program;
