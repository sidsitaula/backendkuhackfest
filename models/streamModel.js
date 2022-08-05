const mongoose = require("mongoose");
const Stream = new mongoose.Schema({
    sname:{
        type: String,
        required: true,
    },
    teachers:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:"Teacher"
    },
    about:{
        type:String,
        
    },
    streamItems:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Item"
    },
    pinnedItem:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Item"
    }
    
})

module.exports = mongoose.model('Stream',Stream);