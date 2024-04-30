const WorkOut = require("../models/workoutModel");
const mongoose = require("mongoose");

// Get all workouts
const getAllWorkouts = async (req, res) => {
  const workouts = await WorkOut.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

// Get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Workout Found!" });
  }
  const workout = await WorkOut.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "No Workout Found!" });
  }
  res.status(200).json(workout);
};

// Create new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  //   add doc to db
  try {
    const workout = await WorkOut.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Workout Found!" });
  }
  const workout = await WorkOut.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ error: "No Workout Found!" });
  }
  res.status(200).json(workout);
};

// Update workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No workout" });
  }
  const workout = await WorkOut.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!workout) {
    return res.status(400).json({ error: "No workout" });
  }
  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
