import supertest from "supertest";
import app from "../src/app";

const server = supertest(app);

describe("api", () => {

    it("/health", async () => {
        const result = await server.get("/health");
        console.log(result);

        const { statusCode } = result;
        expect(statusCode).toBe(200);
    })

    it("should return 201 when inserting a fruit /post", async () => {

        const { statusCode } = await server.post("/fruits").send({
            name: "Pitaya",
            price: 5
        });

        expect(statusCode).toBe(201);

    })

    it("should return 409 when inserting a fruit that is already registered /post",async () => {
        const { statusCode } = await server.post("/fruits").send({
            name: "Pitaya",
            price: 5
        });

        expect(statusCode).toBe(409);
    })

    it("should return 422 when inserting a fruit with data missing /post",async () => {
        const { statusCode } = await server.post("/fruits").send({
            name: "Pitaya",
        });

        expect(statusCode).toBe(422);
    })

    it("shoud return 404 when trying to get a fruit that doesn't exists /get /:id", async () => {
        const result = await server.get("/fruits/7");
        console.log(result);

        const { statusCode } = result;
        expect(statusCode).toBe(404);
    })

    it("shoud return 404 when trying to get a fruit that doesn't exists /get /:id", async () => {
        const result = await server.get("/fruits/7");
        console.log(result);

        const { statusCode } = result;
        expect(statusCode).toBe(404);
    })

    it("should return 400 when id param is not valid /:id", async () => {
        const result = await server.get("/fruits/alooo");
        console.log(result);

        const { statusCode } = result;
        expect(statusCode).toBe(400);
    })

    it("should return a fruit given an id /get /:id", async () => {
        const result = await server.get("/fruits/1");
        console.log(result);

        const { statusCode, body } = result;
        expect(statusCode).toBe(200);
        expect(body).toEqual({
            id:1,
            name: "Pitaya",
            price: 5
        });
    })

    it("get all fruits", async () => {
        const result = await server.get("/fruits");
        console.log(result);
        const { statusCode, body } = result;

        expect(body).toHaveLength(1);
        expect(statusCode).toBe(200);
        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number)
                })
            ])
        )
    })

})
