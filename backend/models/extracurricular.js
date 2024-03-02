const mongoose = require("mongoose");
const { Schema } = mongoose;

const extracurricularSchema = new Schema({
  name: String,
  position: String,
  description: String,
  location: String,
  startYear: Number,
  endYear: Number,
  grade: Number,
});

// const Extracurricular = mongoose.model(
//   "Extracurricular",
//   extracurricularSchema
// );
module.exports = extracurricularSchema;
