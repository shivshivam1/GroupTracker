const mongoose = require("mongoose")

const groupSchema = new mongoose.Schema({
    groupId:{type:String},
    name:{type:String},
    members:[],
})

const groupModel = mongoose.model("Group", groupSchema);

module.exports = groupModel;