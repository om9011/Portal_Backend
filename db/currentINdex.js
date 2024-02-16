const mongoose=require('mongoose');

const currentCouter=mongoose.Schema({

    currentRno:{
        type:String,
        require:true
    }
})

const currentIndex=mongoose.model("currentIndex",currentCouter);
module.exports=currentIndex;