const mongoose = require('mongoose')
const { Schema } = mongoose;

const onetime = new Schema({
    email: {
        type: String,
        required: true
    },
    code:{
        type:String,
        required:true
    },
    expireIn:{
        type:Number,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('onetime', onetime)