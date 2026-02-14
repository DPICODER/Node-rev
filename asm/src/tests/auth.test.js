const request = require('supertest');
const {app} = require('../app');

describe("Auth API",()=>{
    it("should register a new user",async()=>{
        //step 1: register a user first
        await request(app)
        .post('/api/auth/register')
        .send({
            email:"loginTest@gmail.com",
            userName:"loginTestUser",
            firstName:"logs",
            lastName:"inss",
            password:"testPassword"
        });

        //step 2: Attempt Login
        const res = await request(app)
        .post('/api/auth/login')
        .send({
            userName:"loginTestUser",
            password:"testPassword"
        })

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
        expect(res.body.user).toBeDefined();
        expect(res.body.user.email).toBe("logintest@gmail.com");
    });
});
