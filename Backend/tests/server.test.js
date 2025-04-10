const request = require("supertest");
const app = require("../server");

describe("Auth API Endpoints", () => {
    test("register user successfully", async () => {
        const response = await request(app).post("/register").send({
            usn: "test123",
            college: "XYZ College",
            email: "test@example.com",
            fullname: "Test User",
            password: "password123"
        });

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("Registration successful");
    });

    test("login user successfully", async () => {
        const response = await request(app).post("/login").send({
            usn: "test123",
            password: "password123"
        });

        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    test("fail login with incorrect password", async () => {
        const response = await request(app).post("/login").send({
            usn: "test123",
            password: "wrongpassword"
        });

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Invalid password");
    });
});