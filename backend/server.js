const express = require("express");  // Import Express framework
const mongoose = require("mongoose");  // Import Mongoose for MongoDB
const cors = require("cors");  // Import CORS to allow frontend requests
require("dotenv").config();  // Import dotenv for environment variables

const app = express();
app.use(express.json());  // Allows backend to read JSON data
app.use(cors());  // Allows frontend to connect

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb+srv://gaikwadom992:xqSKA1ztPUdljf8R@cluster0.xxxxx.mongodb.net/college-predictor?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully! 🚀"))
.catch(err => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
    res.send("College Predictor API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const College = require("./models/College"); // Import the model

// API to add a college
app.post("/add-college", async (req, res) => {
  try {
    const newCollege = new College(req.body);
    await newCollege.save();
    res.status(201).send({ message: "College added successfully!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// API to get all colleges
app.get("/colleges", async (req, res) => {
  try {
    const colleges = await College.find();
    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
