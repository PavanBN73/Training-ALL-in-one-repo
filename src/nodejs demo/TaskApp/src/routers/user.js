const express = require('express');
const User = require('../models/user');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = express.Router();

// User Signup
router.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const user = new User({ name, email, password });
    await user.save();
    
    const token = user.generateAuthToken();
    await user.save();
    
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User Login
router.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    
    const token = user.generateAuthToken();
    await user.save();
    
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user profile
router.get('/users/me', auth, async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    createdAt: req.user.createdAt
  });
});

// Logout user
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(t => t.token !== req.token);
    await req.user.save();
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user and associated tasks
router.delete('/users/me', auth, async (req, res) => {
  try {
    await Task.deleteTasksByUser(req.user._id);
    await User.findByIdAndDelete(req.user._id);
    res.json({ message: 'User and tasks deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
