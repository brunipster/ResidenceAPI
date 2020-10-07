const vpCtrl = {};
const { Types } = require("mongoose");
const {ProfileGenerateVPEnum, VPStates} = require("@Utils/constants")
const { v4: uuidv4 } = require('uuid');

const Family = require('@Models/Family');
const Member = require('@Models/Member');

const VP = require('@Models/VirtualPass');
const QRHelper = require('@Utils/QRHelper')
const DateHelper = require('@Utils/DateHelper')

vpCtrl.create = async (req,res) =>{
    try {
        const {member_id, day_to_expiration} = req.body
        const member =  await Member.findOne({_id: Types.ObjectId(member_id)})
        if(member){
            const family_member = await Family.findOne({_id: member.family_id})
            if(family_member){
                const family_vps = await VP.find({family_id: family_member._id, state: {$nin: [VPStates.REJECTED, VPStates.DEPRECATED]}})
                if(family_vps.length < family_member.limitPass){
                    const code = uuidv4();
                    const qr = await QRHelper.generate(code)
                    const expirationDate = DateHelper.addDays(new Date(), day_to_expiration || 1);
                    const virtualPass = new VP(
                        {
                            creation_date: new Date(),
                            expiration_date: expirationDate,
                            state: VPStates.PENDING,
                            code: code,
                            qr: qr,
                            member_id: Types.ObjectId(member_id),
                            family_id: family_member._id,
                        }
                    )
                    const vp = await virtualPass.save();
                    res.status(200).json({message:"VirtualPass created successfully", result:{code:vp.code, qr:vp.qr , expiration_date: DateHelper.formatToFrontend(vp.expiration_date)}});
                }else{
                    res.status(400).json({message:"Family´s limit virtual pass is exceeded"});
                }
            }else{
                res.status(202).json({message:"Family´s member not found"});
            }
        }else{
            res.status(202).json({message:"Member not found"});
        }
    } catch (error) {
        res.status(500).json({message:"Internal error"});
    }
}

vpCtrl.getByCode = async (req,res)=>{
    try {
        const {code} = req.params
        const virtualPass = await VP.findOne({code:code}).exec()
        if(virtualPass){
            const result = {state:virtualPass.state, code: virtualPass.code}
            res.status(200).json(result);
        }else{
            res.status(204).json({message:"Virutalpass not found"});
        }
    } catch (error) {
        res.status(500).json({message:"Internal error"});
    }
}

module.exports = vpCtrl;