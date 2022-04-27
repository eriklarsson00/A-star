import * as module from "module";
const require = module.createRequire(import.meta.url);

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

const dummyRequest = {
  user_id: 1,
  product_text: "banan",
  description: "en smarrig banan sökes",
  quantity: 1,
  time_of_creation: new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, ""),
  time_of_expiration: new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, ""),
};

export function requestTests(server) {
  describe("/requests", () => {
    it("should get all requests", function (done) {
      chai
        .request(server)
        .get("/requests")
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.not.be.eql(0);
          done();
        });
    });
    it("should get request by id", function (done) {
      chai
        .request(server)
        .get("/requests/1")
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.not.be.eql(0);
          done();
        });
    });
    it("should not get request by id", function (done) {
      // Invalid id
      chai
        .request(server)
        .get("/requests/invalidId")
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          res.should.have.status(400);
          res.body.should.be.a("string");
          res.body.length.should.not.be.eql(0);
        });

      // Bad id
      chai
        .request(server)
        .get("/requests/-1")
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it("should add request", function (done) {
      chai
        .request(server)
        .post("/requests")
        .send({ request: dummyRequest, communities: [1, 2] })
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          res.should.have.status(200);
          res.body.should.be.a("string");
          res.body.length.should.not.be.eql(0);
          done();
        });
    });

    it("should update request", function (done) {
      chai
        .request(server)
        .put("/requests/1")
        .send(dummyRequest)
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          res.should.have.status(200);
          res.body.should.be.a("string");
          res.body.length.should.not.be.eql(0);
          done();
        });
    });

    it("should delete request", function (done) {
      chai
        .request(server)
        .delete("/requests/1")
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          res.should.have.status(200);
          res.body.should.be.a("string");
          res.body.length.should.not.be.eql(0);
          done();
        });
    });

    it("should not add request", function (done) {
      chai
        .request(server)
        .post("/requests")
        .send({})
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          res.should.have.status(400);
          res.body.should.be.a("string");
          res.body.length.should.not.be.eql(0);
          done();
        });
    });

    it("should not update request", function (done) {
      // Empty body
      chai
        .request(server)
        .put("/requests/1")
        .send({})
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          res.should.have.status(400);
          res.body.should.be.a("string");
          res.body.length.should.not.be.eql(0);
        });

      // Invalid id
      chai
        .request(server)
        .put("/requests/InvalidId")
        .send(dummyRequest)
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          res.should.have.status(400);
          res.body.should.be.a("string");
          res.body.length.should.not.be.eql(0);
        });

      // Bad id
      chai
        .request(server)
        .put("/requests/-1")
        .send(dummyRequest)
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          res.should.have.status(200);
          res.body.should.be.a("string");
          res.body.length.should.not.be.eql(0);
          done();
        });
    });

    it("should not delete request", function (done) {
      // Invalid id
      chai
        .request(server)
        .delete("/requests/InvalidId")
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          res.should.have.status(400);
          res.body.should.be.a("string");
          res.body.length.should.not.be.eql(0);
        });

      // Bad id
      chai
        .request(server)
        .delete("/requests/-1")
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          res.should.have.status(200);
          res.body.should.be.a("string");
          res.body.length.should.not.be.eql(0);
          done();
        });
    });
  });
  describe("/requests/active", () => {
    it("should get all active requests", function (done) {
      chai
        .request(server)
        .get("/requests/active")
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.not.be.eql(0);
          done();
        });
    });
    it("should get active requests in a community", function (done) {
      chai
        .request(server)
        .get("/requests/active/2")
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.not.be.eql(0);
          done();
        });
    });
    it("should not get active requests in a community", function (done) {
      // Invalid id
      chai
        .request(server)
        .get("/requests/active/InvalidId")
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          res.should.have.status(400);
          res.body.should.be.a("string");
          res.body.length.should.not.be.eql(0);
        });

      // Bad id
      chai
        .request(server)
        .get("/requests/active/-1")
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  describe("/requests/myactive", () => {
    it("should get my active requests", function (done) {
      chai
        .request(server)
        .get("/requests/myactive/1")
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.not.be.eql(0);
          done();
        });
    });
    it("should not get my active requests", function (done) {
      // Invalid id
      chai
        .request(server)
        .get("/requests/myactive/InvalidId")
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          res.should.have.status(400);
          res.body.should.be.a("string");
          res.body.length.should.not.be.eql(0);
        });

      // Bad id
      chai
        .request(server)
        .get("/requests/myactive/-1")
        .end((err, res) => {
          if (err) {
            console.error(err);
          }
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
}
