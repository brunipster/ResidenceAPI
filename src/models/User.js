const { Schema, model } = require("mongoose");
const {UserRoles, UserStates} = require("@Utils/constants")

const bcrypt = require("bcryptjs");


const UserSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    rol: { type: Number, required: true, enum: Object.values(UserRoles), default: UserRoles.GUEST},
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    lastLogin: { type: Date },
    state: {type: Number, enum: Object.values(UserStates), default: UserStates.INACTIVE}
  });

  UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

  UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

module.exports = model("User", UserSchema);