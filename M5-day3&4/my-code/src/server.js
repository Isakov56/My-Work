const express = require("express")
const listEndPoints = require("express-list-endpoints")
const studentsRoutes = require("./students")
const {
    notFoundHandler,
    unauthorizedHandler,
    forbiddenHandler,
    catchAllHandler,
  } = require("./errorHandling")

const server = express()

const port = process.env.PORT || 3002

server.use(express.json())

server.use("/students", studentsRoutes)

server.use(notFoundHandler)
server.use(unauthorizedHandler)
server.use(forbiddenHandler)
server.use(catchAllHandler)

console.log(listEndPoints(server))

server.listen(port, () => console.log("server is running on port ", port))