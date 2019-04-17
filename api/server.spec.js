const request = require("supertest");
const server = require("./server.js");

const db = require("../data/dbConfig");

afterEach(async () => {
  await db("meals").truncate();
});

let token;
let user = {
  username: "sansa",
  password: "password"
}
beforeAll((done) => {
  request(server)
    .post('/api/auth/login')
    .send({
      username: user.username,
      password: user.password,
    })
    .end((err, res) => {
      token = res.body.token; 
      done();
    });
});


describe("server.js", () => {
  describe("GET /api/meals", () => {

    it("should set testing enviroment", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });

    it("should return JSON", () => {
      return request(server)
        .get("/api/meals")
        .then(res => {
          expect(res.type).toBe("application/json");
        });
    });

    it("should return status code 401 when not authorized.", () => {
      return request(server)
        .get("/api/meals")
        .then(res => {
          expect(res.status).toBe(401);
        });
    });

    // it("should return status code 200 when authorized.", done => {
    //   return request(server)
    //     .get("/api/meals")
    //     .set('Authorization', 'Bearer ' + token)
    //     .expect(200, done)
        // .then(res => {
        //   expect(res.status, done).toBe(200);
        // });
    // });
  });
});
