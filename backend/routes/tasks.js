const express = require('express');
const { auth } = require('../middleware/auth');
const Task = require('../models/Task');
const Project = require('../models/Project');

const router = express.Router();

router.use(auth);

router.post('/', async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      assignedTo: req.body.assignedTo || req.user._id
    });

    await task.save();

    await Project.findByIdAndUpdate(req.body.project, {
      $push: { tasks: task._id }
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/project/:projectId', async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId
    }).populate('assignedTo project');

    const updatedTasks = tasks.map(task => {
      const isOverdue =
        task.status !== 'Done' &&
        new Date(task.dueDate) < new Date();

      return {
        ...task.toObject(),
        isOverdue
      };
    });

    res.json(updatedTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        status,
        completedAt: status === 'Done' ? new Date() : null
      },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;