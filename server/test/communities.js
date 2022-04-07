import * as module from "module";
const require = module.createRequire(import.meta.url);

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

const dummyCommunity = {
  name: "dummy",
  description: "community",
  location: "Råbyvägen 53 B",
  imgurl: "path/to/s3",
  private: false,
};

export function communityTests(server) {
  describe("/communities", () => {
    it("should get all communities", function (done) {
      chai
        .request(server)
        .get("/communities")
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
    it("should get community by id", function (done) {
      chai
        .request(server)
        .get("/communities/1")
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
    it("should not get community by id", function (done) {
      // Invalid id
      chai
        .request(server)
        .get("/communities/invalidId")
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
        .get("/communities/-1")
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

    it("should add community", function (done) {
      let data = { ...dummyCommunity }; // copy by value instaed of copy by reference
      data.name = "newDummy";
      chai
        .request(server)
        .post("/communities")
        .send(data)
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

    it("should update community", function (done) {
      chai
        .request(server)
        .put("/communities/1")
        .send(dummyCommunity)
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

    it("should delete community", function (done) {
      chai
        .request(server)
        .delete("/communities/1")
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

    it("should not add community", function (done) {
      chai
        .request(server)
        .post("/communities")
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

    it("should not update community", function (done) {
      // Empty body
      chai
        .request(server)
        .put("/communities/1")
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
        .put("/communities/InvalidId")
        .send(dummyCommunity)
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
        .put("/communities/-1")
        .send(dummyCommunity)
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

    it("should not delete community", function (done) {
      // Invalid id
      chai
        .request(server)
        .delete("/communities/InvalidId")
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
        .delete("/communities/-1")
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
}
