require('dotenv').config
const cron = require("node-cron");
const mailer = require("@sendgrid/mail");
const { employee, salarie}  = require("./models")
const path = require("path")
const bodyparser = require("body-parser")
const express = require("express")
const expresslayouts = require("express-ejs-layouts")
const port = process.env.port || 4000;
const app = express()
const userroute = require("./routes/userroute");
const employeeroute = require("./routes/employeeroute")
const salaryroute = require("./routes/salaryroute")
const viewsroute = require("./routes/views")
const moment = require('moment')

app.use(bodyparser.urlencoded( { extended : true}))
app.use(bodyparser.json())
// app.use(expresslayouts)
// app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.use("/api", userroute)
app.use("/api", employeeroute)
app.use("/api", salaryroute)
app.use("/views", viewsroute)
app.use("/demo", (req, res) => {
    return res.status(200).json({
        success : true,
        message : "Hello User, In Salary management app"
    })
})

cron.schedule("* * 1 * *", async function() {
    let currentmonth = moment().format('MM')
    let currentyear = moment().format('YYYY')

    const emp = await employee.findAll({
        include : [
            {
                model: salarie,
                where: {month : currentmonth, year: currentyear},
            }
        ]
    })
    mailer.setApiKey("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");

    // for (let i=0; i<=emp.length; i++) {

    // }
    const msg = {
        to: [emp[0].email, emp[2].email],
        from: "mohddanishkhan681@gmail.com",
        subject: "Message sent for demo purpose",
        html:
          "<h1>New message from Danish khan</h1> <p>Building a noed cron demo text from Hackerkernel.</p>"
      };

      mailer.send(msg, function(err, json) {
        if (err) {
          console.log(err);
    
          // Writing error message
          res.write("Can't send message sent");
        } else {
    
          // Writing success message
          res.write("Message sent");
        }
      });
    
      res.end();
});

app.listen(port, async () => {
    console.log(`server is listening on http:localhost:${port}`)    
})