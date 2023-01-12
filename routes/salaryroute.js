const express = require("express")
const router = express.Router()
const salarycontroller = require("../controllers/salarycontroller")

router.param("salaryId", salarycontroller.getsalary)

router.post("/salary", salarycontroller.createsalary)

router.get("/salary", salarycontroller.findAllsalary)

router.get("/salary/:salaryId", salarycontroller.findsalary)

router.patch("/salary/:salaryId", salarycontroller.updatesalary)

router.delete("/salary/:salaryId", salarycontroller.deleteSalarye)

module.exports = router