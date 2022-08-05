const mongoose = require("mongoose");
const Item = new mongoose.Schema({
    cname:{
        type: String,
        required: true,
    },
    stream:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Stream"
    },
    about:{
        type:String,
    },
    courseContent:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        required:true,
    }
    
})

module.exports = mongoose.model('Item', Item);