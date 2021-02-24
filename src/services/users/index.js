const router = require("express").Router()
const UserSchema = require("./schema")
const UserModel = require("mongoose").model("User", UserSchema)
const { generateAccessToken } = require("../auth")

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) throw new Error("Provide credentials")

    const user = new UserModel({ username, password })
    const { _id } = await user.save()

    res.status(201).send({ _id })
  } catch (error) {
    res.status(400).send({
      message: error.message,
      errorCode: "wrong_credentials",
    })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) throw new Error("Provide credentials")

    const user = await UserModel.findOne({ username })

    const accessToken = await generateAccessToken({ username, password })

    user.password === password
      ? res.status(200).send({ token: accessToken })
      : res.status(400).send({ message: "No username/password match" })
  } catch (error) {
    res.status(400).send({
      message: error.message,
      errorCode: "wrong_credentials ",
    })
  }
})

module.exports = router
