import * as module from "module";
const require = module.createRequire(import.meta.url);

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

export function userTests(server) {
  describe("/users", function () {
    it("should get all users", (done) => {
      chai
        .request(server)
        .get("/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.text.length.should.not.be.eql(0);
          res.body.should.be.a("array");
          done();
        });
    });
    it("should get user by id", (done) => {
      chai
        .request(server)
        .get("/users/1")
        .end((err, res) => {
          res.should.have.status(200);
          res.text.length.should.not.be.eql(0);
          res.body.should.be.a("array");
          done();
        });
    });
    it("should get user by email", (done) => {
      chai
        .request(server)
        .get("/users/email/anja.pärsson@icloud.com")
        .end((err, res) => {
          res.should.have.status(200);
          res.text.length.should.not.be.eql(0);
          res.body.should.be.a("array");
          res.body[0].should.have.property("firstname").eql("Anja");
          done();
        });
    });
    it("should not get user by id", (done) => {
      chai
        .request(server)
        .get("/users/-1")
        .end((err, res) => {
          res.should.have.status(200);
          res.text.length.should.be.eql(2);
          res.body.should.be.a("array");
          done();
        });
    });
    it("should not get user by email", (done) => {
      chai
        .request(server)
        .get("/users/email/anja.ickebefintligsson@icloud.com")
        .end((err, res) => {
          res.should.have.status(200);
          res.text.length.should.be.eql(2);
          res.body.should.be.a("array");
          done();
        });
    });
    it("should handle bad email", (done) => {
      chai
        .request(server)
        .get("/users/email/dåligEmail")
        .end((err, res) => {
          res.should.have.status(200);
          res.text.length.should.be.eql(2);
          res.body.should.be.a("array");
          done();
        });
    });
    it("should handle bad id", (done) => {
      chai
        .request(server)
        .get("/users/dåligtId")
        .end((err, res) => {
          res.should.have.status(400);
          res.body.length.should.not.be.eql(0);
          res.body.should.be.a("string");
          done();
        });
    });

    it("should add user", (done) => {
      chai
        .request(server)
        .post("/users")
        .send({
          firstname: "Filip",
          lastname: "Palmqvist",
          number: "0735959908",
          email: "filip.palmqvist@icloud.com",
          adress: "Råbyvägen 53 B, 75429 Uppsala",
          location: "Gränby",
          imgurl: null,
          rating: 10,
          raters: 1000,
          given: 4,
          taken: 5,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.text.length.should.not.be.eql(0);
          res.body.should.be.a("string");
          done();
        });
    });

    it("should update user", (done) => {
      chai
        .request(server)
        .put("/users/1")
        .send({
          firstname: "Filip",
          lastname: "Palmqvist",
          number: "0735959908",
          email: "filip.palmqvist@icloud.com",
          adress: "Råbyvägen 53 B, 75429 Uppsala",
          location: "Gränby",
          imgurl: "path/to/s3/bucket",
          rating: 10,
          raters: 1000,
          given: 4,
          taken: 5,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.text.length.should.not.be.eql(0);
          res.body.should.be.a("string");
          done();
        });
    });

    it("should delete user", (done) => {
      chai
        .request(server)
        .delete("/users/1")
        .end((err, res) => {
          res.should.have.status(200);
          res.text.length.should.not.be.eql(0);
          res.body.should.be.a("string");
          done();
        });
    });

    it("should not update user", (done) => {
      const data = {
        firstname: "Dummy",
        lastname: "Person",
        number: "0735959908",
        email: "dummy.person@gmail.com",
        adress: "Råbyvägen 53 B, 75429 Uppsala",
        location: "Gränby",
        imgurl: "path/to/s3/bucket",
        rating: 10,
        raters: 1000,
        given: 4,
        taken: 5,
      };

      // Invalid id
      chai
        .request(server)
        .put("/users/invalidId")
        .send(data)
        .end((err, res) => {
          res.should.have.status(400);
          res.text.length.should.not.be.eql(0);
          res.body.should.be.a("string");
        });

      // Bad id
      chai
        .request(server)
        .put("/users/-1")
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.text.length.should.not.be.eql(0);
          res.body.should.be.a("string");
          done();
        });
    });
    it("should not delete user", (done) => {
      // Invalid id
      chai
        .request(server)
        .delete("/users/strangeId")
        .end((err, res) => {
          res.should.have.status(400);
          res.text.length.should.not.be.eql(0);
          res.body.should.be.a("string");
        });

      // Bad id
      chai
        .request(server)
        .delete("/users/-1")
        .end((err, res) => {
          res.should.have.status(200);
          res.text.length.should.not.be.eql(0);
          res.body.should.be.a("string");
          done();
        });
    });
  });

  describe("/users/community", () => {
    it("should add user to community", (done) => {
      chai
        .request(server)
        .post("/users/community")
        .send({ user_id: 2, community_id: 3 })
        .end((err, res) => {
          res.should.have.status(200);
          res.text.length.should.not.be.eql(0);
          res.body.should.be.a("string");
          done();
        });
    });
    it("should get user to community", (done) => {
      chai
        .request(server)
        .get("/users/community/1")
        .end((err, res) => {
          res.should.have.status(200);
          res.text.length.should.not.be.eql(0);
          res.body.should.be.a("array");
          done();
        });
    });

    it("should not add user to community", (done) => {
      // Invalid ids
      chai
        .request(server)
        .post("/users/community")
        .send({ user_id: "invalidId1", community_id: "invalidId2" })
        .end((err, res) => {
          res.should.have.status(400);
          res.text.length.should.not.be.eql(0);
          res.body.should.be.a("string");
        });

      // Bad ids
      chai
        .request(server)
        .post("/users/community")
        .send({ user_id: -1, community_id: -3 })
        .end((err, res) => {
          res.should.have.status(500);
          res.text.length.should.not.be.eql(0);
          res.body.should.be.a("object");
          done();
        });
    });
    it("should not get user to community", (done) => {
      // Invalid id
      chai
        .request(server)
        .get("/users/community/invalidId")
        .end((err, res) => {
          res.should.have.status(400);
          res.text.length.should.not.be.eql(0);
          res.body.should.be.a("string");
        });

      // Bad id
      chai
        .request(server)
        .get("/users/community/-1")
        .end((err, res) => {
          res.should.have.status(200);
          res.text.length.should.not.be.eql(0);
          res.body.should.be.a("array");
          done();
        });
    });
  });
}
