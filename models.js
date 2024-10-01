const mongoose = require('mongoose')
const datesBetween = require('dates-between');
const helpers = require('./helpers')

const ExerciseSchema = new mongoose.Schema({
    description:String,
    duration: Number,
    date: String
})

const UserSchema = new mongoose.Schema({
    username: String,
    count: Number,
    log:[ExerciseSchema]
}) 

const UserModel = mongoose.model("UserModel",UserSchema);

const createUser = async(data)=>{
    const newUser = new UserModel(data)
    newUser.count = 0 
    await newUser.save()
    const userObj = newUser.toObject()
    return {
        username:userObj.username,
        _id:userObj._id
    }
}

const getUsers = async ()=> await UserModel.find()
const getUser = async (id) => await UserModel.findById(id)

const getLogsByDateRange = async(id,start,end)=>{
    const user = await UserModel.findById(id)
    const filteredLogs = [];
    for (const date of datesBetween(start, end)) {
        let d = helpers.formatDate(date)
        user.log.forEach(logItem=>{
            if(logItem.date==date) filteredLogs.push(logItem)
        })
    }
    return {
        username: user.username,
        count: user.count,
        _id: user._id,
        log: filteredLogs
      }
}


module.exports = {UserModel,createUser,getUser,getUsers,getLogsByDateRange}