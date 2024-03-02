const express = require("express");
const Extracurricular = require("../models/extracurricular.js");

const router = express.Router();

// create/save a new extracurricular
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.position ||
      !request.body.description ||
      !request.body.location ||
      !request.body.startYear ||
      !request.body.endYear
    ) {
      return response.status(400).send({
        message:
          "Please provide all required fields: name, position, description, location, startYear, endYear",
      });
    }

    const newExtracurricular = new Extracurricular({
      name: request.body.name,
      position: request.body.position,
      description: request.body.description,
      location: request.body.location,
      startYear: request.body.startYear,
      endYear: request.body.endYear,
    });

    const savedExtracurricular = await newExtracurricular.save();

    return response.status(201).json(savedExtracurricular);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get all extracurriculars
router.get("/", async (request, response) => {
  try {
    const extracurriculars = await Extracurricular.find({});
    return response.status(200).json({
      count: extracurriculars.length,
      data: extracurriculars,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get one extracurricular by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const extracurricular = await Extracurricular.findById(id);

    if (!extracurricular) {
      return response
        .status(404)
        .send({ message: "Extracurricular not found" });
    }

    return response.status(200).json(extracurricular);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// update an extracurricular
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const updateData = request.body;

    const updatedExtracurricular = await Extracurricular.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedExtracurricular) {
      return response
        .status(404)
        .send({ message: "Extracurricular not found" });
    }

    return response.status(200).json(updatedExtracurricular);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// delete an extracurricular
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deletedExtracurricular = await Extracurricular.findByIdAndDelete(id);

    if (!deletedExtracurricular) {
      return response
        .status(404)
        .send({ message: "Extracurricular not found" });
    }

    return response
      .status(200)
      .send({ message: "Extracurricular deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

module.exports = router;
