const router = require("express").Router()
const UserSchema = require("./schema")
const UserModel = require("mongoose").model("User", UserSchema)

module.exports = router