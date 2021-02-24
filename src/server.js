require("dotenv").config()

const express = require("express")
const server = new express()

const userRouter = require("./services/users")
const catsRouter = require("./services/cats")

server.use(express.json())
server.use("/", userRouter)
server.use("/cats", catsRouter)

module.exports = server