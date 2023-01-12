const { salarie, employee } = require('../models')
const moment = require('moment')

exports.getsalary = async (req, res, next, id) => {
    await salarie.findByPk(id).then(salary => {
        if(salary){
            req.salary = salary;
            next()
        }else{
            throw Error
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "salary does not exists."
        })
    })
}

exports.createsalary = async (req, res) => {
    const reqdate = new Date(req.body.date)
    console.log(reqdate.getMonth() + 1)
    console.log(reqdate.getFullYear())
    req.body.month = reqdate.getMonth() + 1
    req.body.year = reqdate.getFullYear()
    
    const salary = await salarie.findOne({ where : 
        { 
            employee_id : req.body.employee_id, 
            month: req.body.month, 
            year : req.body.year 
        } 
    }).then(sal => {
        if (sal) {
            return res.status(400).json({
                success : false,
                message : "This month salary already processed"
            })
        } 
    })

    const Employee = await employee.findOne({where : {id : req.body.employee_id}})
    let per_day_salary = Employee.basesalary / req.body.total_working_days
    let total_salary = (per_day_salary * (req.body.total_working_days - req.body.total_leave_taken + req.body.overtime / 8))
    req.body.total_salary_made = total_salary
    // req.body.salary_date = moment().format('YYYY-MM')

    await salarie.create(req.body).then(salary => {
        return
    }).then(async () => {
        let currentmonth = moment().format('MM')
        let emp = await employee.findAll({
                        include : [
                            {
                                model: salarie,
                                where: {month : currentmonth},
                            }
                        ]
                    })
        return res.render('dashboard.ejs', {Employee : emp})
    }).catch(error => {
            res.status(400).json({
                success: false,
                message: 'Something went wrong while creating the salary',
                Error: error 
            })
        })
}

exports.findsalary = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "salary fetched successfully.",
            result: req.salary
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error fetching salary.",
            Error: error
        })
    }
}

exports.findAllsalary = async (req, res) => {
    await salarie.findAll()
    .then(salary => {
        if(salary.length){
            res.status(200).json({
                success: true,
                message: 'All Employee fetched successfully',
                result: salary
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'No Employee found',
                result: employee
            })
        }
    }).catch(error => {
            res.status(400).json({
                success: false,
                message: 'Something went wrong while fetching Employee',
                Error: error
            })
        })
}


exports.updatesalary = async (req, res) => {
    await salarie.update(req.body, {where: {id: req.params.salaryId}})
    .then(salary => {
        return res.status(200).json({
            success: true,
            message: "Salary updated successfully",
            result: salary
        })
    }).catch(error => {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while updaing employee",
            Error: error
        })
    })
}

exports.deleteSalarye = async (req, res) => {
    await salarie.destroy({where: {id: req.params.salaryId}})
    .then(salary => {
        res.status(200).json({
            success: true,
            message: "salary deleted successfully",
            result: salary
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while deleting salary",
            Error: error
        })
    })
}