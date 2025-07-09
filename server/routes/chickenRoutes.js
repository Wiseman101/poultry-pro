// server/routes/chickenRoutes.js
const express = require('express')
const router = express.Router()
const Chicken = require('../models/Chicken')

// POST /api/chickens/add
router.post('/add', async (req, res) => {
  try {
    const chicken = new Chicken(req.body)
    await chicken.save()
    res.status(201).json({ message: 'Chicken added successfully', chicken })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to add chicken' })
  }
})

module.exports = router
