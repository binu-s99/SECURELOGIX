const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../Models/userModel');

// User registration
const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  if ( !firstName || !email || !password || !role) {
    res.status(400);
    throw new Error('Please fill all required fields');
  }

  // Check if user already exists with provided email
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('This email address is already being used');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role, // Assign the provided role
  });

  if (user) {
    res.status(201);
    res.json('User added to the system successfully!');
  } else {
    res.status(400);
    throw new Error('Invalid user! Please check again');
  }
});

// User login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check details to fetch user by email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Create a payload for the token that includes userId and role
    const payload = {
      role: user.role,
      email: user.email,
    };

    // Generate the token with the payload
    const token = generateToken(payload);

    res.json({
      _id: user._id,
      name: user.firstName,
      email: user.email,
      role: user.role,
      token, // Include the token in the response
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// Generate JWT
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

module.exports = {
  createUser,
  loginUser,
};