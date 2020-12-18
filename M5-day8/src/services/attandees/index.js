const express = require("express")
const uniqid = require("uniqid");
const {
  getAttandees,
  writeAttandees
} = require("../../fsUtilities");

const attandeesRouter = express.Router()

attandeesRouter.post("/", async (req, res, next) => {
  try {
    const attandeesDB = await getAttandees()
    const newAttandee = {
      ...req.body,
      attandeeId: uniqid(),
      createdAt: new Date(),
    };
    attandeesDB.push(newAttandee);
    await writeAttandees(attandeesDB);
    res.status(201).send(attandeesDB);
  } catch (error) {
    console.log(error)
    const err = new Error
    next(err)
  }
})

attandeesRouter.get("/csv", async (req))

module.exports = attandeesRouter