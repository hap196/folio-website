const express = require("express");
const User = require("../models/user.js"); 

const router = express.Router();

// create/save a new extracurricular
router.post("/:userId/extracurriculars", async (request, response) => {
  try {
    const { userId } = request.params;
    const { name, position, description, location, startYear, endYear } =
      request.body;

    if (
      !name ||
      !position ||
      !description ||
      !location ||
      !startYear ||
      !endYear
    ) {
      return response.status(400).send({
        message:
          "Please provide all required fields: name, position, description, location, startYear, endYear",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    const newExtracurricular = {
      name,
      position,
      description,
      location,
      startYear,
      endYear,
    };
    user.extracurriculars.push(newExtracurricular);
    await user.save();

    return response.status(201).json(newExtracurricular);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get all extracurriculars
router.get("/:userId/extracurriculars", async (request, response) => {
  try {
    const { userId } = request.params;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    return response.status(200).json({
      count: user.extracurriculars.length,
      data: user.extracurriculars,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get one extracurricular by id
router.get(
  "/:userId/extracurriculars/:extracurricularId",
  async (request, response) => {
    try {
      const { userId, extracurricularId } = request.params;

      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).send({ message: "User not found" });
      }

      const extracurricular = user.extracurriculars.id(extracurricularId);
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
  }
);

// update an extracurricular
router.put(
  "/:userId/extracurriculars/:extracurricularId",
  async (request, response) => {
    try {
      const { userId, extracurricularId } = request.params;

      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).send({ message: "User not found" });
      }

      const extracurricular = user.extracurriculars.id(extracurricularId);
      if (!extracurricular) {
        return response
          .status(404)
          .send({ message: "Extracurricular not found" });
      }

      extracurricular.name = request.body.name || extracurricular.name;
      extracurricular.position =
        request.body.position || extracurricular.position;
      extracurricular.description =
        request.body.description || extracurricular.description;
      extracurricular.location =
        request.body.location || extracurricular.location;
      extracurricular.startYear =
        request.body.startYear || extracurricular.startYear;
      extracurricular.endYear = request.body.endYear || extracurricular.endYear;

      await user.save();
      return response.status(200).json(extracurricular);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  }
);

// delete an extracurricular
router.delete(
  "/:userId/extracurriculars/:extracurricularId",
  async (request, response) => {
    try {
      const { userId, extracurricularId } = request.params;

      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).send({ message: "User not found" });
      }

      const extracurricularIndex = user.extracurriculars.findIndex(
        (extracurricular) => extracurricular.id === extracurricularId
      );
      if (extracurricularIndex === -1) {
        return response
          .status(404)
          .send({ message: "Extracurricular not found" });
      }

      user.extracurriculars.splice(extracurricularIndex, 1);
      await user.save();

      return response
        .status(200)
        .send({ message: "Extracurricular deleted successfully" });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  }
);

module.exports = router;