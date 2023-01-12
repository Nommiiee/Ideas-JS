const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ideaSchema = require("./models/dataSet.js");
const app = express();
const route = express.Router();
const port = 3000;
const ideasData = require("./src/ideas.js");

require("dotenv").config();

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  initialise();
});

const initialise = async function () {
  try {
    await mongoose.connect(process.env.mongoPath, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

app.get("/idea", async (req, res) => {
  try {
    const idea = await getRandomIdea();
    res.send(idea);
  } catch (error) {
    console.log(error);
    res.send("Something Went Wrong, Please Try Again");
  }
});

app.get("/refresh", async (req, res) => {
  try {
    await deleteIdeas();
    await putIdeas();
    res.send("done");
  } catch (err) {
    console.log(err);
    res.send("Something Went Wrong, Please Try Again");
  }
});

function titleCase(str) {
  str = str.toLowerCase().split(" ");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
}
// put all the ideas in the database
async function putIdeas() {
  console.log("putting ideas in the database");
  ideas.forEach(async (idea) => {
    idea = titleCase(idea);
    const data = {
      idea: idea,
      description: "This is a description",
    };
    const newIdea = new ideaSchema(data);
    await newIdea.save();
  });
  return "done";
}

async function deleteIdeas() {
  console.log("deleting ideas from the database");
  await ideaSchema.deleteMany({});
  return "done";
}

// Fetch a radnom idea from database
async function getRandomIdea() {
  const count = await ideaSchema.countDocuments();
  const random = Math.floor(Math.random() * count);
  const idea = await ideaSchema.findOne().skip(random);
  return idea;
}

module.exports = app;
