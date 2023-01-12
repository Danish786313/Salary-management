const { employee, salarie } = require('../models');
const moment = require('moment')


exports.getEmployee = async (req, res, next, id) => {
    await employee.findByPk(id).then(employee => {
        if(employee){
            req.employee = employee;
            next()
        }else{
            throw Error
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "Employee does not exists."
        })
    })
}

exports.createEmployee = async (req, res) => {
    console.log(req.body)
    await employee.create(req.body).then(employee => {
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
                message: 'Something went wrong while creating the Employee',
                Error: error 
            })
        })
}

exports.findOneEmployee = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Employee fetched successfully.",
            result: req.employee
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error fetching Employee.",
            Error: error
        })
    }
}

exports.findAllEmployee = async (req, res) => {
    await employee.findAll({ include : [
        { model : salarie}
    ]})
    .then(employee => {
        if(employee.length){
            res.status(200).json({
                success: true,
                message: 'All Employee fetched successfully',
                result: employee
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


exports.updateEmployee = async (req, res) => {
    await employee.update(req.body, {where: {id: req.params.employeeId}})
    .then(employee => {
        res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            result: employee
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while updaing employee",
            Error: error
        })
    })
}

exports.deleteEmployee = async (req, res) => {
    await employee.destroy({where: {id: req.params.employeeId}})
    .then(employee => {
        res.status(200).json({
            success: true,
            message: "Employee deleted successfully",
            result: employee
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while deleting Employee",
            Error: error
        })
    })
}

exports.pagination = async (req, res) => {

    const pageAsNumber = parseInt(req.query.page)
    const sizeAsNumber = parseInt(req.query.size)

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber
    }

    let size = 10;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10){
        size = sizeAsNumber
    }

    const emp = await employee.findAndCountAll({
        limit : size,
        offset : page * size,
    })

    res.send({
        content: emp.rows,
        totalpages: Math.ceil(emp.count / size)
    })
    
}