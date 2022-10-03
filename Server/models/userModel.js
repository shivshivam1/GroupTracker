const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{type: String,trim:true, required:true},
    email:{type:String, required:true, trim:true, unique:true, dropDups: true},
    password:{type:String, required:true},
    mobile:{type:String, required:true},
    latitude:{type:Number},
    longitude:{type:Number},
    groups:[],
})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel; 