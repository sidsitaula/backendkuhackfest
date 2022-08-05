const mongoose = require("mongoose");
const User = new mongoose.Schema({

        firstName:{
            type: String,
            required: true,

        },
        lastName:{
            type: String,
            required: true,
        },
        middleName:{
            type:String
        },

    userName:{
        type:String,
        required:true,
        min:6
    },
    password:{
        type:String,
        required:true,
        min:8,
        max: 1024,
    },
    email:{
        type:String,
        required: true,
        max:500,
    },
    associatedID:{
        type:mongoose.Schema.Types.ObjectId
    },
    utype:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('User',User);