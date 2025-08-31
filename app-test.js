const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
require("dotenv").config();

const server = require("./app");
chai.should();
chai.use(chaiHttp);

// Prefer full MONGO_URI, fallback to username/password
let mongouri = process.env.MONGO_URI;
if (!mongouri && process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD) {
  mongouri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@solar-test-db.rusjxzi.mongodb.net/superdata?retryWrites=true&w=majority`;
}
if (!mongouri) {
  throw new Error("❌ No MongoDB connection string found. Please set MONGO_URI in .env");
}

console.log("Using MongoDB URI (test):", mongouri);

before(async () => {
  await mongoose.connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

describe("Sanity Check", () => {
  it("should run tests", () => {});
});

describe("Planets API Suite", () => {
  describe("Fetching Planet Details", () => {
    const testCases = [
      { id: 1, name: "Mercury" },
      { id: 2, name: "Venus" },
      { id: 3, name: "Earth" },
      { id: 4, name: "Mars" },
      { id: 5, name: "Jupiter" },
      { id: 6, name: "Saturn" },
      { id: 7, name: "Uranus" },
      { id: 8, name: "Neptune" }
    ];

    testCases.forEach(tc => {
      it(`should fetch planet ${tc.name}`, (done) => {
        chai.request(server)
          .post("/planet")
          .send({ id: tc.id })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("id").eql(tc.id);
            res.body.should.have.property("name").eql(tc.name);
            done();
          });
      });
    });
  });
});

describe("Testing Other Endpoints", () => {
  it("should fetch OS details", (done) => {
    chai.request(server)
      .get("/os")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should check liveness", (done) => {
    chai.request(server)
      .get("/live")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("status").eql("live");
        done();
      });
  });

  it("should check readiness", (done) => {
    chai.request(server)
      .get("/ready")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("status").eql("ready");
        done();
      });
  });
});

after(async () => {
  await mongoose.disconnect();
  console.log("✅ All tests finished.");
});
