const path = require('path');
const express = require('express');
const OS = require('os');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Load env vars
const {
  MONGO_URI,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  CLUSTER_NAME,
  DB_NAME
} = process.env;

// Prefer full URI, otherwise build from parts
let mongoUri = MONGO_URI;
if (!mongoUri && MONGO_USERNAME && MONGO_PASSWORD && CLUSTER_NAME && DB_NAME) {
  mongoUri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${CLUSTER_NAME}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
}

if (!mongoUri) {
  console.error("❌ No MongoDB URI found. Please set MONGO_URI or individual parts in .env");
  process.exit(1);
}

// Log safe info (do not print credentials)
console.log("Using MongoDB cluster:", mongoUri.replace(/\/\/.*@/, "//<credentials>@"));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(cors());

// Connect DB and start server
async function startServer() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}
startServer();

// Schema & model
const planetSchema = new mongoose.Schema({
  name: String,
  id: Number,
  description: String,
  image: String,
  velocity: String,
  distance: String
});
const Planet = mongoose.model('Planet', planetSchema);

// Routes
app.post('/planet', async (req, res) => {
  try {
    const planet = await Planet.findOne({ id: req.body.id }).exec();
    if (!planet) {
      return res.status(404).json({ error: "Planet not found" });
    }
    res.json(planet);
  } catch (err) {
    res.status(500).json({ error: "Error fetching planet data", details: err.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'index.html'));
});

app.get('/os', (req, res) => {
  res.json({
    os: OS.hostname(),
    env: process.env.NODE_ENV || "development"
  });
});

app.get('/live', (req, res) => res.json({ status: "live" }));
app.get('/ready', (req, res) => res.json({ status: "ready" }));

module.exports = app;
