const mongoose = require("mongoose");
const { Schema } = mongoose;

const awardSchema = new Schema({
  title: String,
  description: String,
  issuer: String,
  dateReceived: Date,
  grade: Number,
});

// const Award = mongoose.model("Award", awardSchema);
module.exports = awardSchema;
