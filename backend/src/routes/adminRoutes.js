const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const User = require('../models/User');

// Try to load Course model if it exists
let Course;
try {
    Course = require('../models/Course');
} catch (error) {
    console.log('Course model not found, course routes will return empty arrays');
}

// Try to load Quiz model if it exists
let Quiz;
try {
    Quiz = require('../models/Quiz');
} catch (error) {
    console.log('Quiz model not found, quiz routes will return empty arrays');
}

// @desc    Get all users (admin only)
// @route   GET /api/admin/users?search=&page=&limit=&status=
// @access  Private/Admin
router.get('/users', protect, adminOnly, async (req, res) => {
    try {
        const { search, page = 1, limit = 10, status } = req.query;
        
        console.log('Search params:', { search, page, limit, status });
        
        // Build search query
        let query = {};
        
        // Add search filter
        if (search && search.trim()) {
            query.$and = [
                { role: 'student' },
                {
                    $or: [
                        { 'studentProfile.fullName': { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } },
                        { mobile: { $regex: search, $options: 'i' } }
                    ]
                }
            ];
        } else {
            query.role = 'student';
        }
        
        // Add status filter
        if (status === 'active') {
            query.isVerified = true;
        } else if (status === 'inactive') {
            query.isVerified = false;
        }
        
        console.log('MongoDB query:', JSON.stringify(query, null, 2));
        
        // Calculate pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        
        // Get total count for pagination
        const total = await User.countDocuments(query);
        
        console.log('Total matching users:', total);
        
        // Fetch users with pagination
        const users = await User.find(query)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);
        
        console.log('Returning users:', users.length);
        
        res.json({
            users,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                pages: Math.ceil(total / limitNum)
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create new user (admin only)
// @route   POST /api/admin/users
// @access  Private/Admin
router.post('/users', protect, adminOnly, async (req, res) => {
    try {
        const { email, mobile, password, role, studentProfile } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({
            $or: [{ email }, { mobile }]
        });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email or mobile' });
        }

        // Create user
        const user = await User.create({
            email,
            mobile,
            password,
            role: role || 'student',
            studentProfile
        });

        // Return user without password
        const userResponse = await User.findById(user._id).select('-password');
        res.status(201).json(userResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get user by ID (admin only)
// @route   GET /api/admin/users/:id
// @access  Private/Admin
router.get('/users/:id', protect, adminOnly, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update user (admin only)
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
router.put('/users/:id', protect, adminOnly, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields
        if (req.body.email) user.email = req.body.email;
        if (req.body.mobile) user.mobile = req.body.mobile;
        if (req.body.studentProfile) {
            user.studentProfile = { ...user.studentProfile, ...req.body.studentProfile };
        }
        
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Delete user (admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
router.delete('/users/:id', protect, adminOnly, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.deleteOne();
        res.json({ message: 'User removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all courses (admin only)
// @route   GET /api/admin/courses?search=&page=&limit=
// @access  Private/Admin
router.get('/courses', protect, adminOnly, async (req, res) => {
    try {
        if (!Course) {
            return res.json({ courses: [], pagination: { total: 0, page: 1, limit: 10, pages: 0 } });
        }
        
        const { search, page = 1, limit = 10 } = req.query;
        
        // Build search query
        let query = {};
        if (search && search.trim()) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } }
            ];
        }
        
        // Calculate pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        
        const total = await Course.countDocuments(query);
        const courses = await Course.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);
        
        res.json({
            courses,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                pages: Math.ceil(total / limitNum)
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all quizzes (admin only)
// @route   GET /api/admin/quizzes?search=&page=&limit=
// @access  Private/Admin
router.get('/quizzes', protect, adminOnly, async (req, res) => {
    try {
        if (!Quiz) {
            return res.json({ quizzes: [], pagination: { total: 0, page: 1, limit: 10, pages: 0 } });
        }
        
        const { search, page = 1, limit = 10 } = req.query;
        
        // Build search query
        let query = {};
        if (search && search.trim()) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { subject: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        
        // Calculate pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        
        const total = await Quiz.countDocuments(query);
        const quizzes = await Quiz.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum);
        
        res.json({
            quizzes,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                pages: Math.ceil(total / limitNum)
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get dashboard stats (admin only)
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get('/stats', protect, adminOnly, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'student' });
        const totalCourses = Course ? await Course.countDocuments() : 0;
        const totalQuizzes = Quiz ? await Quiz.countDocuments() : 0;
        
        // Get active users (logged in within last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const activeUsers = await User.countDocuments({
            role: 'student',
            updatedAt: { $gte: thirtyDaysAgo }
        });

        res.json({
            totalUsers,
            totalCourses,
            totalQuizzes,
            activeUsers
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
