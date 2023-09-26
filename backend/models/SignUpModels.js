const mongoose = require('mongoose')
const { Schema } = mongoose;

const signUpTemplate = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        //required: true,
        minLength: 8
    },
    jti:{
        type:String
    },
    date: {
        type: Date,
        default: Date.now
    },
    timetab: {
        type: Array,
        default: [
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
            {
                slot: "",
                classAttend: 0,
                isAble:false
            },
        ]
    }
})
module.exports = mongoose.model('mytable', signUpTemplate)