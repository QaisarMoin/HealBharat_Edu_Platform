const { v4: uuidv4 } = require('uuid');
const AptitudeQuestion = require('../models/AptitudeQuestion');
const AptitudeResult = require('../models/AptitudeResult');

// @desc    Get all assessment questions
// @route   GET /api/assessment/questions
// @access  Protected
const getQuestions = async (req, res) => {
    try {
        const questions = await AptitudeQuestion.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Submit assessment and calculate results
// @route   POST /api/assessment/submit
// @access  Protected (Student)
const submitAssessment = async (req, res) => {
    try {
        const { answers } = req.body; // Array of { questionId, selectedOptionIndex }
        
        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({ message: 'Invalid answers format' });
        }

        let totalScore = 0;
        const categoryScores = {};
        const interestCounts = {};
        
        // Fetch all questions to verify answers
        // Optimization: In production, fetch only needed IDs or cache this
        const questions = await AptitudeQuestion.find();
        const questionMap = new Map(questions.map(q => [q._id.toString(), q]));

        for (const answer of answers) {
            const question = questionMap.get(answer.questionId);
            
            if (question) {
                // Aptitude Scoring
                if (question.category === 'Aptitude') {
                    if (question.correctOption === answer.selectedOptionIndex) {
                        totalScore += question.weightage;
                        categoryScores[question.subCategory] = (categoryScores[question.subCategory] || 0) + question.weightage;
                    }
                } 
                // Interest/Personality Scoring (Simple Frequency Count for now)
                else if (question.category === 'Interest') {
                    // Assuming options map to specific interests, or just tracking the subCategory preference
                    interestCounts[question.subCategory] = (interestCounts[question.subCategory] || 0) + 1;
                }
            }
        }

        // Determine Top Interests
        const interestTags = Object.entries(interestCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([key]) => key);

        // Simple Rule-based Stream Suggestion
        const suggestedStreams = [];
        if (categoryScores['Logical'] > 5 && categoryScores['Scientific'] > 5) {
            suggestedStreams.push('Science (PCM)');
        } else if (categoryScores['Verbal'] > 5 && interestTags.includes('Artistic')) {
            suggestedStreams.push('Arts / Humanities');
        } else if (categoryScores['Logical'] > 5 && interestTags.includes('Business')) {
            suggestedStreams.push('Commerce');
        } else {
            suggestedStreams.push('General / Undecided');
        }

        // Personality Type Placeholder (would usually require a specific matrix)
        const personalityType = 'Analytical'; // Placeholder logic

        const result = await AptitudeResult.create({
            studentId: req.user._id,
            totalScore,
            categoryScores,
            interestTags,
            personalityType,
            suggestedStreams,
        });

        res.status(201).json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Seed sample questions (Helper for testing)
// @route   POST /api/assessment/seed
// @access  Public (for dev)
const seedQuestions = async (req, res) => {
    try {
        await AptitudeQuestion.deleteMany();
        const questions = [
            {
                questionText: "What comes next in the series: 2, 4, 8, 16, ...?",
                options: ["20", "24", "32", "30"],
                category: "Aptitude",
                subCategory: "Logical",
                correctOption: 2,
                weightage: 2
            },
            {
                questionText: "Do you enjoy painting or drawing?",
                options: ["Yes", "No", "Maybe", "Sometimes"],
                category: "Interest",
                subCategory: "Artistic",
                correctOption: null,
                weightage: 1
            },
            {
                questionText: "If A is taller than B, and B is taller than C, who is the tallest?",
                options: ["A", "B", "C", "Cannot determine"],
                category: "Aptitude",
                subCategory: "Logical",
                correctOption: 0,
                weightage: 2
            }
        ];
        await AptitudeQuestion.insertMany(questions);
        res.json({ message: 'Questions seeded' });
    } catch (error) {
         res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getQuestions,
    submitAssessment,
    seedQuestions
};
