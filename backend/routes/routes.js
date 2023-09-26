const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')
const onetime = require('../models/Otp')
const User = require('../models/SignUpModels')
const bcrypt = require('bcryptjs')

const saltRounds = 10
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

    User.findByIdAndUpdate({ _id: request.body.user_id },
        {
            $set: {
                [`timetab.${request.body.index}.slot`]: request.body.slot,
                [`timetab.${request.body.index}.classAttend`]: 0,
                [`timetab.${request.body.index}.isAble`]: false,
            },
        },
        {
            new: true,
        })
        .then(res => {
            //console.log("Slot  Addedd Succesfully");
        }).catch((err) => {
            console.log(err)
            //console.log("Slot  Addedd Unsuccesfully");
        })
    response.send()
})
router.post('/addtaken', (request, response) => {

    User.findByIdAndUpdate(
        { _id: request.body.user_id },
        {
            $inc: { [`timetab.${request.body.index}.classAttend`]: 1 },
            $set: { [`timetab.${request.body.index}.isAble`]: true }
        }
    ).then(res => {
        console.log("Slot  Addedd Succesfully");
    })
        .catch((err) => {
            console.log(err)
        })
    response.send()
})
router.post('/adduntaken', (request, response) => {

    User.updateOne(
        { "_id": request.body.user_id },
        {
            $inc: { [`timetab.${request.body.index}.classAttend`]: -1 },
            $set: { [`timetab.${request.body.index}.isAble`]: false }
        }
    ).then(res => {
        console.log("Slot  Minus Succesfully");
    })
        .catch((err) => {
            console.log(err)
        })
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
router.post('/deleteslot', (request, response) => {
    User.updateMany(
        { "_id": request.body.user_id },
        {
            $set: {
                [`timetab.$[].slot`]: "",
                [`timetab.$[].classAttend`]: 0,
                [`timetab.$[].isAble`]: false,
            }
        }
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
        { "_id": request.body.user_id },
        {
            $set: {
                [`timetab.${request.body.index}.slot`]: "",
                [`timetab.${request.body.index}.classAttend`]: 0,
                [`timetab.${request.body.index}.isAble`]: false,
            }
        }
    ).then(res => {
        //console.log('Deleted - ' + res);
    })
        .catch((err) => {
            console.log('Error: ' + err);
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