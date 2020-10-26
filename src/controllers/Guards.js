const guardCtrl = {};

const Guard = require('@Models/Guard');
const User = require('@Models/User');
const Family = require('@Models/Family');
const mongoose = require('mongoose');

guardCtrl.create = async (guard) => {
    let emptyFields = [];
    let invalidFields = [];
    const {name, lastName, user_id, family_id, age, genre} = guard
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
    if(emptyFields.length > 0 || invalidFields.length > 0){
        return {emptyFields, invalidFields}
    }else{
        try {
            let guardCreated = await Guard({name,lastName, user_id, age, genre});
            guardCreated = guardCreated.save()
            if (guardCreated){
                return guardCreated
            }else{
                return 500
            }
        } catch (error) {
            return 500 
        }
        
    }
}

module.exports = guardCtrl