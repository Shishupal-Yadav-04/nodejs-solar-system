// const path = require('path');
// const express = require('express');
// const OS = require('os');
// const bodyParser = require('body-parser');
// const mongoose = require("mongoose");
// const app = express();
// const cors = require('cors')

// // Use environment variables for MongoDB credentials if available
// const mongoUsername = process.env.MONGO_USERNAME || 'daemon4546_db_user';
// const mongoPassword = process.env.MONGO_PASSWORD || '661NwD6qV63GxVzO';

// let mongouri = process.env.MONGO_URI;

// // If MONGO_URI is set and starts with 'mongodb://', ignore it and use fallback
// if (mongouri && mongouri.startsWith('mongodb://')) {
//   console.warn('Warning: MONGO_URI is set in deprecated format. Using SRV fallback.');
//   mongouri = null;
// }

// // If not set, use SRV format fallback
// if (!mongouri) {
//   mongouri = `mongodb+srv://${mongoUsername}:${mongoPassword}@solar-test-db.rusjxzi.mongodb.net/superdata?retryWrites=true&w=majority`;
// }

// // Log the final MongoDB URI for debugging
// console.log("Using MongoDB URI:", mongouri);

// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '/')));
// app.use(cors())
// async function startServer() {
//   try {
//     await mongoose.connect(mongouri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log("MongoDB Connection Successful");
//     app.listen(3000, () => {
//       console.log("Server successfully running on port - " + 3000);
//     });
//   } catch (err) {
//     console.log("error!! " + err);
//     process.exit(1);
//   }
// }

// startServer();

// var Schema = mongoose.Schema;

// var dataSchema = new Schema({
//     name: String,
//     id: Number,
//     description: String,
//     image: String,
//     velocity: String,
//     distance: String
// });
// var planetModel = mongoose.model('planets', dataSchema);



// app.post('/planet', async function(req, res) {
//     try {
//         const planetData = await planetModel.findOne({ id: req.body.id });
//         if (!planetData) {
//             res.status(404).send("Planet not found");
//         } else {
//             res.send(planetData);
//         }
//     } catch (err) {
//         res.status(500).send("Error in Planet Data");
//     }
// })

// app.get('/',   async (req, res) => {
//     res.sendFile(path.join(__dirname, '/', 'index.html'));
// });


// app.get('/os',   function(req, res) {
//     res.setHeader('Content-Type', 'application/json');
//     res.send({
//         "os": OS.hostname(),
//         "env": process.env.NODE_ENV
//     });
// })

// app.get('/live',   function(req, res) {
//     res.setHeader('Content-Type', 'application/json');
//     res.send({
//         "status": "live"
//     });
// })

// app.get('/ready',   function(req, res) {
//     res.setHeader('Content-Type', 'application/json');
//     res.send({
//         "status": "ready"
//     });
// })

// module.exports = app;






// const path = require('path');
// const express = require('express');
// const OS = require('os');
// const bodyParser = require('body-parser');
// const mongoose = require("mongoose");
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Prefer full MONGO_URI, fallback to building from username/password
// let mongouri = process.env.MONGO_URI;
// if (!mongouri && process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD) {
//   mongouri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@solar-test-db.rusjxzi.mongodb.net/superdata?retryWrites=true&w=majority`;
// }

// if (!mongouri) {
//   console.error("❌ No MongoDB connection string found. Please set MONGO_URI in .env");
//   process.exit(1);
// }

// console.log("Using MongoDB URI:", mongouri);

// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '/')));
// app.use(cors());

// async function startServer() {
//   try {
//     await mongoose.connect(mongouri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log("✅ MongoDB Connection Successful");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.log("❌ MongoDB connection error:", err);
//     process.exit(1);
//   }
// }
// startServer();

// // Schema & model
// const Schema = mongoose.Schema;
// const dataSchema = new Schema({
//   name: String,
//   id: Number,
//   description: String,
//   image: String,
//   velocity: String,
//   distance: String
// });
// const planetModel = mongoose.model('planets', dataSchema);

// // Routes
// app.post('/planet', async function(req, res) {
//   try {
//     const planetData = await planetModel.findOne({ id: req.body.id });
//     if (!planetData) {
//       res.status(404).send("Planet not found");
//     } else {
//       res.send(planetData);
//     }
//   } catch (err) {
//     res.status(500).send("Error in Planet Data");
//   }
// });

// app.get('/', async (req, res) => {
//   res.sendFile(path.join(__dirname, '/', 'index.html'));
// });

// app.get('/os', function(req, res) {
//   res.json({
//     os: OS.hostname(),
//     env: process.env.NODE_ENV || "development"
//   });
// });

// app.get('/live', function(req, res) {
//   res.json({ status: "live" });
// });

// app.get('/ready', function(req, res) {
//   res.json({ status: "ready" });
// });

// module.exports = app;


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
