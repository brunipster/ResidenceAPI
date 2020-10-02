const vpCtrl = {};
const {ProfileGenerateVPEnum, VPStates} = require("@Utils/constants")
const { v4: uuidv4 } = require('uuid');

const VP = require('@Models/VirtualPass');

vpCtrl.create = async (req,res) =>{
    try {
        
        const virtualPass = new VP(
            {
                creation_date: new Date(),
                state: VPStates.PENDING,
                code: uuidv4()
            }
        )
        const vp = await virtualPass.save();
        res.status(200).json({message:"VirtualPass created successfully", result:{code:vp.code}});
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