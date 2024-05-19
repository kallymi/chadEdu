const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: String,
    description: String,
    videos: [{
        title: String,
        url: String
    }],
    evaluations: [{
        title: String,
        questions: [{
            question: String,
            options: [String],
            correctAnswerIndex: Number
        }]
    }],
    images: [{
        title: String,
        url: String
    }],
    textContent: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
