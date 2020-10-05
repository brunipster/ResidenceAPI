const memberCtrl = {};


const Member = require('@Models/Member');
const User = require('@Models/User');
const Family = require('@Models/Family');
const mongoose = require('mongoose');


memberCtrl.create = async (member) => {
    let emptyFields = [];
    let invalidFields = [];
    const {name, lastName, user_id, family_id, type, age} = member
    if(!name){
        emptyFields.push("name")
    }
    if(!lastName){
        emptyFields.push("lastName")
    }
    if(!user_id){
        emptyFields.push("user_id")
    }else{
        const user = await User.findOne({_id: mongoose.Types.ObjectId(user_id)})
        if(!user){
            invalidFields.push("user_id")
        }
    }
    if(!family_id){
        emptyFields.push("family_id")
    }else{
        const family = await Family.findOne({_id: mongoose.Types.ObjectId(family_id)})
        if(!family){
            invalidFields.push("family_id")
        }
    }
    if(emptyFields.length > 0 || invalidFields.length > 0){
        return {emptyFields, invalidFields}
    }else{
            try {
                const memberCreated = await Member({name,lastName, user_id,family_id, type, age});
                if (memberCreated){
                    return memberCreated
                }else{
                    return 500
                }
        } catch (error) {
            return 500 
        }
        
    }
}

module.exports = memberCtrl