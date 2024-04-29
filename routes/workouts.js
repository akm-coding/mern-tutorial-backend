const express = require("express");
const Workout = require("../models/workoutModel");
const {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const router = express.Router();

// GET all
router.get("/", getAllWorkouts);

router.get("/:id", getWorkout);

// POST
router.post("/", createWorkout);

// DELETE
router.delete("/:id", deleteWorkout);

// UPDATE
router.patch("/:id", updateWorkout);

module.exports = router;
