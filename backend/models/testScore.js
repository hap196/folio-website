const mongoose = require("mongoose");
const { Schema } = mongoose;

const testScoreSchema = new Schema({
  testName: String,
  score: Number,
  dateTaken: Date,
  grade: Number,
});

// const TestScore = mongoose.model("TestScore", testScoreSchema);
module.exports = testScoreSchema;
