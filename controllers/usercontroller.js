const { user } = require("../models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const moment = require('moment')
const { employee, salarie } = require("../models")

exports.adminlogin = async (req, res) => {
    console.log(process.env.secret)
    console.log(req.body)
    user.findOne({where :{ email : req.body.email }}).then(user => {
        if (user) {
            if (req.body.name != "Admin") {
                throw Error
            }
            bcrypt.compare(req.body.password, user.password, (err, pass) => {
                if (err) throw err
                jwt.sign({
                    name : user.name,
                    email : user.email,
                    password : user.password
                },'Danish', { expiresIn : '1h'}, async (err, token) => {
                    if (err) throw err
                    let currentmonth = moment().format('MM')
                    await employee.findAll({
                        include : [
                            {
                                model: salarie,
                                where: {month : currentmonth},
                            }
                        ]
                    }).then(emp => {
                        if(!emp.length) {
                            throw Error
                        } else {
                            return res.render('dashboard.ejs', {Employee : emp})
                        }
                    }).catch()
                })
            })

        } else {
            throw Error
        }
    }).catch(err => {

        res.render('error404.ejs', {message : err.name})
        // return res.status(200).json({
        //     success : false,
        //     message : "Something went wrong",
        //     err : err.name
        // })
    })
}



exports.pagination = async function myfunction(data, res) {
    const url = {}
    const page = parseInt(data.page ? data.page - 1 : 0);
    da
}