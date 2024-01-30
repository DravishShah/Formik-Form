// // server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoURI =
  "mongodb+srv://dravishshah:drav37ish@cluster0.vgfeox0.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  state: String,
});

const User = mongoose.model("User", userSchema);

// // API endpoint to handle form submissions
// app.post("/submitForm", (req, res) => {
//   const newUser = new User({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     state: req.body.state,
//   });

//   newUser
//     .save()
//     .then(() => res.json("User added!"))
//     .catch((err) => res.status(400).json(`Error: ${err}`));
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// server.js;

app.post("/api/users", async (req, res) => {
  try {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      state: req.body.state,
    });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific user by ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a user by ID
app.put("/api/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a user by ID
app.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
