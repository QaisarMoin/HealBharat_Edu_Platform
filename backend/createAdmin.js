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

async function createAdmin() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Check if admin already exists
        const adminExists = await User.findOne({ email: 'admin@healbharat.com' });
        
        if (adminExists) {
            console.log('Admin user already exists!');
            console.log('Email: admin@healbharat.com');
            process.exit(0);
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('Admin@123', salt);

        // Create admin user
        const admin = await User.create({
            email: 'admin@healbharat.com',
            password: hashedPassword,
            role: 'admin',
            mobile: '9999999999'
        });

        console.log('Admin user created successfully!');
        console.log('Email: admin@healbharat.com');
        console.log('Password: Admin@123');
        console.log('Role:', admin.role);

        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

createAdmin();
