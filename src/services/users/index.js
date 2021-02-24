const router = require("express").Router()
const UserSchema = require("./schema")
const UserModel = require("mongoose").model("User", UserSchema)

router.post("/", async (req, res) => {
    const user = new UserModel(req.body)
    const { _id } = await user.save()

    res.status(201).send({ _id })
})

module.exports = router