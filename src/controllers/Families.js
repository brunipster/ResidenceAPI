const familyCtrl = {};

const Family = require('@Models/Family');

familyCtrl.create = async(req,res)=>{
    try {
        const {name, direction, limit_pass} = req.body;
        const family = new Family({name, direction, limitPass : limit_pass})
        family.save();
        res.status(200).json({message:"Family created successfully", result: {id:family._id}});
    } catch (error) {
        res.status(500).json({message:"Internal error"});
    }
}

familyCtrl.getById = async(req,res)=>{
    try {
        const {id} = req.body;
        const family = await Family.findOne({_id:id}).exec()
        if (family){
            const result = {name:family.name, direction:family.direction, limitPass:family.limitPass}
            res.status(200).json(result);
        }else{
            res.status(204).json({message:"Family not found"});
        }
        res.status(200).json({message:"Family created successfully", result: {id:family._id}});
    } catch (error) {
        res.status(500).json({message:"Internal error"});
    }
}

module.exports = familyCtrl;