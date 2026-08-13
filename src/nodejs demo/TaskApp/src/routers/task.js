const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new task
router.post('/tasks', auth, async (req, res) => {
  try {
    const task = new Task({
      description: req.body.description,
      owner: req.user._id
    });
    
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all tasks with filtering, sorting, and pagination
router.get('/tasks', auth, async (req, res) => {
  try {
    const { completed, limit = 10, skip = 0, sortBy = 'createdAt:desc' } = req.query;
    
    // Build filter object
    const filter = { owner: req.user._id };
    
    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }
    
    // Parse sortBy parameter (e.g., "createdAt:desc" or "createdAt:asc")
    const sort = {};
    if (sortBy) {
      const [field, order] = sortBy.split(':');
      sort[field] = order === 'desc' ? -1 : 1;
    }
    
    const tasks = await Task.find(filter)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    
    const total = await Task.countDocuments(filter);
    
    res.json({
      tasks,
      pagination: {
        total,
        limit: parseInt(limit),
        skip: parseInt(skip),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single task by ID
router.get('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update task
router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  
  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates!' });
  }
  
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    updates.forEach(update => {
      task[update] = req.body[update];
    });
    
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete task
router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
