import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    imgurl :{
        type : String
    },
    userbio :{
        type : String
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