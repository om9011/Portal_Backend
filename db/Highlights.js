const mongoose=require('mongoose');

const highlightsSchma=new mongoose.Schema({

    title:{
            type:String,
            require:true
    },
    image:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true
    },
    newType:{
        type:String,
        enum:["Maidan","Tasika","Karyakram","Sampark","All"],
        require:true
    }
})

const highlight=mongoose.model('highlight',highlightsSchma);
module.exports=highlight;