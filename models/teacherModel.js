const mongoose = require("mongoose");
const Teacher = new mongoose.Schema({

    email:{
        type:String,
        required: true,
        max:500,
    },
    about:{
        type:String,
        required: true,
        max:500,
    },
    classStreams:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'Stream'
    },

})

module.exports = mongoose.model('Teacher',Teacher);