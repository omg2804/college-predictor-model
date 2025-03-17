const mongoose = require("mongoose");

// Define the schema
const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  rank: { type: Number, required: true },
  category: { type: String, required: true },
  homeState: { type: String, required: true },
  placements: { type: Number, required: true },  // Placement % or rating
  research: { type: Number, required: true },    // Research rating
  higherEducation: { type: Number, required: true }, // Higher studies rating
});

// Create a model
const College = mongoose.model("College", collegeSchema);

module.exports = College;
