const router = require("express").Router()
const UserSchema = require("./schema")
const UserModel = require("mongoose").model("User", UserSchema)

router.get("/test", (req, res) => {
    res.status(201).send({ message: "Test is success" })
})

router.post("/", async (req, res) => {
    const user = new UserModel(req.body)
    const { _id } = await user.save()

    res.status(201).send({ _id })
})

router.post("/login", async (req, res) => {
    if (!req.body.username) res.status(400).send()

    const user = await UserModel.findOne({
        username: req.body.username
    })

    if (user.password === req.body.password)
        res.status(200).send({
            "token": "FAKE_TOKEN"
        })
    else res.status(400).send({ message: "No username/password match." })
})

module.exports = router