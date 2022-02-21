const request_ganjar = require("supertest")("http://barru.pythonanywhere.com"); 
const expect = require("chai").expect; 

describe("Verify Login for User", function () { 

it("Succes Login with valid email & password ", async function () { 
 const response = await request_ganjar 
 .post("/login")
 .send({ email: "ganjar@ganjar.co", password: "ganjar" });

 expect(response.body.status).to.eql('SUCCESS_LOGIN');
 expect(response.body.data).to.eql('Welcome ganjar');
 expect(response.body.message).to.eql('Anda Berhasil Login');
 expect(response.body).to.include.keys("data", "message", "status"); 
 });

it("Failed Login with empty email & password ", async function () { 
 const response = await request_ganjar 
 .post("/login")
 .send({ email: "", password: "" });

 expect(response.body.status).to.eql('FAILED_LOGIN');
 expect(response.body.data).to.eql('Email tidak valid');
 expect(response.body.message).to.eql('Cek kembali email anda');
 expect(response.body).to.include.keys("data", "message", "status"); 
 });

it("Failed Login with empty email", async function () { 
 const response = await request_ganjar 
 .post("/login")
 .send({ email: "", password: "ganjar" });

 expect(response.body.status).to.eql('FAILED_LOGIN');
 expect(response.body.data).to.eql('Email tidak valid');
 expect(response.body.message).to.eql('Cek kembali email anda');
 expect(response.body).to.include.keys("data", "message", "status"); 
 });

it("Failed Login with symbol password", async function () { 
 const response = await request_ganjar 
 .post("/login")
 .send({ email: "ganjar@ganjar.com", password: "g@nj@r" });

 expect(response.body.status).to.eql('FAILED_LOGIN');
 expect(response.body.data).to.eql('Password tidak valid');
 expect(response.body.message).to.eql('Tidak boleh mengandung symbol');
 expect(response.body).to.include.keys("data", "message", "status"); 
 });

it("Failed Login with empty password", async function () { 
 const response = await request_ganjar 
 .post("/login")
 .send({ email: "ganjar@ganjar.com", password: "" });

 expect(response.body.status).to.eql('FAILED_LOGIN');
 expect(response.body.data).to.eql("User's not found");
 expect(response.body.message).to.eql('Email atau Password Anda Salah');
 expect(response.body).to.include.keys("data", "message", "status"); 
 });

it("Failed Login with email filled with phone number", async function () { 
 const response = await request_ganjar 
 .post("/login")
 .send({ email: "012345678", password: "ganjar" });

 expect(response.body.status).to.eql('FAILED_LOGIN');
 expect(response.body.data).to.eql('Email tidak valid');
 expect(response.body.message).to.eql('Cek kembali email anda');
 expect(response.body).to.include.keys("data", "message", "status"); 
 });

it("Failed Login with password filled with random number", async function () { 
 const response = await request_ganjar 
 .post("/login")
 .send({ email: "ganjar@ganjar.com", password: "012345678" });

 expect(response.body.status).to.eql('FAILED_LOGIN');
 expect(response.body.data).to.eql("User's not found");
 expect(response.body.message).to.eql('Email atau Password Anda Salah');
 expect(response.body).to.include.keys("data", "message", "status"); 
 });


it("Failed Login with random but valid email format", async function () { 
 const response = await request_ganjar 
 .post("/login")
 .send({ email: "ggg@ganjar.com", password: "ganjar" });

 expect(response.body.status).to.eql('FAILED_LOGIN');
 expect(response.body.data).to.eql("User's not found");
 expect(response.body.message).to.eql('Email atau Password Anda Salah');
 expect(response.body).to.include.keys("data", "message", "status"); 
 });

it("Failed Login with valid email but vocal letters in password turned uppercased", async function () { 
 const response = await request_ganjar 
 .post("/login")
 .send({ email: "ganjar@ganjar.com", password: "gAnjAr" });

expect(response.body.status).to.eql('FAILED_LOGIN');
 expect(response.body.data).to.eql("User's not found");
 expect(response.body.message).to.eql('Email atau Password Anda Salah');
 expect(response.body).to.include.keys("data", "message", "status"); 
 });

it("Failed Login with valid email but added 1 spaces in the end", async function () { 
 const response = await request_ganjar 
 .post("/login")
 .send({ email: "ganjar@ganjar.com ", password: "ganjar" });

 expect(response.body.status).to.eql('FAILED_LOGIN');
 expect(response.body.data).to.eql('Email tidak valid');
 expect(response.body.message).to.eql('Cek kembali email anda');
 expect(response.body).to.include.keys("data", "message", "status"); 
 });
});