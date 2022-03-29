process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
const dbEndpoints = require('./db-endpoints');



chai.use(chaiHttp);

describe("", () => {
	let server;
	before(() => {
		server = require('../server');
	});

	after(() => {
		server.close();
	})
	
	describe('Database endpoints', dbEndpoints);
});