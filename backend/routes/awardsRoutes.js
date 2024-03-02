const express = require("express");
const User = require("../models/user.js");

const router = express.Router();

// create/save a new award
router.post("/:userId/awards", async (request, response) => {
  try {
    const { userId } = request.params;
    const { title, description, issuer, dateReceived } = request.body;

    if (!title || !description || !issuer || !dateReceived) {
      return response.status(400).send({
        message:
          "Please provide all required fields: title, description, issuer, dateReceived",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    const newAward = { title, description, issuer, dateReceived };
    user.awards.push(newAward);
    await user.save();

    return response.status(201).json(newAward);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get all awards
router.get("/:userId/awards", async (request, response) => {
  try {
    const { userId } = request.params;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    return response.status(200).json({
      count: user.awards.length,
      data: user.awards,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get one award by id
router.get("/:userId/awards/:awardId", async (request, response) => {
  try {
    const { userId, awardId } = request.params;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    const award = user.awards.id(awardId);
    if (!award) {
      return response.status(404).send({ message: "Award not found" });
    }

    return response.status(200).json(award);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// update an award
router.put("/:userId/awards/:awardId", async (request, response) => {
  try {
    const { userId, awardId } = request.params;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    const award = user.awards.id(awardId);
    if (!award) {
      return response.status(404).send({ message: "Award not found" });
    }

    award.title = request.body.title || award.title;
    award.description = request.body.description || award.description;
    award.issuer = request.body.issuer || award.issuer;
    award.dateReceived = request.body.dateReceived || award.dateReceived;

    await user.save();
    return response.status(200).json(award);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// delete an award
router.delete("/:userId/awards/:awardId", async (request, response) => {
  try {
    const { userId, awardId } = request.params;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    const awardIndex = user.awards.findIndex((award) => award.id === awardId);
    if (awardIndex === -1) {
      return response.status(404).send({ message: "Award not found" });
    }

    user.awards.splice(awardIndex, 1);
    await user.save();

    return response.status(200).send({ message: "Award deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

module.exports = router;
