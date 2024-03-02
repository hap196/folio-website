const express = require("express");
const Award = require("../models/award.js");

const router = express.Router();

// create/save a new award
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.description ||
      !request.body.issuer ||
      !request.body.dateReceived
    ) {
      return response.status(400).send({
        message:
          "Please provide all required fields: title, description, issuer, dateReceived",
      });
    }

    const newAward = new Award({
      title: request.body.title,
      description: request.body.description,
      issuer: request.body.issuer,
      dateReceived: request.body.dateReceived,
    });

    const savedAward = await newAward.save();

    return response.status(201).json(savedAward);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get all awards
router.get("/", async (request, response) => {
  try {
    const awards = await Award.find({});
    return response.status(200).json({
      count: awards.length,
      data: awards,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get one award by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const award = await Award.findById(id);

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
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const updateData = request.body;

    const updatedAward = await Award.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedAward) {
      return response.status(404).send({ message: "Award not found" });
    }

    return response.status(200).json(updatedAward);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// delete an award
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deletedAward = await Award.findByIdAndDelete(id);

    if (!deletedAward) {
      return response.status(404).send({ message: "Award not found" });
    }

    return response.status(200).send({ message: "Award deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

module.exports = router;
