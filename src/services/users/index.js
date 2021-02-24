const router = require("express").Router()
const UserSchema = require("./schema")
const UserModel = require("mongoose").model("User", UserSchema)

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) throw new Error("Provide credentials")

        const user = new UserModel({ username, password })
        const { _id } = await user.save()

        res.status(201).send({ _id })

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

module.exports = router