const path = require('path');
const express = require('express');
const OS = require('os');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
const cors = require('cors')

// Use environment variables for MongoDB credentials if available
const mongoUsername = process.env.MONGO_USERNAME || 'daemon4546_db_user';
const mongoPassword = process.env.MONGO_PASSWORD || '661NwD6qV63GxVzO';

let mongouri = process.env.MONGO_URI;

// If MONGO_URI is set and starts with 'mongodb://', ignore it and use fallback
if (mongouri && mongouri.startsWith('mongodb://')) {
  console.warn('Warning: MONGO_URI is set in deprecated format. Using SRV fallback.');
  mongouri = null;
}

// If not set, use SRV format fallback
if (!mongouri) {
  mongouri = `mongodb+srv://${mongoUsername}:${mongoPassword}@solar-test-db.rusjxzi.mongodb.net/superdata?retryWrites=true&w=majority`;
}

// Log the final MongoDB URI for debugging
console.log("Using MongoDB URI:", mongouri);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(cors())
async function startServer() {
  try {
    await mongoose.connect(mongouri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB Connection Successful");
    app.listen(3000, () => {
      console.log("Server successfully running on port - " + 3000);
    });
  } catch (err) {
    console.log("error!! " + err);
    process.exit(1);
  }
}

startServer();

var Schema = mongoose.Schema;

var dataSchema = new Schema({
    name: String,
    id: Number,
    description: String,
    image: String,
    velocity: String,
    distance: String
});
var planetModel = mongoose.model('planets', dataSchema);



app.post('/planet', async function(req, res) {
    try {
        const planetData = await planetModel.findOne({ id: req.body.id });
        if (!planetData) {
            res.status(404).send("Planet not found");
        } else {
            res.send(planetData);
        }
    } catch (err) {
        res.status(500).send("Error in Planet Data");
    }
})

app.get('/',   async (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});


app.get('/os',   function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "os": OS.hostname(),
        "env": process.env.NODE_ENV
    });
})

app.get('/live',   function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": "live"
    });
})

app.get('/ready',   function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        "status": "ready"
    });
})

module.exports = app;