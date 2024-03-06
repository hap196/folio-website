const express = require("express");
const { courseSchema, Course } = require("../models/course.js");
const User = require("../models/user.js");

const router = express.Router();

// create/save a new course
router.post("/:userId/courses", async (request, response) => {
  try {
    const { userId } = request.params;
    const { name, description, grade, year } = request.body;

    if (!name || !description || !grade || !year) {
      console.log("request", request.body)
      return response.status(400).send({
        message:
          "Please provide all required fields: name, description, grade, year",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    const newCourse = { name, description, grade, year };
    user.courses.push(newCourse);
    await user.save();

    return response.status(201).json(newCourse);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get all courses for a user
router.get("/:userId/courses", async (request, response) => {
  try {
    const { userId } = request.params;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    return response.status(200).json({
      count: user.courses.length,
      data: user.courses,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get one course by id
router.get("/:userId/courses/:courseId", async (request, response) => {
  try {
    const { userId, courseId } = request.params;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    // find it in the user's courses array
    const course = user.courses.id(courseId);
    if (!course) {
      return response.status(404).send({ message: "Course not found" });
    }

    return response.status(200).json(course);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// update a course
router.put("/:userId/courses/:courseId", async (request, response) => {
  try {
    const { userId, courseId } = request.params;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    const course = user.courses.id(courseId);
    if (!course) {
      return response.status(404).send({ message: "Course not found" });
    }

    course.name = request.body.name || course.name;
    course.description = request.body.description || course.description;
    course.grade = request.body.grade || course.grade;
    course.year = request.body.year || course.year;

    await user.save();
    return response.status(200).json(course);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// delete a course
router.delete("/:userId/courses/:courseId", async (request, response) => {
  try {
    const { userId, courseId } = request.params;

    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).send({ message: "User not found" });
    }

    // find course index in the user's courses array
    const courseIndex = user.courses.findIndex(course => course.id === courseId);
    
    // if not there, send 404
    if (courseIndex === -1) {
      return response.status(404).send({ message: "Course not found" });
    }

    // splice it out (removes the course from array)
    user.courses.splice(courseIndex, 1);

    // save updated user document
    // note that we make changes to the user collection not the course collection
    // since courses is embedded in user
    await user.save();

    return response.status(200).send({ message: 'Course deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


module.exports = router;
