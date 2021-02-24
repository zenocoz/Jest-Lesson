const router = require("express").Router();
const fetch = require("node-fetch")
router.get("/", async (req, res) => {
    try {
        if (req.body.token !== "FAKE_TOKEN") throw new Error("Token invalid.");

        const response = await fetch("https://cataas.com/cat?json=true")
        const { url } = await response.json()

        res.status(200).send({ url })

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

module.exports = router