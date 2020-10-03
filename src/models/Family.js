const { Schema, model } = require("mongoose");
const {MemberType} = require("@Utils/constants")

const FamilySchema = new Schema({
    name: {type: String},
    direction: {type: String},
    limitPass: {type: Number}
})

module.exports = model("Family", FamilySchema);