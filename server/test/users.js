import * as module from "module";
const require = module.createRequire(import.meta.url);

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

export function userTests(server) { 
    describe('/users', function () {
        it('should get all users', (done) => {
            chai.request(server)
                .get('/users')
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                    }
                    res.should.have.status(200);
                    res.body.length.should.not.be.eql(0);
                    res.body.should.be.a('array');
                    done();
                });
        });
        it('should get user by id', (done) => {
            chai.request(server)
                .get('/users/1')
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                    }
                    res.should.have.status(200);
                    res.body.length.should.not.be.eql(0);
                    res.body.should.be.a('array');
                    done();
                });
        });
        it('should get user by email', (done) => {
            chai.request(server)
                .get('/users/email/anja.persson@icloud.com')
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                    }
                    res.should.have.status(200);
                    res.body.length.should.not.be.eql(0);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('firstname').eql('Anja');
                    done();
                });
        });
    });
}