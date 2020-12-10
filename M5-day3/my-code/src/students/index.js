const express = require("express")
const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")
const { readDB, writeDB } = require("../library/utilities")

const { check, validationResult } = require("express-validator")
const { send } = require("process")

const router =  express.Router()

const filePathS = path.join(__dirname, "students.json")

const readFile = (fileName) => {
    const buffer =fs.readFileSync(path.join(__dirname, fileName))
    const fileContent = buffer.toString()
    return JSON.parse(fileContent)
}

router.get("/", async (req, res, next) => {
    try{
        const studentsDB = await readDB(filePathS)
        if(req.query && req.query.name){
            const filteredStudents = studentsDB.filter(student => {
                student.hasOwnProperty("name") &&
                student.name.toLowercase() === req.query.name.ToLowercase()
            })
            res.send(filteredStudents)
        }else{
            res.send(studentsDB)
        }
    }catch(error){next(error)}
})

router.get("/:id", async (req, res, next) => {
    try{
        const studentsDB = await readDB(filePathS)
        const student = studentsDB.filter(student => student.ID === req.params.id)
        if(student.length > 0){
            res.send(student)
        } else{
            const err = new Error()
            err.httpStatusCode = 404
            next(err)
        }
    }catch(error){
        next(error)
    }
})

router.post("/",
[ check("name").isLength({ min: 3}).withMessage("Damn! Name too short").exists().withMessage("Name is required!")], 
async (req, res, next) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const err = new Error()
            err.message = errors
            err.httpStatusCode = 400
            next(err)
        }else{
            const studentsDB = await readDB(filePathS)
            const newStudent = {
                ...req.body,
                ID: uniqid(),
                modifiedAt: new Date()
            }
            studentsDB.push(newStudent)
            // fs.writeFileSync(path.join(__dirname, "students.json"), JSON.stringify(studentsDB))
            await writeDB(filePathS, studentsDB)
            res.status(201).send({id: newStudent.ID})
        }
    }catch(error){next(error)}


})

router.put("/:id", async (req, res, next) => {
    try {
      const studentsDB = await readDB(filePathS)
      const newDb = studentsDB.filter(student => student.ID !== req.params.id)
  
      const modifiedStudent = {
        ...req.body,
        ID: req.params.id,
        modifiedAt: new Date(),
      }
  
      newDb.push(modifiedStudent)
      await writeDB(filePathS, newDb)
      res.send({ id: modifiedStudent.ID })
    } catch (error) {
      next(error)
    }
  })

router.delete("/:id", async (req, res, next) => {
    try{
        if(req.params.id > 0){
            const studentsDB = await readDB(filePathS)
            const newDB = studentsDB.filter(students => students.ID !== req.params.id)
            await writeDB(filePathS, newDB)
            res.status(204).send()
        }else{
            const err = new Error()
            err.httpStatusCode = 404
            next(err)
        }

    }catch(error){next(error)}
})

module.exports = router