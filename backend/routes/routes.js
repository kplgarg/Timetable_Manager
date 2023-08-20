const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')
const onetime = require('../models/Otp')
const User = require('../models/SignUpModels')
const bcrypt = require('bcrypt')

const saltRounds = 10
let weekday = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][new Date().getDay()]

router.post('/signup', (request, response) => {
    if (request.body.password !== request.body.confirmpassword) {
        response.send("123")
    }
    bcrypt.hash(request.body.password, saltRounds, function (err, hash) {
        const signUpUser = new signUpTemplateCopy({
            fname: request.body.fname,
            lname: request.body.lname,
            email: request.body.email,
            password: hash,
            confirmpassword: hash

        })
        // console.log(signUpUser)
        User.findOne({ "email": request.body.email }, (err, user) => {
            if (err) {
                console.log(err)
                response.send(err)
            }
            else if (user) {
                response.send("124")
            }
            else {
                signUpUser.save()
                    .then(data => {
                        response.send(data.id)
                    })
                    .catch(error => {
                        response.send(error)
                    })
            }

        })

    });

})

router.post('/addslot', (request, response) => {

    User.updateOne(
        { "_id": request.body.user_id, "timetab.slotname": request.body.slotname },
        { $set: { "timetab.$.slot": request.body.slot.toUpperCase(), "timetab.$.classAttend": 0 } }
    ).then(res => {
        //console.log("Slot  Addedd Succesfully");
    }).catch((err) => {
        console.log(err)
        //console.log("Slot  Addedd Unsuccesfully");
    })
    User.updateOne(
        { "_id": request.body.user_id, "MONDAY.slotname": request.body.slotname },
        { $set: { "MONDAY.$.slot": request.body.slot.toUpperCase(), "MONDAY.$.isDisabled": "false" } }
    ).then(res => {
        //console.log("Slot  MONDAY Succesfully");
    }).catch((err) => {
        console.log(err)
        //console.log("Slot  MONDAY Unsuccesfully");
    })
    User.updateOne(
        { "_id": request.body.user_id, "TUESDAY.slotname": request.body.slotname },
        { $set: { "TUESDAY.$.slot": request.body.slot.toUpperCase(), "TUESDAY.$.isDisabled": "false" } }
    ).then(res => {
        //console.log("Slot  TUESDAY Succesfully");
    }).catch((err) => {
        console.log(err)
        //console.log("Slot  TUESDAY Unsuccesfully");
    })
    User.updateOne(
        { "_id": request.body.user_id, "WEDNESDAY.slotname": request.body.slotname },
        { $set: { "WEDNESDAY.$.slot": request.body.slot.toUpperCase(), "WEDNESDAY.$.isDisabled": "false" } }
    ).then(res => {
        console.log("Slot  WEDNESDAY Succesfully");
    }).catch((err) => {
        console.log(err)
        //console.log("Slot  WEDNESDAY Unsuccesfully");
    })
    User.updateOne(
        { "_id": request.body.user_id, "THURSDAY.slotname": request.body.slotname },
        { $set: { "THURSDAY.$.slot": request.body.slot.toUpperCase(), "THURSDAY.$.isDisabled": "false" } }
    ).then(res => {
        //console.log("Slot  THURSDAY Succesfully");
    }).catch((err) => {
        console.log(err)
        //console.log("Slot  THURSDAY Unsuccesfully");
    })
    User.updateOne(
        { "_id": request.body.user_id, "FRIDAY.slotname": request.body.slotname },
        { $set: { "FRIDAY.$.slot": request.body.slot.toUpperCase(), "FRIDAY.$.isDisabled": "false" } }
    ).then(res => {
        //console.log("Slot  FRIDAY Succesfully");
    }).catch((err) => {
        console.log(err)
        //console.log("Slot  FRIDAY Unsuccesfully");
    })
    response.send()

})
router.post('/addtaken', (request, response) => {

    User.updateOne(
        { "_id": request.body.user_id, "timetab.slotname": request.body.slotname },
        { $inc: { "timetab.$.classAttend": 1 } }
    ).then(res => {
        console.log("Slot  Addedd Succesfully");
    })
        .catch((err) => {
            console.log(err)
        })
    if (weekday === 'MONDAY') {
        User.updateOne(
            { "_id": request.body.user_id, "MONDAY.slotname": request.body.slotname },
            { $set: { "MONDAY.$.isDisabled": "true" } }
        ).then(res => {
            console.log("Monday Disabled");
        })
            .catch((err) => {
                console.log(err)
            })
    }
    else if (weekday === 'TUESDAY') {
        User.updateOne(
            { "_id": request.body.user_id, "TUESDAY.slotname": request.body.slotname },
            { $set: { "TUESDAY.$.isDisabled": "true" } }
        ).then(res => {
            console.log("Tuesday Disabled");
        })
            .catch((err) => {
                console.log(err)
            })
    }
    else if (weekday === 'WEDNESDAY') {
        User.updateOne(
            { "_id": request.body.user_id, "WEDNESDAY.slotname": request.body.slotname },
            { $set: { "WEDNESDAY.$.isDisabled": "true" } }
        ).then(res => {
            console.log("Wednesday Disabled");
        })
            .catch((err) => {
                console.log(err)
            })
    }
    else if (weekday === 'THURSDAY') {
        User.updateOne(
            { "_id": request.body.user_id, "THURSDAY.slotname": request.body.slotname },
            { $set: { "THURSDAY.$.isDisabled": "true" } }
        ).then(res => {
            console.log("Thursday Disabled");
        })
            .catch((err) => {
                console.log(err)
            })
    }
    else if (weekday === 'FRIDAY') {
        User.updateOne(
            { "_id": request.body.user_id, "FRIDAY.slotname": request.body.slotname },
            { $set: { "FRIDAY.$.isDisabled": "true" } }
        ).then(res => {
            console.log("Friday Disabled");
        })
            .catch((err) => {
                console.log(err)
            })
    }
    response.send()

})
router.post('/adduntaken', (request, response) => {

    User.updateOne(
        { "_id": request.body.user_id, "timetab.slotname": request.body.slotname },
        { $inc: { "timetab.$.classAttend": -1 } }
    ).then(res => {
        console.log("Slot  Minus Succesfully");
    })
        .catch((err) => {
            console.log(err)
        })
    if (weekday === 'MONDAY') {
        User.updateOne(
            { "_id": request.body.user_id, "MONDAY.slotname": request.body.slotname },
            { $set: { "MONDAY.$.isDisabled": "false" } }
        ).then(res => {
            console.log("Monday Enabled");
        })
            .catch((err) => {
                console.log(err)
            })
    }
    else if (weekday === 'TUESDAY') {
        User.updateOne(
            { "_id": request.body.user_id, "TUESDAY.slotname": request.body.slotname },
            { $set: { "TUESDAY.$.isDisabled": "false" } }
        ).then(res => {
            console.log("Tuesday Enabled");
        })
            .catch((err) => {
                console.log(err)
            })
    }
    else if (weekday === 'WEDNESDAY') {
        User.updateOne(
            { "_id": request.body.user_id, "WEDNESDAY.slotname": request.body.slotname },
            { $set: { "WEDNESDAY.$.isDisabled": "false" } }
        ).then(res => {
            console.log("Wednesday Enabled");
        })
            .catch((err) => {
                console.log(err)
            })
    }
    else if (weekday === 'THURSDAY') {
        User.updateOne(
            { "_id": request.body.user_id, "THURSDAY.slotname": request.body.slotname },
            { $set: { "THURSDAY.$.isDisabled": "false" } }
        ).then(res => {
            console.log("Thursday Enabled");
        })
            .catch((err) => {
                console.log(err)
            })
    }
    else if (weekday === 'FRIDAY') {
        User.updateOne(
            { "_id": request.body.user_id, "FRIDAY.slotname": request.body.slotname },
            { $set: { "FRIDAY.$.isDisabled": "false" } }
        ).then(res => {
            console.log("Friday Enabled");
        })
            .catch((err) => {
                console.log(err)
            })
    }
    response.send()

})
router.post('/reseter', (request, response) => {
    weekday === 'TUESDAY' && User.updateOne(
        { "_id": request.body.user_id },
        { $set: { "MONDAY.$[outer].isDisabled": "false" } },
        {
            "arrayFilters": [{ "outer.isDisabled": "true" }], "multi": true
        }
    ).then().catch()
    weekday === 'WEDNESDAY' && User.updateOne(
        { "_id": request.body.user_id },
        { $set: { "TUESDAY.$[outer].isDisabled": "false" } },
        {
            "arrayFilters": [{ "outer.isDisabled": "true" }], "multi": true
        }
    ).then().catch()
    weekday === 'THURSDAY' && User.updateOne(
        { "_id": request.body.user_id },
        { $set: { "WEDNESDAY.$[outer].isDisabled": "false" } },
        {
            "arrayFilters": [{ "outer.isDisabled": "true" }], "multi": true
        }
    ).then().catch()
    //console.log(weekday)
    weekday === 'FRIDAY' && User.updateOne(

        { "_id": request.body.user_id },
        { $set: { "THURSDAY.$[outer].isDisabled": "false" } },
        {
            "arrayFilters": [{ "outer.isDisabled": "true" }], "multi": true
        }
    ).then().catch()
    weekday === 'SATURDAY' && User.updateOne(
        { "_id": request.body.user_id },
        { $set: { "FRIDAY.$[outer].isDisabled": "false" } },
        {
            "arrayFilters": [{ "outer.isDisabled": "true" }], "multi": true
        }
    ).then().catch()

    response.send()

})
router.get('/getdata/:id', (request, response) => {

    User.findOne({ "_id": request.params.id })
        .then(res => {
            response.send(res.timetab)
        })
        .catch((err) => {
            response.send(null)
        })
})
router.get('/getdataa/:id', (request, response) => {
    //console.log(request.params.id)
    User.findOne({ "_id": request.params.id })
        .then(res => {
            //console.log(res)
            if (weekday === 'THURSDAY')
                response.send(res.THURSDAY)
            else if (weekday === 'FRIDAY')
                response.send(res.FRIDAY)
            else if (weekday === 'TUESDAY')
                response.send(res.TUESDAY)
            else if (weekday === 'WEDNESDAY')
                response.send(res.WEDNESDAY)
            else if (weekday === 'MONDAY')
                response.send(res.MONDAY)
            else
                response.send()
        })
        .catch((err) => {
            response.send(null)
        })
})
router.post('/deleteslot', (request, response) => {
    User.updateOne(
        { "_id": request.body.user_id },
        { $set: { "timetab.$[].slot": "", "MONDAY.$[].slot": "", "TUESDAY.$[].slot": "", "WEDNESDAY.$[].slot": "", "THURSDAY.$[].slot": "", "FRIDAY.$[].slot": "" } }
    ).then(res => {
        //console.log("Deleted Succesfully");
    }).catch((err) => {
        console.log(err)
        //console.log("Deleted Unsuccesfully");
    })
    response.send()

})
router.post('/onedeleteslot', (request, response) => {
    console.log(request.body)
    User.updateOne(
        { "_id": request.body.user_id, "timetab.slotname": request.body.slotname },
        { $set: { "timetab.$.slot": "", "timetab.$.classAttend": 0 } }
    ).then(res => {
        //console.log('Deleted - ' + res);
    })
        .catch((err) => {
            console.log('Error: ' + err);
        })
    User.updateOne(
        { "_id": request.body.user_id, "MONDAY.slotname": request.body.slotname },
        { $set: { "MONDAY.$.slot": "" } }
    ).then(res => {
        //console.log("DELETED ONE MONDAY");
    })
        .catch((err) => {
            console.log("DELETED ONE NOT MONDAY");
        })
    User.updateOne(
        { "_id": request.body.user_id, "TUESDAY.slotname": request.body.slotname },
        { $set: { "TUESDAY.$.slot": "" } }
    ).then(res => {
        //console.log("DELETED ONE TUESDAY");
    })
        .catch((err) => {
            console.log("DELETED ONE NOT TUESDAY");
        })
    User.updateOne(
        { "_id": request.body.user_id, "WEDNESDAY.slotname": request.body.slotname },
        { $set: { "WEDNESDAY.$.slot": "" } }
    ).then(res => {
        //console.log("DELETED ONE WEDNESDAY");
    })
        .catch((err) => {
            console.log("DELETED ONE NOT WEDNESDAY");
        })
    User.updateOne(
        { "_id": request.body.user_id, "THURSDAY.slotname": request.body.slotname },
        { $set: { "THURSDAY.$.slot": "" } }
    ).then(res => {
        //console.log("DELETED ONE THURSDAY");
    })
        .catch((err) => {
            console.log("DELETED ONE NOT THURSDAY");
        })
    User.updateOne(
        { "_id": request.body.user_id, "FRIDAY.slotname": request.body.slotname },
        { $set: { "FRIDAY.$.slot": "" } }
    ).then(res => {
        //console.log("DELETED ONE FRIDAY");
    })
        .catch((err) => {
            console.log("DELETED ONE NOT FRIDAY");
        })
    response.send()

})
const mailer = (emaill, otpp) => {
    let nodemailer = require('nodemailer');
    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 3000,
        secure: true,
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD
        }
    });
    let mailOptions = {
        from: process.env.MY_EMAIL,
        to: emaill,
        subject: "Change your Password",
        text: `Reset otp for your account ${emaill} is ${otpp} valid for 5mint only`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        }
        else {
            console.log(`Email sent ` + info.response)
        }
    });
}
router.post('/sendotp', (request, response) => {
    User.findOne({ "email": request.body.email }, (err, userfound) => {
        if (err) {
            //console.log(err)
            response.send()
        }
        else {
            if (userfound) {
                let otpcode = Math.floor(Math.random() * 10000) + 1;
                let otpData = new onetime({
                    email: userfound.email,
                    code: otpcode,
                    expireIn: new Date().getTime() + 300 * 1000
                });
                mailer(userfound.email, otpcode)
                onetime.findOne({ "email": request.body.email }, (errr, userfoundd) => {
                    if (errr) {
                        //console.log(err)
                        response.send("NODATA")
                    }
                    else {
                        if (userfoundd) {
                            onetime.findOneAndUpdate({ "email": request.body.email }, { $set: { "code": otpcode, "expireIn": new Date().getTime() + 300 * 1000 } }).then(ress => console.log(ress)).catch(er => console.log(er))
                        }
                        else {
                            otpData.save().then(res => console.log(res)).catch(err => console.log(err))
                        }
                    }
                }
                )
                response.send()
            }
            else {
                response.end("NODATA")
            }
        }
    })
}
)
router.post('/otpsend', (request, response) => {
    onetime.findOne({ "email": request.body.email, "code": request.body.otp }, (err, userfound) => {
        if (err) {
            console.log(err)
            response.send()
        }
        else {
            if (userfound) {
                let d = userfound.expireIn - new Date().getTime();
                // console.log(d)
                if (d > 0) {
                    // console.log(new Date().getTime(),d)
                    bcrypt.hash(request.body.password, saltRounds, function (err, hash) {
                        User.findOneAndUpdate({ "email": request.body.email }, { $set: { "password": hash, "confirmpassword": hash } }).then(res => console.log("successfully changed")).then(errr => console.log(errr))
                        response.send()
                    });
                }
                else {
                    response.end()
                }
            }
            else {
                //console.log("otp expire")
                response.send()
            }
        }
    })
}
)

router.post('/login', (request, response) => {

    User.findOne({ "email": request.body.email }, (err, userfound) => {
        if (err) {
            console.log(err)
            response.send()
        }
        else {
            if (userfound) {
                bcrypt.compare(request.body.password, userfound.password, (errr, result) => {
                    if (result === true) {
                        response.write(userfound.id)
                        response.end()
                    }
                    else if (errr) {
                        console.log(errr)
                        response.end()
                    }
                    else {
                        response.end()
                    }
                });

            }
            else {
                response.end()
            }
        }
    })
})


router.post('/logingoogle', (request, response) => {
    User.findOne({ "email": request.body.email }, (err, userfound) => {
        if (err) {
            console.log(err)
            response.send()
        }
        else {
            if (userfound) {
                response.write(userfound.id)
                User.findOneAndUpdate({ "email": request.body.email }, { $set: { jti: request.body.jti } })
                    .then(ress => console.log(ress))
                    .catch(er => console.log(er))
                response.end()
            }
            else {
                const signUpUser = new signUpTemplateCopy({
                    fname: request.body.family_name,
                    lname: request.body.given_name,
                    email: request.body.email,
                    jti: request.body.jti
                })
                signUpUser.save()
                    .then(data => {
                        response.send(data.id)
                    })
                    .catch(error => {
                        response.send(error)
                    })

            }
        }
    })
})
module.exports = router