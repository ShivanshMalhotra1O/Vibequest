import 'dotenv/config';
import { readFileSync, unlinkSync } from 'fs';
import multer from 'multer';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../db/models/userModel.js';

const profileRouter = Router();

// Set up JWT secret and file upload configuration
const JWT_SECRET = process.env.JWT_SECRET;
const upload = multer({
  dest: 'public/', // Temporary storage for uploaded files
});

// Middleware to authenticate user
function requireAuth(req, res, next) {
  const token = req.cookies.token;
  if (token === undefined) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Route for updating the user profile
profileRouter.put('/user/update', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { userId } = req.user;
    const data = req.body;
    const name = data?.name;
    const username = data?.username;
    const password = data?.password;
    const imageData = req.file;

    // Check if the required fields are provided
    if (!name && !username && !password && !imageData) {
      return res.status(400).json({ message: 'At least one field is required to update!' });
    }

    // Find the user by their ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    // Update the user's profile with the provided data
    if (name) user.name = name;
    if (username) user.username = username;
    if (password) user.passwordHash = await user.createHash(password);
    if (imageData) {
      const file = readFileSync(imageData.path);
      unlinkSync(imageData.path); // Delete the file after reading it
      user.image = file; // Update the image
    }

    // Save the updated user data
    await user.save();

    res.status(200).json({ message: 'Profile updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// Route to get the current user's profile
profileRouter.get('/user/profile', requireAuth, async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    res.status(200).json({
      id: user._id,
      name: user.name,
      username: user.username,
      image: user.image,
      joinedDate: user.createdAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

export default profileRouter;
