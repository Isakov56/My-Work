/* 
    You are in charge of building the Backend using ExpressJS. The backend should include the following routes:
    GET /students => returns the list of students
    GET /students/123 => returns a single student
    POST /students => create a new student
    PUT /students/123 => edit the student with the given id
    DELETE /students/123 => delete the student with the given id
    The persistence must be granted via file system (es.: Json file with a list of students inside) 
*/
const express = require("express")
const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")

const router = express.Router()

//i should use get and return the list of students
router.get("/", (req, res) => {
    // res.send("List of students")
   
    // 1. I have to get the path for my data(list) and the correct way to get the path is this:
    const studentsFilePath = path.join(__dirname, "students.json")
   
    // 2. retrieve the list from a file on disk (students.json)
    const fileAsABuffer = fs.readFileSync(studentsFilePath)

    // 3. We get buffer do this must be converted something else like string
    const fileAsAString = fileAsABuffer.toString()
    
    // 4. We want to send the list but not in the form of string, in the form of JSON
    const studentsArray = JSON.parse(fileAsAString)

    // 5. Now i can finally send it as file
    res.send(studentsArray)
})

//i should use get and return single student 
router.get("/:identifier", (req, res) => {
    //res.send("single student")
    
    // 1. Read the content from the file
    const studentsFilePath = path.join(__dirname, "students.json")
    const fileAsABuffer = fs.readFileSync(studentsFilePath)
    const fileAsAString = fileAsABuffer.toString()
    const studentsArray = JSON.parse(fileAsAString)

    // 2. Grab the id from url 
    const idComingFromRequest = req.params.identifier
    console.log(idComingFromRequest)

    //filter the array searching for that id 
    const student = studentsArray.filter(student => student.ID === idComingFromRequest)
    console.log("single student", student)

    // 4. send the found student back as a response 
    res.send(student)
})

//i should use post for creating a new student 
router.post("/", (req, res) => {
    res.send("create a student")

    // // 1. Read the content from the file
    // const studentsFilePath = path.join(__dirname, "students.json")
    // const fileAsABuffer = fs.readFileSync(studentsFilePath)
    // const fileAsAString = fileAsABuffer.toString()
    // const studentsArray = JSON.parse(fileAsAString)

    // // 2. push new user to usersArray

    // // 2.1 let's create a unique identifier for him
    // const newUser = req.body
    // newUser.ID = uniqid()
    // console.log(newUser)
    // usersArray.push(newUser)
    // console.log(usersArray)

    // // 3. replace old content in the file with new array
    // fs.writeFileSync(usersFilePath, JSON.stringify(usersArray))

    // res.status(201).send({ id: newUser.ID })
})

//i should use put for editing the student  
router.put("/:id", (req, res) => {
    res.send("modify student")
})

//i should use delete for deliting the student  
router.delete("/:id", (req, res) => {
    res.send("delete srudent")
})
module.exports = router