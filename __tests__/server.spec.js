const request = require("supertest");
const db = require("../data/dbConfig.js");
const server = require("../api/server.js");

//GLOBAL
let token;

beforeAll(async done => {
  await db("users").truncate();
  request(server)
    .post("/api/auth/register")
    .send({
      username: "user",
      password: "pw"
    })
    .end((err, response) => {
      //RESPONSE LOG IF NEEDED
      //    console.log(response)
      token = response.body.token; // save the token!
      done();
    });
});

//TEST SUITES
describe("Server", () => {
  //ROUTEs SUITE
  describe("Routes", () => {
    it("GET meals should return JSON", () => {
      return request(server)
        .get("/api/meals")
        .then(res => {
          expect(res.type).toBe("application/json");
        });
    });
    // token not being sent - should respond with a 401
    it("GET restricted meals, should return status 401 on get request", async () => {
      const res = await request(server).get("/api/meals");
      expect(res.status).toBe(401);
    });
    // send the token - should respond with a 200
    it("GET all restricted meals,It responds with JSON status 200", () => {
      console.log("TOKEN", token);
      return request(server)
        .get("/api/meals")
        .set("Authorization", `${token}`)
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.type).toBe("application/json");
        });
    });
  });
});
