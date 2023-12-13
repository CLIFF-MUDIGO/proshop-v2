import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

const registerUser = asyncHandler(async (req, res) => {
    // Your registration logic goes here
    res.send('register user');
});
//desc: Logout user / clear cookie
//route: POST /api/users/logout
//access: Private
const logoutUser = asyncHandler(async (req, res) => {
      res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
      });
     res.status(200).json({ message: 'Logged out successfully' });
});

const getUserProfile = asyncHandler(async (req, res) => {
    // Your get user profile logic goes here
    res.send('get user profile');
});

const updateUserProfile = asyncHandler(async (req, res) => {
    // Your update user profile logic goes here
    res.send('update user profile');
});

const getUsers = asyncHandler(async (req, res) => {
    // Your get users logic goes here
    res.send('get users');
});

const getUserById = asyncHandler(async (req, res) => {
    // Your get user by ID logic goes here
    res.send('get user by ID');
});

const deleteUser = asyncHandler(async (req, res) => {
    // Your delete user logic goes here
    res.send('delete user');
});

const updateUser = asyncHandler(async (req, res) => {
    // Your update user logic goes here
    res.send('update user');
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUserById, deleteUser, updateUser };