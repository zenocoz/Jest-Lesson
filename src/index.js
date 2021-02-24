const server = require("./server")
const mongoose = require("mongoose")
const { PORT } = process.env
const list = require("express-list-endpoints")

mongoose
  .connect(process.env.COMPASS_URL + "/jest-hw", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    server.listen(PORT, () => {
      console.log(list(server))
      console.log("Server listening on port " + PORT)
    })
  )
