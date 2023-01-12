const express = require("express")
const router = express.Router()
const controller = require("../controllers/usercontroller")

router.post("/login", controller.adminlogin)

module.exports = router