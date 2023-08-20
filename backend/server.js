const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesUrls = require('./routes/routes')
const cors = require('cors')
// const session =require('express-session')
// const passport =require('passport')
dotenv.config()
const port=process.env.PORT||4000;
// require('./routes/auth')
// function isLoggedin(req,res,next){
//     req.user?next():res.sendStatus(401);
// }
// app.use(session({
//     secret: 'mysecret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
//   }))
//   app.use(passport.initialize())
//   passport.use(session())
// app.get('/auth/google',isLoggedin,
//   passport.authenticate('google', { scope:
//       [ 'email', 'profile' ] }
// ));

// app.get( '/auth/google/callback',
//     passport.authenticate( 'google', {
//         successRedirect: '/auth/google/success',
//         failureRedirect: '/auth/google/failure'
// }));
// app.get('/auth/google/success' ,isLoggedin,(req,res)=>{
//     let item= req.user.displayName;
//     console.log(item)
//     res.send("Hello")
// })
// app.get('/auth/google/failure',(req,res)=>{
//     res.send("hy")
// })
mongoose.connect(process.env.DATABASE_ACCESS).then(() => console.log('connected'))
    .catch(e => console.log(e));
app.use(express.json())
app.use(cors())
app.use('/app', routesUrls)
app.listen(port, () => console.log("server is running"))
