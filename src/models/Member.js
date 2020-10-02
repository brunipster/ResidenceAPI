const { Schema, model } = require("mongoose");
const {MemberType} = require("@Utils/constants")

const MemberSchema = new Schema({
    name: {type: String},
    lastName: {type: String},
    user_id: Schema.Types.ObjectId,
    family_id: Schema.Types.ObjectId,
    type: {type: Number, enum: Object.values(MemberType), default: MemberType.OTHER},
    age: {type: Number}
})

module.exports = model("Member", MemberSchema);