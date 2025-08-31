
const mongoose = require("mongoose");
require("dotenv").config();

// Prefer full MONGO_URI, fallback to username/password
let mongouri = process.env.MONGO_URI;
if (!mongouri && process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD) {
  mongouri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@solar-test-db.rusjxzi.mongodb.net/superdata?retryWrites=true&w=majority`;
}
if (!mongouri) {
  console.error("❌ No MongoDB connection string found. Please set MONGO_URI in .env");
  process.exit(1);
}

const planetSchema = new mongoose.Schema({
  name: String,
  id: Number,
  description: String,
  image: String,
  velocity: String,
  distance: String
});
const Planet = mongoose.model("planets", planetSchema);

const planets = [
  { id: 1, name: "Mercury", description: "Mercury is the closest planet to the Sun.", image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg", velocity: "47.87 km/s", distance: "57.9 million km" },
  { id: 2, name: "Venus", description: "Venus is the second planet from the Sun.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg", velocity: "35.02 km/s", distance: "108.2 million km" },
  { id: 3, name: "Earth", description: "Earth is our home planet.", image: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg", velocity: "29.78 km/s", distance: "149.6 million km" },
  { id: 4, name: "Mars", description: "Mars is the fourth planet from the Sun.", image: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg", velocity: "24.07 km/s", distance: "227.9 million km" },
  { id: 5, name: "Jupiter", description: "Jupiter is the largest planet.", image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg", velocity: "13.07 km/s", distance: "778.3 million km" },
  { id: 6, name: "Saturn", description: "Saturn is famous for its rings.", image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg", velocity: "9.69 km/s", distance: "1.43 billion km" },
  { id: 7, name: "Uranus", description: "Uranus is the seventh planet.", image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg", velocity: "6.81 km/s", distance: "2.87 billion km" },
  { id: 8, name: "Neptune", description: "Neptune is the eighth planet.", image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg", velocity: "5.43 km/s", distance: "4.5 billion km" }
];

mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Planet.deleteMany({});
    await Planet.insertMany(planets);
    console.log("🌍 Seeded planets collection.");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ Error seeding planets:", err);
    mongoose.disconnect();
  });
