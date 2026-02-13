const mongoose = require('mongoose');

const aptitudeResultSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    totalScore: {
        type: Number,
        default: 0,
    },
    categoryScores: {
        type: Map,
        of: Number, // e.g., { 'Logical': 10, 'Verbal': 8 }
        default: {},
    },
    interestTags: [{
        type: String,
    }],
    personalityType: {
        type: String,
        default: 'Unknown',
    },
    suggestedStreams: [{
        type: String,
    }],
}, {
    timestamps: true,
});

module.exports = mongoose.model('AptitudeResult', aptitudeResultSchema);
