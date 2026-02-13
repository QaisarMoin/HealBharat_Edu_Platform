const express = require('express');
const router = express.Router();
const {
    getQuestions,
    submitAssessment,
    seedQuestions
} = require('../controllers/assessmentController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

router.get('/questions', protect, getQuestions);
router.post('/submit', protect, restrictTo('student'), submitAssessment);
router.post('/seed', seedQuestions); // Dev only

module.exports = router;
