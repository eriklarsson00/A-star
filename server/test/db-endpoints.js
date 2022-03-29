//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

module.exports = (server) => {
    describe('/users', function () {
        it('should get all users', function (done) {
            chai.request(server)
                .get('/users')
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.not.be.eql(0);
                    done();
                });
        });
        it('should get user by id', function (done) {
            chai.request(server)
                .get('/users/1')
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.not.be.eql(0);
                    done();
                });
        });
        it('should get user by name', function (done) {
            chai.request(server)
                .get('/users/name/anja')
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('firstname').eql('Anja');
                    res.body.length.should.not.be.eql(0);
                    done();
                });
        });
    });

    describe('/communities', () => {
        it('should get all communities', function (done) {
            chai.request(server)
                .get('/communities')
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.not.be.eql(0);
                    done();
                });
        });
    });
}