import * as module from "module";
const require = module.createRequire(import.meta.url);

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

const dummyOffer = {
  user_id: 1,
  product_id: 2,
  product_text: "kulor",
  description: "en äcklig banan",
  quantity: 5,
  time_of_creation: new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, ""),
  time_of_purchase: new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, ""),
  time_of_expiration: new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, ""),
  imgurl: "path/to/s3",
  broken_pkg: true,
};

export function offerTests(server) {
  describe("/offers", () => {
    it("should get all offers", function (done) {
      chai
        .request(server)
        .get("/offers")
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
    it("should get offer by id", function (done) {
      chai
        .request(server)
        .get("/offers/1")
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
    it("should not get offer by id", function (done) {
      // Invalid id
      chai
        .request(server)
        .get("/offers/invalidId")
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
        .get("/offers/-1")
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

    it("should add offer", function (done) {
      chai
        .request(server)
        .post("/offers")
        .send({ offer: dummyOffer, communities: [1, 2] })
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

    it("should update offer", function (done) {
      chai
        .request(server)
        .put("/offers/1")
        .send(dummyOffer)
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

    it("should delete offer", function (done) {
      chai
        .request(server)
        .delete("/offers/1")
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

    it("should not add offer", function (done) {
      chai
        .request(server)
        .post("/offers")
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

    it("should not update offer", function (done) {
      // Empty body
      chai
        .request(server)
        .put("/offers/1")
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
        .put("/offers/InvalidId")
        .send(dummyOffer)
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
        .put("/offers/-1")
        .send(dummyOffer)
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

    it("should not delete offer", function (done) {
      // Invalid id
      chai
        .request(server)
        .delete("/offers/InvalidId")
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
        .delete("/offers/-1")
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
  describe("/offers/active", () => {
    it("should get all active offers", function (done) {
      chai
        .request(server)
        .get("/offers/active")
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
    it("should get active offers in a community", function (done) {
      chai
        .request(server)
        .get("/offers/active/1")
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
    it("should not get active offers in a community", function (done) {
      // Invalid id
      chai
        .request(server)
        .get("/offers/active/InvalidId")
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
        .get("/offers/active/-1")
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

  describe("/offers/myactive", () => {
    it("should get my active offers", function (done) {
      chai
        .request(server)
        .get("/offers/myactive/1")
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
    it("should not get my active offers", function (done) {
      // Invalid id
      chai
        .request(server)
        .get("/offers/myactive/InvalidId")
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
        .get("/offers/myactive/-1")
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
