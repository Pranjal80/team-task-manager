const admin = require('../middleware/admin');
const express = require('express');
const { auth, adminAuth } = require('../middleware/auth');
const Project = require('../models/Project');

const router = express.Router();

router.use(auth);

router.post('/', adminAuth, async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      admin: req.user._id
    });

    await project.save();

    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { admin: req.user._id },
        { members: req.user._id }
      ]
    }).populate('members');

    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;