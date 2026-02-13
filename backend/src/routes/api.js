const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe,
    updateStudentProfile
} = require('../controllers/authController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

// Public Routes
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

// Protected Routes
router.get('/auth/me', protect, getMe);

// Student Routes
router.put('/students/profile', protect, restrictTo('student'), updateStudentProfile);

module.exports = router;
