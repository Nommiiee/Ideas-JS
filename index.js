const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dataSet = require("./models/dataSet.js");
const app = express();
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

app.use(cors());
app.use(express.json());
app.use(express.static("./dist/index.html"));
