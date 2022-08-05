const mongoose = require("mongoose");
const Student = new mongoose.Schema({
    
    email:{
        type:String,
        required: true,
        max:500,
    },
    streamEnrolled:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:"Stream"
    }


})

module.exports = mongoose.model('Student',Student);