require("dotenv").config()

const express = require("express")
const server = new express()

const userRouter = require("./services/users")

server.use(express.json())
server.use("/", userRouter)

module.exports = server