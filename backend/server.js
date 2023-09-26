const express = require('express')
const app = express()
const cron = require('node-cron');
const YourModel = require('./models/SignUpModels');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesUrls = require('./routes/routes')
const cors = require('cors')
dotenv.config()
const port = process.env.PORT || 4000;
mongoose.connect(process.env.DATABASE_ACCESS).then(() => console.log('connected'))
    .catch(e => console.log(e));
app.use(express.json())
app.use(cors())
app.use('/app', routesUrls)
app.listen(port, () => console.log("server is running"))
const resetData = async () => {
    YourModel.updateMany(
        {},
        {
            $set: {
                [`timetab.$[].isAble`]: false,
            }
        },
        {
            new: true,
        }
    ).then(res => {
        console.log("Rested");
    }).catch((err) => {
        console.log(err)
    })
    response.send()
};

// Schedule the task to run at 6 am every day
cron.schedule('30 5 * * *', resetData);

