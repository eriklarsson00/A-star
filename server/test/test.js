import { createRequire } from "module";
const require = createRequire(import.meta.url);

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
import { communityTests } from './communities.js';
import { userTests } from './users.js';
import { server } from '../server.js';

describe("", () => {
	describe('Database endpoints', () => { 
		userTests(server);
		communityTests(server);
	});
});