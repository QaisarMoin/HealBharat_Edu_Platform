const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        mobile: {
            type: String,
            unique: true,
            sparse: true, // Allows null/undefined values to not conflict (if using email)
        },
        email: {
            type: String,
            unique: true,
            sparse: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            select: false,
        },
        role: {
            type: String,
            enum: ['student', 'admin'],
            default: 'student',
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        studentProfile: {
            fullName: {
                type: String,
                required: function() { return this.role === 'student'; }
            },
            age: Number,
            gender: {
                type: String,
                enum: ['Male', 'Female', 'Other'],
            },
            classLevel: {
                type: String,
                enum: ['10th', '12th'],
            },
            location: String,
            contactNumber: String,
            studentId: {
                type: String,
                unique: true,
                sparse: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate Student ID before saving if not present for students
userSchema.pre('save', function(next) {
    if (this.role === 'student' && !this.studentProfile.studentId) {
        const timestamp = Date.now().toString().slice(-6);
        const randomConfig = Math.floor(1000 + Math.random() * 9000);
        this.studentProfile.studentId = `STU-${timestamp}${randomConfig}`;
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
