const request = require("supertest");
const app = require("../server"); 
const mongoose = require("mongoose");

describe("Record API", () => {

    let token;

    beforeAll(async () => {
        // login to get token
        const res = await request(app)
            .post("/api/users/login")
            .send({ email: "atul@gmail.com" });

        token = res.body.token;
    });

    test("Create Record", async () => {
        const res = await request(app)
            .post("/api/records")
            .set("Authorization", `Bearer ${token}`)
            .send({
                amount: 100,
                type: "income",
                category: "test",
                note: "jest test"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.amount).toBe(100);
    });

    test("Get Records", async () => {
        const res = await request(app)
            .get("/api/records")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
afterAll(async () => {
    await mongoose.connection.close();
});
});