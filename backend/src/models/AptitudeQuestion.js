const mongoose = require('mongoose');

const aptitudeQuestionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true,
    },
    options: [{
        type: String,
        required: true,
    }],
    category: {
        type: String,
        enum: ['Aptitude', 'Interest', 'Personality'],
        required: true,
    },
    subCategory: {
        type: String, // e.g., 'Logical', 'Verbal', 'Artistic', 'Scientific'
        required: true,
    },
    correctOption: {
        type: Number, // Index of the correct option (0-3), required for Aptitude
        default: null, // Can be null for Interest/Personality
    },
    weightage: {
        type: Number,
        default: 1,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('AptitudeQuestion', aptitudeQuestionSchema);
