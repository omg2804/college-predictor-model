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
