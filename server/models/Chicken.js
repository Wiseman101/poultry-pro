// server/models/Chicken.js
const mongoose = require('mongoose')

const chickenSchema = new mongoose.Schema({
  breed: String,
  age: Number,
  quantity: Number,
  purchasePrice: Number,
  purchaseDate: Date,
  vaccinationDate: Date,
  healthStatus: String,
  notes: String,
})

module.exports = mongoose.model('Chicken', chickenSchema)
