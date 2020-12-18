const express = require("express")
const listEndpoints = require("express-list-endpoints")
const cors = require("cors");
const mediasRouter = require("./services/medias")
const {
  badRequestHandler,
  notFoundHandler,
  genericErrorHandler,
} = require("./errorHandlers")

const server = express()

const port = process.env.PORT || 3002

server.use(express.json())

server.use(cors())

server.use("/medias", mediasRouter)

server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

console.log(listEndpoints(server))

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
