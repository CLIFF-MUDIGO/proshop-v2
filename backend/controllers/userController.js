import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import generateToken from '../utilis/generateToken.js';


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
       generateToken(res, user._id);
        res.status(200).json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});
//desc: Register a new user
//route: POST /api/users/register
//access: Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;


    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({
        name,
        email,
        password,
    });
     if (user){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            
        });
     }else{
        res.status(400);
        throw new Error('Invalid user data');
     }
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

//desc: Get user profile
//route: GET /api/users/profile
//access: Private
const getUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id);

   if(user){
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    });
   }else {
    res.status(404);
    throw new Error('User not found');
   }
});

//desc: Update user profile
//route: PUT /api/users/profile
//access: Private
const updateUserProfile = asyncHandler(async (req, res) => {
   
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
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