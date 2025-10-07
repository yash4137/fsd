const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  course: { type: String, required: true },
  fees: { type: Number, required: true }
});

module.exports = mongoose.model('Student', studentSchema);
