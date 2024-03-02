const mongoose = require("mongoose");
const { Schema } = mongoose;


const courseSchema = require("./course");
const extracurricularSchema = require("./extracurricular");
const awardSchema = require("./award");
const testScoreSchema = require("./testScore");

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  courses: [courseSchema],
  extracurriculars: [extracurricularSchema],
  awards: [awardSchema],
  testScores: [testScoreSchema],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
