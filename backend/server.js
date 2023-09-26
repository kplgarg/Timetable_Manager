const express = require('express')
const app = express()
const cron = require('node-cron');
const sendEmails = require('./sendEmails');
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
cron.schedule('0 0 * * *', resetData);
const tt = [
    [7, 19, 0, 5, 6, 8, 10, 12, 17, 18, 20, 22],
    [9, 21, 1, 5, 7, 8, 10, 13, 17, 19, 20, 22],
    [6, 18, 2, 5, 7, 9, 11, 14, 17, 19, 21, 23],
    [8, 20, 3, 6, 7, 9, 11, 15, 18, 19, 21, 23],
    [5, 18, 4, 6, 8, 10, 11, 16, 18, 20, 22, 23]
]
const timing = ["8.00-8.55", "8.00-8.55", "9.00-12.00", "9.00-9.55", "10.00-10.55", "11.00-11.55", "12.00-12.55", "2.00-5.00", "2.00-2.55", "3.00-3.55", "4.00-4.55", "5.00.5.55"]
let weekday = new Date().getDay() - 1
cron.schedule('30 5 * * *', async () => {
    try {
      const users = await YourModel.find({});
      for (const user of users) {
        let specialData = [] // Replace with how you retrieve the special data
        for(let i=0;i<12;i++)
        {
            if(weekday!=0 &&weekday!=6 &&user.timetab[tt[weekday-1][i]].slot!="")
            {
                specialData.push(user.timetab[tt[weekday-1][i]].slot)
            }
        }
        const commaSeparatedString = specialData.join(',');
        await sendEmails(user.email, commaSeparatedString);
      }
      console.log('Emails sent successfully.');
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  });

