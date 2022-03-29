import * as module from "module";
const require = module.createRequire(import.meta.url);

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

export function communityTests(server) {

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
