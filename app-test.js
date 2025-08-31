// const mongoose = require("mongoose");
// const server = require("./app");
// const chai = require("chai");
// const chaiHttp = require("chai-http");


// // Assertion 
// chai.should();
// chai.use(chaiHttp); 

// const mongoUsername = process.env.MONGO_USERNAME || 'daemon4546_db_user';
// const mongoPassword = process.env.MONGO_PASSWORD || '661NwD6qV63GxVzO';

// let mongouri = process.env.MONGO_URI;
// if (mongouri && mongouri.startsWith('mongodb://')) {
//   console.warn('Warning: MONGO_URI is set in deprecated format. Using SRV fallback.');
//   mongouri = null;
// }
// if (!mongouri) {
//   mongouri = `mongodb+srv://${mongoUsername}:${mongoPassword}@solar-test-db.rusjxzi.mongodb.net/superdata?retryWrites=true&w=majority`;
// }
// console.log("Using MongoDB URI (test):", mongouri);

// // Ensure ALL MongoDB connections in tests use mongouri
// before(async () => {
//   await mongoose.connect(mongouri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   });
// });

// describe('Sanity Check', () => {
//   it('should run tests', () => {
//     // If you see this in output, Mocha is working
//   });
// });

// describe('Planets API Suite', () => {

//     describe('Fetching Planet Details', () => {
//         it('it should fetch a planet named Mercury', (done) => {
//             let payload = {
//                 id: 1
//             }
//           chai.request(server)
//               .post('/planet')
//               .send(payload)
//               .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.have.property('id').eql(1);
//                     res.body.should.have.property('name').eql('Mercury');
//                 done();
//               });
//         });

//         it('it should fetch a planet named Venus', (done) => {
//             let payload = {
//                 id: 2
//             }
//           chai.request(server)
//               .post('/planet')
//               .send(payload)
//               .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.have.property('id').eql(2);
//                     res.body.should.have.property('name').eql('Venus');
//                 done();
//               });
//         });

//         it('it should fetch a planet named Earth', (done) => {
//             let payload = {
//                 id: 3
//             }
//           chai.request(server)
//               .post('/planet')
//               .send(payload)
//               .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.have.property('id').eql(3);
//                     res.body.should.have.property('name').eql('Earth');
//                 done();
//               });
//         });
//         it('it should fetch a planet named Mars', (done) => {
//             let payload = {
//                 id: 4
//             }
//           chai.request(server)
//               .post('/planet')
//               .send(payload)
//               .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.have.property('id').eql(4);
//                     res.body.should.have.property('name').eql('Mars');
//                 done();
//               });
//         });

//         it('it should fetch a planet named Jupiter', (done) => {
//             let payload = {
//                 id: 5
//             }
//           chai.request(server)
//               .post('/planet')
//               .send(payload)
//               .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.have.property('id').eql(5);
//                     res.body.should.have.property('name').eql('Jupiter');
//                 done();
//               });
//         });

//         it('it should fetch a planet named Satrun', (done) => {
//             let payload = {
//                 id: 6
//             }
//           chai.request(server)
//               .post('/planet')
//               .send(payload)
//               .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.have.property('id').eql(6);
//                     res.body.should.have.property('name').eql('Saturn');
//                 done();
//               });
//         });

//         it('it should fetch a planet named Uranus', (done) => {
//             let payload = {
//                 id: 7
//             }
//           chai.request(server)
//               .post('/planet')
//               .send(payload)
//               .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.have.property('id').eql(7);
//                     res.body.should.have.property('name').eql('Uranus');
//                 done();
//               });
//         });

//         it('it should fetch a planet named Neptune', (done) => {
//             let payload = {
//                 id: 8
//             }
//           chai.request(server)
//               .post('/planet')
//               .send(payload)
//               .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.have.property('id').eql(8);
//                     res.body.should.have.property('name').eql('Neptune');
//                 done();
//               });
//         });

//         // it('it should fetch a planet named Pluto', (done) => {
//         //     let payload = {
//         //         id: 9
//         //     }
//         //   chai.request(server)
//         //       .post('/planet')
//         //       .send(payload)
//         //       .end((err, res) => {
//         //             res.should.have.status(200);
//         //             res.body.should.have.property('id').eql(9);
//         //             res.body.should.have.property('name').eql('Sun');
//         //         done();
//         //       });
//         // });


//     });        
// });

// //Use below test case to achieve coverage
// describe('Testing Other Endpoints', () => {

//     describe('it should fetch OS Details', () => {
//         it('it should fetch OS details', (done) => {
//           chai.request(server)
//               .get('/os')
//               .end((err, res) => {
//                     res.should.have.status(200);
//                 done();
//               });
//         });
//     });

//     describe('it should fetch Live Status', () => {
//         it('it checks Liveness endpoint', (done) => {
//           chai.request(server)
//               .get('/live')
//               .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.have.property('status').eql('live');
//                 done();
//               });
//         });
//     });

//     describe('it should fetch Ready Status', () => {
//         it('it checks Readiness endpoint', (done) => {
//           chai.request(server)
//               .get('/ready')
//               .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.have.property('status').eql('ready');
//                 done();
//               });
//         });
//     });

// });

// after(async () => {
//   await mongoose.disconnect();
//   console.log("All tests finished.");
// });

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
