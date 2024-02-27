import { Schema, connect, model } from "mongoose";
import { dbUri } from "../config";

const userSchema = new Schema({
    phoneNo:{
        type:String,
        required:true,
    },
    id:{
        type:String,
        required:true,
        unique:true,
    },
    session:{
        type:String,
        required:true,
    },
})

connect(dbUri).then(console.log("Connected to DATABASE")).catch(err => console.error(err))

const User = model('User',userSchema)

export const addUser = async (phoneNo,id,session) => {
    await User.create({phoneNo,id,session})
}