const express = require("express")
const router = express.Router()
const emploeecontroller = require("../controllers/employeecontroller")

router.param("/employeeId", emploeecontroller.getEmployee)

router.post("/employee", emploeecontroller.createEmployee)

router.get("/employee", emploeecontroller.findAllEmployee)

router.get("/employee/:employeeId", emploeecontroller.findOneEmployee)

router.patch("/employee/:employeeId", emploeecontroller.updateEmployee)

router.delete("/employee/:employeeId", emploeecontroller.deleteEmployee)

router.get("/pagination", emploeecontroller.pagination)

module.exports = router