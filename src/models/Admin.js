const { Schema, model } = require("mongoose");
const {MemberType} = require("@Utils/constants")

const AdminSchema = new Schema({
    name: {type: String},
    lastName: {type: String},
    user_id: Schema.Types.ObjectId,
    createdBy: Schema.Types.ObjectId,
    type: {type: Number, enum: Object.values(MemberType), default: MemberType.OTHER}
})

module.exports = model("Member", MemberSchema);