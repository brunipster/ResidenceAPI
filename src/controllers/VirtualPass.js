const vpCtrl = {};
const { Types } = require("mongoose");
const {ProfileGenerateVPEnum, VPStates} = require("@Utils/constants")
const { v4: uuidv4 } = require('uuid');

const Family = require('@Models/Family');
const Member = require('@Models/Member');

const VP = require('@Models/VirtualPass');
const QRHelper = require('@Utils/QRHelper')

vpCtrl.create = async (req,res) =>{
    try {
        const {member_id} = req.body
        const member =  await Member.findOne({_id: Types.ObjectId(member_id)})
        if(member){
            const family_member = await Family.findOne({_id: member.family_id})
            if(family_member){
                const code = uuidv4();
                const qr = await QRHelper.generate(code)
                const virtualPass = new VP(
                    {
                        creation_date: new Date(),
                        state: VPStates.PENDING,
                        code: code,
                        qr: qr,
                        member_id: Types.ObjectId(member_id),
                        family_id: family_member._id,
                    }
                )
                const vp = await virtualPass.save();
                res.status(200).json({message:"VirtualPass created successfully", result:{code:vp.code, qr:vp.qr}});
            }else{
                res.status(202).json({message:"Family´s member not found"});
            }
        }else{
            res.status(202).json({message:"Member not found"});
        }
    } catch (error) {
        console.log(error);
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