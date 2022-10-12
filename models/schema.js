import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    userinput : 
    {   
        appname:[{
            type : String
        }],
        links :[{
            type : String
        }],
    },
    userid : mongoose.SchemaTypes.ObjectId
})

const User = mongoose.model('Dojeto', UserSchema);

export default User;