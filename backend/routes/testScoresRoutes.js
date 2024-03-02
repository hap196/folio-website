const express = require("express");
const TestScore = require("../models/testScore.js");

const router = express.Router();

//  create/save a new test score
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.testName ||
      !request.body.score ||
      !request.body.percentile ||
      !request.body.dateTaken
    ) {
      return response.status(400).send({
        message:
          "Please provide all required fields: testName, score, percentile, dateTaken",
      });
    }

    const newTestScore = new TestScore({
      testName: request.body.testName,
      score: request.body.score,
      percentile: request.body.percentile,
      dateTaken: request.body.dateTaken,
    });

    const savedTestScore = await newTestScore.save();

    return response.status(201).json(savedTestScore);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get all test scores
router.get("/", async (request, response) => {
  try {
    const testScores = await TestScore.find({});
    return response.status(200).json({
      count: testScores.length,
      data: testScores,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get one test score by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const testScore = await TestScore.findById(id);

    if (!testScore) {
      return response.status(404).send({ message: "TestScore not found" });
    }

    return response.status(200).json(testScore);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// update a test score
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const updateData = request.body;

    const updatedTestScore = await TestScore.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedTestScore) {
      return response.status(404).send({ message: "TestScore not found" });
    }

    return response.status(200).json(updatedTestScore);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// delete a test score
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deletedTestScore = await TestScore.findByIdAndDelete(id);

    if (!deletedTestScore) {
      return response.status(404).send({ message: "TestScore not found" });
    }

    return response
      .status(200)
      .send({ message: "TestScore deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

module.exports = router;
