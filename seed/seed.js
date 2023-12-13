const { User, Thought, Reaction } = require("../models");
const mongoose = require("mongoose");
const connection = require("../config/connection");
// Seed data
const users = [
  {
    username: "Niko",
    email: "Niko@gmail.com",
    thought: [],
  },
];
const thoughts = [
  {
    username: "Niko",
    thought: "I'm pretty tired now."
  },
];
console.log(connection);
// Connects to server
connection.once("open", async () => {
  console.log("connected");
  // Drop existing students
  await User.deleteMany({});
  // Adds seed data to database
  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);
  console.table(users);
  console.table(thoughts);
  process.exit(0);
});