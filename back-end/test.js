const request = require("supertest");
const app = require("./app");
var should = require("should");
describe("GET /", function() {
	it("respond with json localhost", function(done) {
		request(app)
			.get("/")
			.set("Accept", "application/json")
			.set("tester", true)
			.expect("Content-Type", /json/)
			.expect(200)
			.end((err, res) => {
				res.status.should.equal(200);
				res.body.error.should.equal(false);
				done();
			});
	});
	describe("GET /v1", function() {
		it("respond with json home API", function(done) {
			request(app)
				.get("/v1")
				.set("Accept", "application/json")
				.set("tester", true)
				.expect("Content-Type", /json/)
				.expect(200)
				.end((err, res) => {
					res.status.should.equal(200);
					res.body.error.should.equal(false);
					done();
				});
		});
		describe("GET /v1/location", function() {
			it("respond with json loction IP-API", function(done) {
				request(app)
					.get("/v1/location")
					.set("tester", true)
					.set("Accept", "application/json")
					.expect("Content-Type", /json/)
					.expect(200)
					.end((err, res) => {
						res.status.should.equal(200);
						res.body.error.should.equal(false);
						done();
					});
			});
		});
		describePlus("current");
		describePlus("forecast");
	});
});

function describePlus(parm) {
	describe(`GET /v1/${parm}`, function() {
		it(`respond with json ${parm} IP-API`, function(done) {
			request(app)
				.get(`/v1/${parm}`)
				.set("tester", true)
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.expect(200)
				.end((err, res) => {
					res.status.should.equal(200);
					res.body.error.should.equal(false);
					done();
				});
		});
		describe(`GET /v1/${parm}/London`, function() {
			it(`respond with json ${parm} city London`, function(done) {
				request(app)
					.get(`/v1/${parm}/London`)
					.set("tester", true)
					.set("Accept", "application/json")
					.expect("Content-Type", /json/)
					.expect(200)
					.end((err, res) => {
						res.status.should.equal(200);
						res.body.error.should.equal(false);
						done();
					});
			});
		});
	});
}
