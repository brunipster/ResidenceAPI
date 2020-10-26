const { Schema, model } = require("mongoose");
const {GenreConst} = require("@Utils/constants")

const GuestSchema = new Schema({
    name: {type: String},
    lastName: {type: String},
    user_id: Schema.Types.ObjectId,
    family_id: Schema.Types.ObjectId,
    age: {type: Number},
    genre: {type: String,  enum: Object.values(GenreConst), default: GenreConst.OTHER}
})

module.exports = model("Guest", GuestSchema);