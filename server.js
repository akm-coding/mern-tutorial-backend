require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

const app = express();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// connect to db
mongoose
  .connect(MONGO_URI)
  .then(() => {
    // listen to requests
    app.listen(PORT, () => {
      console.log("Connected to db & Listening on port", PORT);
    });
  })
  .catch((error) => console.log(error));
