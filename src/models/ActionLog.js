const { Schema, model } = require("mongoose");
const {TypesActionLogs} = require("@Utils/constants")

const ActionLogSchema = new Schema({
    userId: Schema.Types.ObjectId,
    actionType: {type:Number, enum:Object.values(TypesActionLogs)},
    date: {type:Date,default:new Date())}
})

module.exports = model("ActionLog", ActionLogSchema);