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
                code: uuidv4(),
                member_id: "2",
                guard_id: "2"
            }
        )
    
        const resp = await virtualPass.save();
        res.send("VP registered" + resp, 200);
    } catch (error) {
        console.log(error.message);
        res.send(error);
    }
}

module.exports = vpCtrl;