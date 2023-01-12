const express = require("express")
const router = express.Router()
const { employee, salarie } = require("../models")
const moment = require('moment')



router.get("/home", (req, res) => {
    res.render('signin.ejs')
})


router.get("/salary",  async (req, res) => {
    const emp = await employee.findAll().then(result => {
        res.render('salaryform.ejs', { employeedata : result, Danish: "danish" })
    })
})

router.get("/employee", (req, res) => {
    res.render('employee.ejs')
})

router.get("/employeedetails", async (req, res) => {
    const emp = await employee.findAll().then(result => {
        res.render('employeedeatils.ejs', { employeedata : result })
    })
})


router.get("/salarydetails", async (req, res) => {
    let currentmonth = moment().format('MM')
    const emp = await salarie.findAll({
        where : {month: currentmonth},
        include : [
            {
                model : employee,
            }
        ]
    }).then(result => {
        res.render('salarydetails.ejs', { salarydata : result })
    })
})

router.get("/employeedetails/:", async (req, res) => {

    const pageAsNumber = parseInt(req.query.page)
    const sizeAsNumber = 9

    // let page = 0;
    // if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    //     page = pageAsNumber
    // }

    // let size = 10;
    // if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10){
    //     size = sizeAsNumber
    // }

    const emp = await employee.findAndCountAll({
        limit : size,
        offset : page * size,
    })

    res.send({
        content: emp.rows,
        totalpages: Math.ceil(emp.count / size)
    })

    
    // const emp = await employee.findAll().then(result => {
    //     res.render('employeedeatils.ejs', { employeedata : result })
    // })
})


router.get("/empwithpagination/:page", async (req, res) => {
    const page = parseInt(req.params.page) || 0
    const size = 9

    console.log(page)
    
    const emp = await employee.findAndCountAll({
        limit : size,
        offset : page * size,
    })

    console.log(Math.ceil(emp.count / size))

    res.render('pagination.ejs', {
        products: emp.rows,
        current: page,
        pages: Math.ceil(emp.count / size)
    })
})



module.exports = router