const familyCtrl = {};

const Family = require('@Models/Family');
const mongoose = require('mongoose');

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

familyCtrl.update = async(req,res)=>{
    try {
        const {name, direction, limit_pass} = req.body;
        const resultFamilyUpdate = Family.updateOne({_id: mongoose.Types.ObjectId(user_id)}, {name, direction, limit_pass})
        if(resultFamilyUpdate.n > 0){
            res.status(200).json({message:"Family update successfully", result: {id:family._id}});
        }else{
            res.status(204).json({message:"Family not found"});
        }
    } catch (error) {
        res.status(500).json({message:"Internal error"});
    }
}

familyCtrl.updateLimitPass = async(req,res)=>{
    try {
        const {name, direction, limit_pass} = req.body;
        const resultFamilyUpdate = Family.updateOne({_id: mongoose.Types.ObjectId(user_id)}, {name, direction, limit_pass})
        if(resultFamilyUpdate.n > 0){
            res.status(200).json({message:"Family update successfully", result: {id:family._id}});
        }else{
            res.status(204).json({message:"Family not found"});
        }
    } catch (error) {
        res.status(500).json({message:"Internal error"});
    }
}

familyCtrl.getById = async(req,res)=>{
    try {
        const {id} = req.params;
        const family = await Family.findOne({_id:mongoose.Types.ObjectId(id)}).exec()
        if (family){
            const result = {name:family.name, direction:family.direction, limitPass:family.limitPass}
            res.status(200).json(result);
        }else{
            res.status(204).json({message:"Family not found"});
        }
    } catch (error) {
        res.status(500).json({message:"Internal error"});
    }
}

module.exports = familyCtrl;