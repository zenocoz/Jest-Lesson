const server = require("../src/server")
const request = require("supertest")(server)
const mongoose = require("mongoose")
const UserSchema = require("../src/services/users/schema")
const UserModel = mongoose.model("User", UserSchema)

beforeAll((done) => {
    mongoose.connect(`mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PWD}@cluster0.mu4m4.mongodb.net/test?retryWrites=true&w=majority`,
        // mongoose.connect(`${process.env.ATLAS_URL}/test`,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => {
            console.log("Successfully connected to Atlas.")
            console.log({
                user: process.env.ATLAS_USER,
                password: process.env.ATLAS_PWD
            })
            done()
        });
});

afterAll((done) => {
    console.log(mongoose.connection)
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    });
    // mongoose.connection.close(() => done())
});

describe('I: Testing a test', () => {
    it("should test that true is true", () => {
        expect(true).toBe(true)
    })

})

describe('II: Testing user creation and login', () => {
    it("should test that the test route is returning 200", async () => {
        const response = await request.get("/test")
        const { message } = response.body
        expect(message).toEqual("Test is success")
    })

    it("should test that we can correctly create a user with the provided data", async () => {
        const body = {
            username: "luisanton.io",
            password: "password"
        }
        const response = await request.post("/").send(body)
        const { _id } = response.body

        expect(_id).not.toBeNull()

        const newUser = await UserModel.findById(_id)
        expect(newUser).not.toBeNull()
        expect(newUser.username).toEqual(body.username)
    })

    // login with correct credentials
    // -> has to receive a JWT token.

    it("should test that the login service is working", async () => {
        const body = {
            username: "luisanton.io",
            password: "password"
        }

        const response = await request.post("/login").send(body)
        const { token } = response.body

        expect(token).toBe("FAKE_TOKEN")
    })
    // login with incorrect credentials
    // -> has to receive a 400 response
    it("should test that the login service is refusing login with wrong credentials", async () => {
        const body = {
            username: "luisanton.io",
            password: "password2"
        }

        const response = await request.post("/login").send(body)
        const { token } = response.body

        expect(token).toBe(undefined)
        expect(response.status).toBe(400)
    })

    it("should test that the login service needs the correct data in input", async () => {
        const body = {
            username: "luisanton.io"
        }

        const response = await request.post("/login").send(body)
        const { token } = response.body

        expect(token).toBe(undefined)
        expect(response.status).toBe(400)
    })



})

