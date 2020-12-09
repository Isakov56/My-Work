const express = require("express")
const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")

const router =  express.Router()

const readFile = (fileName) => {
    const buffer =fs.readFileSync(path.join(__dirname, fileName))
    const fileContent = buffer.toString()
    return JSON.parse(fileContent)
}

router.get("/", (req, res) => {
    try{
        const studentsDB = redaFile("students.json")
        if(req.query && req.query.name){
            const filteredStudents = studentsDB.filter(student => {
                student.hasOwnProperty("name") &&
                student.name.toLowercase() === req.query.name.ToLowercase()
            })
            res.send(filteredStudents)
        }else{
            res.send(studentsDB)
        }
    }catch(error){console.log(error)}
})

router.get("/:id", (req, res) => {})

router.post("/", (req, res) => {})

router.put("/:id", (req, res) => {})

router.delete("/:id", (req, res) => {})

module.exports = router