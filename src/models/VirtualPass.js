const { Schema, model } = require("mongoose");
const {ProfileGenerateVPEnum, VPStates} = require("@Utils/constants")

const VirtualPassSchema = new Schema({
    approval_date: { type: Date },
    rejection_date: { type: Date },
    creation_date: { type: Date },
    expiration_date: { type: Date },
    checkin_date: { type: Date },
    checkout_date: { type: Date },
    state: {type: String, enum : Object.values(VPStates), default: VPStates.PENDING},
    generate_by: {
        id: Schema.Types.ObjectId,
        profile: { type: Number , enum : Object.values(ProfileGenerateVPEnum), default: ProfileGenerateVPEnum.GUEST}
    },
    member_id: { type: String, unique: true },
    guard_id: { type: String, unique: true },
    code: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
  });

module.exports = model("VirtualPass", VirtualPassSchema);