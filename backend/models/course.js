const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  name: String,
  description: String,
  grade: String,
  year: Number,
});

const Course = mongoose.model("Course", courseSchema);
module.exports = {
  courseSchema,
  Course,
};
