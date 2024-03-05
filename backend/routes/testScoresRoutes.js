const express = require("express");
const User = require("../models/user.js");

const router = express.Router();

//  create/save a new test score
router.post("/:userId/testScores", async (request, response) => {
  try {
    const { userId } = request.params;
    if (
      !request.body.testName ||
      !request.body.score ||
      !request.body.grade ||
      !request.body.dateTaken
    ) {
      return response.status(400).send({
        message:
          "Please provide all required fields: testName, score, grade, dateTaken",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    const newTestScore = {
      testName: request.body.testName,
      score: request.body.score,
      percentile: request.body.percentile,
      dateTaken: request.body.dateTaken,
    };
    user.testScores.push(newTestScore);
    await user.save();

    return response.status(201).json(newTestScore);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get all test scores
router.get("/:userId/testScores", async (request, response) => {
  try {
    const { userId } = request.params;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    return response.status(200).json({
      count: user.testScores.length,
      data: user.testScores,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get one test score by id
router.get("/:userId/testScores/:testScoreId", async (request, response) => {
  try {
    const { userId, testScoreId } = request.params;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    const testScore = user.testScores.id(testScoreId);
    if (!testScore) {
      return response.status(404).send({ message: "Test score not found" });
    }

    return response.status(200).json(testScore);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// update a test score
router.put("/:userId/testScores/:testScoreId", async (request, response) => {
  try {
    const { userId, testScoreId } = request.params;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    const testScore = user.testScores.id(testScoreId);
    if (!testScore) {
      return response.status(404).send({ message: "Test score not found" });
    }

    testScore.testName = request.body.testName || testScore.testName;
    testScore.score = request.body.score || testScore.score;
    testScore.percentile = request.body.percentile || testScore.percentile;
    testScore.dateTaken = request.body.dateTaken || testScore.dateTaken;

    await user.save();
    return response.status(200).json(testScore);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// delete a test score
router.delete("/:userId/testScores/:testScoreId", async (request, response) => {
  try {
    const { userId, testScoreId } = request.params;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    const scoreIndex = user.testScores.findIndex(score => score.id === testScoreId);
    if (scoreIndex === -1) {
      return response.status(404).send({ message: "Test score not found" });
    }

    user.testScores.splice(scoreIndex, 1);
    await user.save();

    return response.status(200).send({ message: "Test score deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

module.exports = router;
