
process.env.NODE_ENV = 'test';
import { createRequire } from "module";
const require = createRequire(import.meta.url);

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
import { dbEndpoints } from './db-endpoints.js';
import { server } from '../server.js';


describe("", () => {
	
	describe('Database endpoints', () => { dbEndpoints(server) });
});