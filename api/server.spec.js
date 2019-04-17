const request = require("supertest");
const server = require("./server.js");

const db = require("../data/dbConfig");
const restricted = require("../auth/restricted");

 
afterEach(async () => {
  await db("meals").truncate();
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

    // it("should return status code 200 when authorized.", restricted, () => {
    //   return request(server)
    //     .get("/api/meals")
    //     .then(res => {
    //       expect(res.status).toBe(401);
    //     });
    // });

  });
});
