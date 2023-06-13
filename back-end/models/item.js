const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    price : {
        type : Number,
        required : true,
        unique : false
    }
}, {
    timestamps : true
})

module.exports = mongoose.model("Item", itemSchema)