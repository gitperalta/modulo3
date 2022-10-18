const session = require("supertest");
const app = require("../index.js"); // Importo el archivo de entrada del server de express.
const agent = session(app);

describe("Test de APIS", () => {
  describe("POST /numString", () => {
    it("response with status 200", () => {
      agent.post("/numString").send({ s: "sebastian" }).expect(200);
    });
    it("response with status 400 if the string is a number", () => {
      agent.post("/numString").send({ s: 4 }).expect(400);
    });
    it("response with status 400 if the string is empy", () => {
      agent.post("/numString").send({ s: "" }).expect(400);
    });
    it("response with 5 if recieve `sebas`", () => {
      agent
        .post("/numString")
        .send({ s: "sebas" })
        .then((res) => expect(res.body.result).toEqual(5));
    });
  });

  describe("POST /pluck", () => {
    const array = [
      { name: "resaltador", price: 10 },
      { name: "lapicera", price: 5 },
      { name: "cuadernillo", price: 100 },
    ];
    it("responds with status 200", () => {
      agent.post("/pluck").send({ array, prop: "name" }).expect(200);
    });
    it("responds with 404 if array is not array", () => {
      agent
        .post("/pluck")
        .send({ array: "sebastian", prop: "name" })
        .expect(404);
    });
    it("responds with [`resaltador`, `lapicera`, `cuadernillo`] if called with the array { name: `lapicera`, price: 5 }, { name: `cuadernillo`, price: 100 }]", () => {
      agent
        .post("/pluck")
        .send({ array, prop: "name" })
        .then((res) =>
          expect(res.body.result).toEqual([
            "resaltador",
            "lapicera",
            "cuadernillo",
          ])
        );
    });
  });

  describe("GET /", () => {
    it("responds with 200", () => agent.get("/").expect(200));
    it("responds with and object with message `hola`", () =>
      agent.get("/").then((res) => {
        expect(res.body.message).toEqual("hola");
      }));
  });

  describe("GET /test", () => {
    it("responds with 200", () => agent.get("/test").expect(200));
    it("responds with an object with message `test`", () =>
      agent.get("/test").then((res) => {
        expect(res.body.message).toEqual("test");
      }));
  });

  describe("POST /sum", () => {
    it("responds with 200", () =>
      agent.post("/sum").send({ a: 1, b: 1 }).expect(200));
    it("responds with the sum of 2 and 3", () =>
      agent
        .post("/sum")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(5);
        }));
    it("responds with the sum of 0 and 3", () =>
      agent
        .post("/sum")
        .send({ a: 0, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(3);
        }));
  });

  describe("POST /product", () => {
    it("responds with 200", () =>
      agent.post("/product").send({ a: 2, b: 2 }).expect(200));
    it("responds with 400", () =>
      agent.post("/product").send({ a: 2, b: "efn" }).expect(400));
    it("responds with 400", () => agent.post("/product").expect(400));
    it("responds with the product of 2 and 3", () =>
      agent
        .post("/product")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(6);
        }));
    it("responds with the product of 0 and 3", () =>
      agent
        .post("/product")
        .send({ a: 0, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(0);
        }));
  });

  describe("POST /sumArray", () => {
    it("responds with 400", () => agent.post("/sumArray").expect(400));
    it("responds with 200", () =>
      agent.post("/sumArray").send({ array: [], num: 0 }).expect(200));
    it("should response with true if the combination of two numbers in the array sums de num", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 13 })
        .then((res) => {
          expect(res.body.result).toEqual(true);
        }));
    it("should response with false if no combination of two numbers in the array sums de num", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 23 })
        .then((res) => {
          expect(res.body.result).toEqual(false);
        }));
  });
});
