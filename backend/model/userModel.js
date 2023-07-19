const mongoose= require("mongoose");

const usersSchema= mongoose.Schema({
        name:{type:String,required:true},
        email:{type:String,required:true},
        password:{type:String,required:true},  
        location:{type:String,required:true},
},{
    versionKey:false
})


const UsersModel=mongoose.model("user",usersSchema);


module.exports={
    UsersModel
}