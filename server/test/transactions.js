import * as module from "module";
const require = module.createRequire(import.meta.url);

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

const dummyTransaction = {
  request_id: 2,
  responder_id: 2,
  time_of_creation: new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, ""),
  time_of_expiration: new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, ""),
};

export function transactionTests(server) {
  describe("/transactions", () => {
    it("should get all transactions", function (done) {
      chai
        .request(server)
        .get("/transactions")
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
    it("should get transaction by id", function (done) {
      chai
        .request(server)
        .get("/transactions/2")
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
    it("should not get transaction by id", function (done) {
      // Invalid id
      chai
        .request(server)
        .get("/transactions/invalidId")
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
        .get("/transactions/-1")
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

    it("should delete transaction", function (done) {
      chai
        .request(server)
        .delete("/transactions/1")
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

    it("should add transaction", function (done) {
      let newTransaction = { ...dummyTransaction };
      newTransaction.request_id = 7;
      chai
        .request(server)
        .post("/transactions")
        .send(newTransaction)
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

    it("should update transaction", function (done) {
      chai
        .request(server)
        .put("/transactions/1")
        .send(dummyTransaction)
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

    it("should not add transaction", function (done) {
      chai
        .request(server)
        .post("/transactions")
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

    it("should not update transaction", function (done) {
      // Empty body
      chai
        .request(server)
        .put("/transactions/1")
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
        .put("/transactions/InvalidId")
        .send(dummyTransaction)
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
        .put("/transactions/-1")
        .send(dummyTransaction)
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

    it("should not delete transaction", function (done) {
      // Invalid id
      chai
        .request(server)
        .delete("/transactions/InvalidId")
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
        .delete("/transactions/-1")
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

  describe("/transactions/community", () => {
    it("should get all communities for a transactions", function (done) {
      chai
        .request(server)
        .get("/transactions/community/2")
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
    it("should not get all communities for a transaction", function (done) {
      // Invalid id
      chai
        .request(server)
        .get("/transactions/community/InvalidId")
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
        .get("/transactions/community/-1")
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

  describe("/transactions/responder", () => {
    it("should get the user for a transaction", function (done) {
      chai
        .request(server)
        .get("/transactions/responder/1")
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
    it("should not get the user for a transaction", function (done) {
      // Invalid id
      chai
        .request(server)
        .get("/transactions/responder/InvalidId")
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
        .get("/transactions/responder/-1")
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

  describe("/transactions/lister", () => {
    // ?
  });

  describe("/transactions/accepted/user", () => {
    it("should get accepted transactions for a user", function (done) {
      chai
        .request(server)
        .get("/transactions/accepted/user/1")
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
    it("should not get accepted transactions for a user", function (done) {
      // Invalid id
      chai
        .request(server)
        .get("/transactions/accepted/user/InvalidId")
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
        .get("/transactions/accepted/user/-1")
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

  describe("/transactions/pending/user", () => {
    it("should get accepted transactions for a user", function (done) {
      chai
        .request(server)
        .get("/transactions/pending/user/1")
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
    it("should not get pending transactions for a user", function (done) {
      // Invalid id
      chai
        .request(server)
        .get("/transactions/pending/user/InvalidId")
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
        .get("/transactions/pending/user/-1")
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

  describe("/transactions/user", () => {
    it("should get transactions for a user", function (done) {
      chai
        .request(server)
        .get("/transactions/user/1")
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
    it("should not get transactions for a user", function (done) {
      // Invalid id
      chai
        .request(server)
        .get("/transactions/user/InvalidId")
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
        .get("/transactions/user/-1")
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
