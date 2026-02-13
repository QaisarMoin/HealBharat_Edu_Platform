const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

// User Schema (copied from model)
const userSchema = new mongoose.Schema({
    mobile: String,
    email: String,
    password: { type: String, select: false },
    role: String,
    studentProfile: Object
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function resetPassword() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Find user by email
        const email = 'alkarmah685@gmail.com';
        const newPassword = 'Alkarmah@123';

        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            console.log('User not found!');
            process.exit(1);
        }

        console.log('User found:', user.email);

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password directly
        await User.updateOne(
            { email },
            { $set: { password: hashedPassword } }
        );

        console.log('Password reset successfully!');
        console.log('Email:', email);
        console.log('New Password:', newPassword);

        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

resetPassword();
