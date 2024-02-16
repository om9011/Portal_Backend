const mongoose=require('mongoose')

const requestDB=mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        // required:true
    },
    status:{
        type: String,
        enum: ["Approved", "Disapproved","Pending"],
        required: true,
    },role:{
        type:String,
        enum: ["Student", "Admin", "Operator"],
        // required: true,
    }
})

const requetsDB=mongoose.model("requestDB",requestDB);
module.exports=requetsDB
