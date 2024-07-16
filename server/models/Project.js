// const mongoose = require('mongoose');

// const projectSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String },
//   startDate: { type: Date },
//   endDate: { type: Date },
//   owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// }, { timestamps: true });

// module.exports = mongoose.model('Project', projectSchema);


const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
