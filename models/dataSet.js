const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema({
  idea: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
});

const Idea = mongoose.model("Idea", ideaSchema);

module.exports = Idea;
