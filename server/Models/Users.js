const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        firstName : {
            type : String,
            require : true
        },
        lastName : {
            type : String,
            require : true
        },
        numberPhone : {
            type : String,  
            // require : true,
        },
        email : {
            type : String,
            require : true,
            validate:{
                validator: validator.isEmail,
                message: '{VALUE} is not a valid email',
                isAsync: false
            }
        },
        password : {
            type : String,
            require : true
        },
        role : {
            type : Number,  
            require : true,
            default: 0
        },
    },
    {timestamps:true}
);

const User = mongoose.model("User", userSchema);
module.exports = User;
