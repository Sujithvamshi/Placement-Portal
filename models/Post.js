const mongoose = require('mongoose');
const Posts = new mongoose.Schema({
    userId:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true,
        max : 500
    },
    image:{
        type:String
    },
},
    {timestamps:true}
)
module.exports = mongoose.model('Posts',Posts);