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
    confirmpassword: {
        type: String,
        // required: true,
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
                slotname: "A",
                slot: "",
                classAttend: 0,
                classTotal: 56
            },
            {
                slotname: "B",
                slot: "",
                classAttend: 0,
                classTotal: 56
            },
            {
                slotname: "C",
                slot: "",
                classAttend: 0,
                classTotal: 56
            },
            {
                slotname: "D",
                slot: "",
                classAttend: 0,
                classTotal: 56
            },
            {
                slotname: "E",
                slot: "",
                classAttend: 0,
                classTotal: 42
            },
            {
                slotname: "F",
                slot: "",
                classAttend: 0,
                classTotal: 42
            },
            {
                slotname: "G",
                slot: "",
                classAttend: 0,
                classTotal: 42
            },
            {
                slotname: "A1",
                slot: "",
                classAttend: 0,
                classTotal: 56
            },
            {
                slotname: "B1",
                slot: "",
                classAttend: 0,
                classTotal: 56
            },
            {
                slotname: "C1",
                slot: "",
                classAttend: 0,
                classTotal: 56
            },
            {
                slotname: "D1",
                slot: "",
                classAttend: 0,
                classTotal: 56
            },
            {
                slotname: "E1",
                slot: "",
                classAttend: 0,
                classTotal: 42
            },
            {
                slotname: "F1",
                slot: "",
                classAttend: 0,
                classTotal: 42
            },
            {
                slotname: "G1",
                slot: "",
                classAttend: 0,
                classTotal: 42
            },
            {
                slotname: "ML1",
                slot: "",
                classAttend: 0,
                classTotal: 14
            },
            {
                slotname: "ML2",
                slot: "",
                classAttend: 0,
                classTotal: 14
            },
            {
                slotname: "ML3",
                slot: "",
                classAttend: 0,
                classTotal: 14
            },
            {
                slotname: "ML4",
                slot: "",
                classAttend: 0,
                classTotal: 14
            },
            {
                slotname: "ML5",
                slot: "",
                classAttend: 0,
                classTotal: 14
            },
            {
                slotname: "AL1",
                slot: "",
                classAttend: 0,
                classTotal: 14
            },
            {
                slotname: "AL2",
                slot: "",
                classAttend: 0,
                classTotal: 14
            },
            {
                slotname: "AL3",
                slot: "",
                classAttend: 0,
                classTotal: 14
            },
            {
                slotname: "AL4",
                slot: "",
                classAttend: 0,
                classTotal: 14
            },
            {
                slotname: "AL5",
                slot: "",
                classAttend: 0,
                classTotal: 14
            }
        ]
    },
    MONDAY: {
        type: Array,
        default: [
            {
                slotname: "C",
                slot: "",
                isDisabled: "false",
                timing: "8.00AM-8.55AM"
            },
            {
                slotname: "C1",
                slot: "",
                isDisabled: "false",
                timing: "8.00AM-8.55AM"
            },
            {
                slotname: "ML1",
                slot: "",
                isDisabled: "false",
                timing: "9.00AM-11.55AM"
            },
            {
                slotname: "A",
                slot: "",
                isDisabled: "false",
                timing: "9.00AM-9.55AM"
            },
            {
                slotname: "B",
                slot: "",
                isDisabled: "false",
                timing: "10.00AM-10.55AM"
            },
            {
                slotname: "D",
                slot: "",
                isDisabled: "false",
                timing: "11.00AM-11.55AM"
            },
            {
                slotname: "F",
                slot: "",
                isDisabled: "false",
                timing: "12.00PM-12.55PM"
            },
            {
                slotname: "AL1",
                slot: "",
                isDisabled: "false",
                timing: "2.00PM-4.55PM"
            },
            {
                slotname: "A1",
                slot: "",
                isDisabled: "false",
                timing: "2.00PM-2.55PM"
            },
            {
                slotname: "B1",
                slot: "",
                isDisabled: "false",
                timing: "3.00PM-3.55PM"
            },
            {
                slotname: "D1",
                slot: "",
                isDisabled: "false",
                timing: "4.00PM-4.55PM"
            },
            {
                slotname: "F1",
                slot: "",
                isDisabled: "false",
                timing: "5.00PM-5.55PM"
            }
        ]
    },
    TUESDAY: {
        type: Array,
        default: [
            {
                slotname: "E",
                slot: "",
                isDisabled: "false",
                timing: "8.00AM-8.55AM"
            },
            {
                slotname: "E1",
                slot: "",
                isDisabled: "false",
                timing: "8.00AM-8.55AM"
            },
            {
                slotname: "ML2",
                slot: "",
                isDisabled: "false",
                timing: "9.00AM-11.55AM"
            },
            {
                slotname: "A",
                slot: "",
                isDisabled: "false",
                timing: "9.00AM-9.55AM"
            },
            {
                slotname: "C",
                slot: "",
                isDisabled: "false",
                timing: "10.00AM-10.55AM"
            },
            {
                slotname: "D",
                slot: "",
                isDisabled: "false",
                timing: "11.00AM-11.55AM"
            },
            {
                slotname: "F",
                slot: "",
                isDisabled: "false",
                timing: "12.00PM-12.55PM"
            },
            {
                slotname: "AL2",
                slot: "",
                isDisabled: "false",
                timing: "2.00PM-4.55PM"
            },
            {
                slotname: "A1",
                slot: "",
                isDisabled: "false",
                timing: "2.00PM-2.55PM"
            },
            {
                slotname: "C1",
                slot: "",
                isDisabled: "false",
                timing: "3.00PM-3.55PM"
            },
            {
                slotname: "D1",
                slot: "",
                isDisabled: "false",
                timing: "4.00PM-4.55PM"
            },
            {
                slotname: "F1",
                slot: "",
                isDisabled: "false",
                timing: "5.00PM-5.55PM"
            }
        ]
    },
    WEDNESDAY: {
        type: Array,
        default: [
            {
                slotname: "B",
                slot: "",
                isDisabled: "false",
                timing: "8.00AM-8.55AM"
            },
            {
                slotname: "B1",
                slot: "",
                isDisabled: "false",
                timing: "8.00AM-8.55AM"
            },
            {
                slotname: "ML3",
                slot: "",
                isDisabled: "false",
                timing: "9.00AM-11.55AM"
            },
            {
                slotname: "A",
                slot: "",
                isDisabled: "false",
                timing: "9.00AM-9.55AM"
            },
            {
                slotname: "C",
                slot: "",
                isDisabled: "false",
                timing: "10.00AM-10.55AM"
            },
            {
                slotname: "E",
                slot: "",
                isDisabled: "false",
                timing: "11.00AM-11.55AM"
            },
            {
                slotname: "G",
                slot: "",
                isDisabled: "false",
                timing: "12.00PM-12.55PM"
            },
            {
                slotname: "AL3",
                slot: "",
                isDisabled: "false",
                timing: "2.00PM-4.55PM"
            },
            {
                slotname: "A1",
                slot: "",
                isDisabled: "false",
                timing: "2.00PM-2.55PM"
            },
            {
                slotname: "C1",
                slot: "",
                isDisabled: "false",
                timing: "3.00PM-3.55PM"
            },
            {
                slotname: "E1",
                slot: "",
                isDisabled: "false",
                timing: "4.00PM-4.55PM"
            },
            {
                slotname: "G1",
                slot: "",
                isDisabled: "false",
                timing: "5.00PM-5.55PM"
            }
        ]
    },
    THURSDAY: {
        type: Array,
        default: [
            {
                slotname: "D",
                slot: "",
                isDisabled: "false",
                timing: "8.00AM-8.55AM"
            },
            {
                slotname: "D1",
                slot: "",
                isDisabled: "false",
                timing: "8.00AM-8.55AM"
            },
            {
                slotname: "ML4",
                slot: "",
                isDisabled: "false",
                timing: "9.00AM-11.55AM"
            },
            {
                slotname: "B",
                slot: "",
                isDisabled: "false",
                timing: "9.00AM-9.55AM"
            },
            {
                slotname: "C",
                slot: "",
                isDisabled: "false",
                timing: "10.00AM-10.55AM"
            },
            {
                slotname: "E",
                slot: "",
                isDisabled: "false",
                timing: "11.00AM-11.55AM"
            },
            {
                slotname: "G",
                slot: "",
                isDisabled: "false",
                timing: "12.00PM-12.55PM"
            },
            {
                slotname: "AL4",
                slot: "",
                isDisabled: "false",
                timing: "2.00PM-4.55PM"
            },
            {
                slotname: "B1",
                slot: "",
                isDisabled: "false",
                timing: "2.00PM-2.55PM"
            },
            {
                slotname: "C1",
                slot: "",
                isDisabled: "false",
                timing: "3.00PM-3.55PM"
            },
            {
                slotname: "E1",
                slot: "",
                isDisabled: "false",
                timing: "4.00PM-4.55PM"
            },
            {
                slotname: "G1",
                slot: "",
                isDisabled: "false",
                timing: "5.00PM-5.55PM"
            }
        ]
    },
    FRIDAY: {
        type: Array,
        default: [
            {
                slotname: "A",
                slot: "",
                isDisabled: "false",
                timing: "8.00AM-8.55AM"
            },
            {
                slotname: "A1",
                slot: "",
                isDisabled: "false",
                timing: "8.00AM-8.55AM"
            },
            {
                slotname: "ML5",
                slot: "",
                isDisabled: "false",
                timing: "9.00AM-11.55AM"
            },
            {
                slotname: "B",
                slot: "",
                isDisabled: "false",
                timing: "9.00AM-9.55AM"
            },
            {
                slotname: "D",
                slot: "",
                isDisabled: "false",
                timing: "10.00AM-10.55AM"
            },
            {
                slotname: "F",
                slot: "",
                isDisabled: "false",
                timing: "11.00AM-11.55AM"
            },
            {
                slotname: "G",
                slot: "",
                isDisabled: "false",
                timing: "12.00PM-12.55PM"
            },
            {
                slotname: "AL5",
                slot: "",
                isDisabled: "false",
                timing: "2.00PM-4.55PM"
            },
            {
                slotname: "B1",
                slot: "",
                isDisabled: "false",
                timing: "2.00PM-2.55PM"
            },
            {
                slotname: "D1",
                slot: "",
                isDisabled: "false",
                timing: "3.00PM-3.55PM"
            },
            {
                slotname: "F1",
                slot: "",
                isDisabled: "false",
                timing: "4.00PM-4.55PM"
            },
            {
                slotname: "G1",
                slot: "",
                isDisabled: "false",
                timing: "5.00PM-5.55PM"
            }
        ]
    }
})
module.exports = mongoose.model('mytable', signUpTemplate)