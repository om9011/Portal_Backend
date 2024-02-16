const { default: mongoose } = require('mongoose');
const moogoes=require('mongoose');

const  dailyUpdateSchma=new moogoes.Schema({

    classTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    subject:{
        type:String,
        require:true
    },
    whatTeaches:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    }
})

const dailyUpdate=mongoose.model("dailyUpdate",dailyUpdateSchma);
module.exports=dailyUpdate;