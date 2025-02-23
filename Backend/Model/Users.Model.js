// just_home/Backend/Model/Users.Model.js
// Backend/Model/Users.Model.js
// practice/Backend/Model/Users.Model.js

import mongoose from 'mongoose';

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    profileImagePath:{
        type:String,
        default:""
    },
    wishList:{
        type:Array,
        default:[]
    },
    resirvationList:{
        type:Array,
        default:[]
    },
    prpertyList:{
        type:Array,
        default:[]
    },
    wishList:{
        type:Array,
        default:[]
    },


},{
    timestamps:true
})


export const Users = mongoose.model("Users", usersSchema) 