const express = require("express")
const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")

const router = express.Router()

//1. router.get("/")
router.get("/", (req, res) => {
    const studentsFilePath = path.join(__dirname, "students.json")
    const fileAsABuffer = fs.readFileSync(studentsFilePath)
    const fileAsAString = fileAsABuffer.toString()
    const studentsArray = JSON.parse(fileAsAString)

    res.send(studentsArray)
})

//2. router.get("/:id")
router.get("/:id", (req, res) => {
    const studentsFilePath = path.join(__dirname, "students.json")
    const fileAsABuffer = fs.readFileSync(studentsFilePath)
    const fileAsAString = fileAsABuffer.toString()
    const studentsArray = JSON.parse(fileAsAString)

    const idComingFromReq = req.params.id
    const student = studentsArray.filter(student => student.ID === idComingFromReq)

    res.send(student)
})

//3. router.post("/")
router.post("/", (req, res) => {
    const studentsFilePath = path.join(__dirname, "students.json")
    const fileAsABuffer = fs.readFileSync(studentsFilePath)
    const fileAsAString = fileAsABuffer.toString()
    const studentsArray = JSON.parse(fileAsAString)

    const newStudent = req.body
    newStudent.ID = uniqid()
    studentsArray.push(newStudent)

    fs.writeFileSync(studentsFilePath, JSON.stringify(studentsArray))

    res.status(201).send({ id: newStudent.ID })
})

//4. router.put("/:id")
router.put("/:id", (req, res) => {
    const studentsFilePath = path.join(__dirname, "students.json")
    const fileAsABuffer = fs.readFileSync(studentsFilePath)
    const fileAsAString = fileAsABuffer.toString()
    const studentsArray = JSON.parse(fileAsAString)

    const idComingFromReq = req.params.id
    const newStudentsArray = studentsArray.filter(student => student.ID !== idComingFromReq)

    const modifiedStudent = req.body
    modifiedStudent.ID = req.params.id
    newStudentsArray.push(modifiedStudent)

    fs.writeFileSync(studentsFilePath, JSON.stringify(newStudentsArray))

    res.send("Student is modified")
})

//5. router.delete("/:id")
router.delete("/:id", (req, res) => {
    const studentsFilePath = path.join(__dirname, "students.json")
    const fileAsABuffer = fs.readFileSync(studentsFilePath)
    const fileAsAString = fileAsABuffer.toString()
    const studentsArray = JSON.parse(fileAsAString)

    const idComingFromReq = req.params.id
    const newStudentsArray = studentsArray.filter(student => student.ID !== idComingFromReq)

    fs.writeFileSync(studentsFilePath, JSON.stringify(newStudentsArray))

    res.status(204).send()
})

module.exports = router